import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";
import renameProperties from "../mapColumnsKeys";
import convertData from "../reqDataModeling";

export const createGeneric = async (Model, event, context, acceptLanguage) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };

    await connectDatabase();
    const obj = await convertData(event);
    const existingDoc = await Model.findById(obj._id);

    if (!existingDoc) {
      const ObjCreated = await Model.create(obj);
      const message = customMessage(ObjCreated, "c", acceptLanguage);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ ...message, data: ObjCreated }),
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
};
