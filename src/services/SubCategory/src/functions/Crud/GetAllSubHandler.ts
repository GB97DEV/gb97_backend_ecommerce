import Category from "../../models/CategoryModel";
import SubCategory from "../../models/SubCategoryModel";

import convertData from "../../../../../helpers/reqDataModeling";
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders";

import { authMiddleware } from "../../../../../middleware/authentication";


export const main = authMiddleware( async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With, action",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    await connectDatabase();
    const obj: any = await convertData(event);
    if(!obj.organization){
      return {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({
          response: false,
          message: acceptLanguage === "es" ?"Debe enviar una organización." :"You must send an organization.",
          data: null,
        }),
      };
    }
    const query = {"organization.organizationUuid": obj.organization}
    const CategoryData = await Category.find(query);
    const newData = await Promise.all(CategoryData.map(async(category: any) => {
      const SubCategoryData = await SubCategory.find({"category.categoryUuid": category._id}).lean();
      const newResponse = {
        category,
        subCategories: SubCategoryData.map(subcategory => ({ ...subcategory }))
      };
      return newResponse;
    }));

    const message = customMessage(newData, "ga", acceptLanguage);
    const body = { ...message };
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(body),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
});
