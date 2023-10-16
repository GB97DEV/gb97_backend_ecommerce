
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import convertData from "../../../../../helpers/reqDataModeling";
import { authMiddleware } from "../../../../../middleware/authentication";
import responseHeaders from "../../../../../helpers/responseHeaders";

import Organization from "../../models/OrganizationModel";
import Client from "../../models/ClientModel";
import Brand from "../../models/BrandModel";
import Category from "../../models/CategoryModel";
import SubCategory from "../../models/SubCategoryModel";
import Inventory from "../../models/InventoryModel";
import Item from "../../models/ItemModel";
import ReplenishmentHistory from "../../models/ReplenishmentHistoryModel";
import Supplier from "../../models/SupplierModel";
import SupplierBranch from "../../models/SupplierBranchModel";
import Store from "../../models/StoreModel";
import Selling from "../../models/SellingModel";


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

    const OrganizationData: any = await Organization.find({updatedAt: {$gte: StartDate},_id: organizationUuid}).lean();
    const ClientData: any = await Client.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const BrandData: any = await Brand.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const CategoryData: any = await Category.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const SubCategoryData: any = await SubCategory.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const InventoryData: any = await Inventory.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const ItemData: any = await Item.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const StoreData: any = await Store.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const SupplierData: any = await Supplier.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const SellingsData: any = await Selling.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const ReplenishmentHistoryData: any = await ReplenishmentHistory.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();
    const SupplierBranchData: any =await SupplierBranch.find({updatedAt: {$gte: StartDate},organization: {organizationUuid: organizationUuid}}).lean();

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
      replenishmenthistory: {
        data: ReplenishmentHistoryData,
        count: ReplenishmentHistoryData.length
      },
      supplierbranch: {
        data: SupplierBranchData,
        count: SupplierBranchData.length
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
