import { initializeFirebaseAdmin } from "@/helpers/initializeFirebaseAdmin";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
 
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };

    const token = await initializeFirebaseAdmin();
    
    if (token) {
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ 
          response: true,
          message: "Se obtuvo el token",
          token
        }),
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          response: true,
          message: "No se pud obtener el token",
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
