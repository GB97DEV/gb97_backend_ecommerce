import Category from "../../models/CategoryModel";
import Organization from "../../models/OrganizationModel";

import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders";

import { applyPaginationEmb } from "../../../../../helpers/paginationEmb";
import { authMiddleware } from "../../../../../middleware/authentication";
import mongoose from "mongoose";


export const main = authMiddleware( async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  const filtros = JSON.parse(event.body) || {};
  const filtrosValidos = Object.entries(filtros).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  let query = {};
  const pipeline: any[] = [];

  const referenceKeys = ["organization.organizationUuid"];

  for (const referenceKey of referenceKeys) {
    const RefModel = Organization;

    pipeline.push({
      $lookup: {
        from: RefModel.collection.name,
        localField: referenceKey,
        foreignField: "_id",
        as: referenceKey,
      },
    });

    pipeline.push({
      $unwind: {
        path: `$${referenceKey}`,
        preserveNullAndEmptyArrays: true,  // Manejo de referencias nulas o vacías
      },
    });
  }

  for (const [key, value] of filtrosValidos) {
    if (referenceKeys.includes(key.split(".")[0])) {
      const filterKey = `${key}`;
      let filterValue;

      if (typeof value === "string" && mongoose.Types.ObjectId.isValid(value)) {
        filterValue = new mongoose.Types.ObjectId(value);
      } else if (typeof value === "string") {
        filterValue = { $regex: new RegExp(value.toLowerCase(), "i") };
      } else {
        filterValue = value;
      }

      pipeline.push({ $match: { [filterKey]: filterValue } });
    } else {
      let queryValue;

      if (typeof value === "string" && mongoose.Types.ObjectId.isValid(value)) {
        queryValue = new mongoose.Types.ObjectId(value);
      } else if (typeof value === "string") {
        queryValue = { $regex: new RegExp(value.toLowerCase(), "i") };
      } else {
        queryValue = value;
      }

      query[key] = queryValue;
    }
  }

  pipeline.push({ $match: query });
  try {
    await connectDatabase();
    const { data, pagination } = await applyPaginationEmb(
      Category,
      event,
      pipeline
    );
    if (data.length === 0) {
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          response: false,
          message: acceptLanguage === "es" ?"No existen registros." :"There are no records",
          data: null,
        }),
      };
    }

    const message = customMessage(data, "ga", acceptLanguage);
    const body = { ...message, pagination };

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(body),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: responseHeaders,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
});
