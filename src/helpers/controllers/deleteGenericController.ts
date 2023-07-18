import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";

export const deleteGeneric = async (Model, event, context, acceptLanguage) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, User-Agent, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    await connectDatabase();
    const query = event.pathParameters;
    const objUpdated = await Model.deleteMany({ _id: { $in: query } });
    const message = customMessage(objUpdated, "d", acceptLanguage);
    return { statusCode: 200, headers, body: JSON.stringify(message) };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ type: false, message: err.message }),
    };
  }
};
