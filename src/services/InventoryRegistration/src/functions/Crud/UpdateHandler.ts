import InventoryRegistration from "../../models/InventoryRegistrationModel";

import { updateGeneric } from "../../../../../helpers/controllers/updateGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import convertData from "../../../../../helpers/reqDataModeling";
import { ChangeRegister } from "../../utils/ChangeInventory";

export const main = authMiddleware( async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  // 2 Obj => objAc = 10 ObjEnt= 8
  // 2 => Invent +/- 2
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    await connectDatabase();
    const obj = await convertData(event);
    const query = event.pathParameters;
    let updateObj = obj;
    if (Array.isArray(obj)) {
      updateObj = { $set: { ...obj[0] } };
    }
    if (updateObj._id) {
      delete updateObj._id;
    }

    const actObj = await InventoryRegistration.findById(query);
    const objUpdated = await InventoryRegistration.findOneAndUpdate(query, updateObj, {
      new: true,
    });
    let objExpanded;
    if(objUpdated.registryType === 1) {
      objExpanded = await InventoryRegistration.findById(objUpdated._id).populate([
        "supplier.supplierUuid"
      ]).lean();
    }

    if(objUpdated.registryType === 2){
      objExpanded = await InventoryRegistration.findById(objUpdated._id).populate([
        "selling.sellingUuid"
      ]).lean();
    }
  
    const respChange = await ChangeRegister(objUpdated.inventory.inventoryUuid, objUpdated.registryType, actObj.quantity, objUpdated.quantity);
    const message = customMessage(objUpdated, "u", acceptLanguage);
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ ...message, data: {inventoryRegistration: objExpanded ?objExpanded :objUpdated, ...respChange}}),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ type: false, message: err.message }),
    };
  }
});
