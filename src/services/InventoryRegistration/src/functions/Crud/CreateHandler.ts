import InventoryRegistration from "../../models/InventoryRegistrationModel";
import { createGeneric } from "../../../../../helpers/controllers/createGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import convertData from "../../../../../helpers/reqDataModeling";
import { CreateRegister } from "../../utils/ChangeInventory";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  // 1 Reposicion: Replenishment, 2 Salida de Inventario : Realese
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };

    await connectDatabase();
    const obj = await convertData(event);
    const existingDoc = await InventoryRegistration.findById(obj._id);
    let objExpanded;
    if (!existingDoc) {
      const ObjCreated = await InventoryRegistration.create(obj);
      const message = customMessage(ObjCreated, "c", acceptLanguage);
      
      if(ObjCreated.registryType === 1){
        objExpanded = await InventoryRegistration.findById(ObjCreated._id).populate([
          "supplier.supplierUuid"
        ]).lean();
      }

      if(ObjCreated.registryType === 2){
        objExpanded = await InventoryRegistration.findById(ObjCreated._id).populate([
          "selling.sellingUuid"
        ]).lean();
      }

      const respChange = await CreateRegister(ObjCreated.inventory.inventoryUuid, ObjCreated.registryType, ObjCreated.quantity);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ ...message, data: {inventoryRegistration: objExpanded ?objExpanded :ObjCreated, ...respChange} }),
      };
    } else {
      return {
        statusCode: 409,
        body: JSON.stringify({
          status: false,
          error: "El código ya existe en la base de datos.",
        }),
      };
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
});