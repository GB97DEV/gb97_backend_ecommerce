import Cloth from "../../models/ClothModel";
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With, action",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    await connectDatabase();
    const { _id } = event.pathParameters;
    const Obj = await Cloth.findById(_id).populate(["organization"]).lean();
    if (Obj) {
      const message = customMessage(Obj, "g");
      const body = {
        ...message,
      };
      return { statusCode: 200, headers, body: JSON.stringify(body) };
    } else {
      return {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({
          response: false,
          message: "No existen registros.",
          data: null,
        }),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
});
