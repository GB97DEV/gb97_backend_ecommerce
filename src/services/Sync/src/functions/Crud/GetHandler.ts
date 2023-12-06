
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import convertData from "../../../../../helpers/reqDataModeling";
import { authMiddleware } from "../../../../../middleware/authentication";
import responseHeaders from "../../../../../helpers/responseHeaders";

import Brand from "../../models/BrandModel";
import Category from "../../models/CategoryModel";
import Client from "../../models/ClientModel";
import Inventory from "../../models/InventoryModel";
import InventoryRegistration from "../../models/InventoryRegistrationModel";
import Item from "../../models/ItemModel";
import Organization from "../../models/OrganizationModel";
import Selling from "../../models/SellingModel";
import Store from "../../models/StoreModel";
import SubCategory from "../../models/SubCategoryModel";
import Supplier from "../../models/SupplierModel";
import Tag from "../../models/TagModel";
import User from "../../models/UserModel";


export const main = authMiddleware(async (event, context) => {
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
    const { lastSync, organizationUuid } = await convertData(event);

    if(!lastSync){
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          response: false,
          message: acceptLanguage === "es" ?"Debe enviar una fecha valida" :"You must send a valid date",
          data: null,
        }),
      };
    }

    if(!organizationUuid){
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          response: false,
          message: acceptLanguage === "es" ?"Debe enviar un organizationUuid válido" :"You must send a valid organizationUuid",
          data: null,
        }),
      };
    }
    await connectDatabase();

    const StartDate = new Date(lastSync).toISOString();

    const query = {updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}

    const BrandData: any = await Brand.find(query).lean();
    const CategoryData: any = await Category.find(query).lean();
    const ClientData: any = await Client.find(query).lean();
    const InventoryData: any = await Inventory.find(query).lean();
    const InventoryRegistrationData: any = await InventoryRegistration.find(query).lean();
    const ItemData: any = await Item.find(query).lean();
    const OrganizationData: any = await Organization.find({updatedAt: {$gte: StartDate},_id: organizationUuid}).lean();
    const SellingsData: any = await Selling.find(query).lean();
    const StoreData: any = await Store.find(query).lean();
    const SubCategoryData: any = await SubCategory.find(query).lean();
    const SupplierData: any = await Supplier.find(query).lean();
    const TagData: any = await Tag.find(query).lean();
    const UserData: any = await User.find(query).lean();

    const body = {
      organization:{
        data: OrganizationData,
        count: OrganizationData.length
      },
      client:{
        data: ClientData,
        count: ClientData.length
      },
      brand: {
        data: BrandData,
        count: BrandData.length
      },
      Category:{
        data: CategoryData,
        count: CategoryData.length
      },
      subcategory: {
        data: SubCategoryData,
        count: SubCategoryData.length
      },
      inventory: {
        data: InventoryData,
        count: InventoryData.length
      },
      item: {
        data: ItemData,
        count: ItemData.length
      },
      store: {
        data: StoreData ,
        count: StoreData.length
      },
      supplier: {
        data: SupplierData,
        count: SupplierData.length
      },
      sellings: {
        data: SellingsData,
        count: SellingsData.length
      },
      inventoryRegistration: {
        data: InventoryRegistrationData,
        count: InventoryRegistrationData.length
      },
      tag: {
        data: TagData,
        count: TagData.length
      },
      user: {
        data: UserData,
        count: UserData.length
      }
    }

    if (Object.values(body).every(item => item.count === 0)) {
      return {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({
          response: false,
          message: acceptLanguage === "es" ?"No existen registros." :"There are no records",
          data: null,
        }),
      };
    }

    const response = customMessage(body, "ga", acceptLanguage);
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
});
