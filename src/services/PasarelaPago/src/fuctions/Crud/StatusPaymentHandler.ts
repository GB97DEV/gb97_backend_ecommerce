import convertData from "@/helpers/reqDataModeling";
import { ResponseBody } from "../../utils/ResultCode";
import fetch  from "node-fetch"

const BASE_URL = "https://eu-test.oppwa.com"
const entityId = "8a829418533cf31d01533d06f2ee06fa"
const token = "Bearer OGE4Mjk0MTg1MzNjZjMxZDAxNTMzZDA2ZmQwNDA3NDh8WHQ3RjIyUUVOWA=="

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    const body = await convertData(event);
    const { checkoutId } = body;
    if(!checkoutId){
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          response: false,
          message: "Compruebe todos los campos requeridos.",
          data: null,
        }),
      };
    };

    const params = {
      entityId,
    };
    // Convertir el objeto en una cadena de consulta
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${BASE_URL}/v1/checkouts/${checkoutId}/payment?${queryString}`, {
      method: "GET",
      headers: {
        "Authorization": token,
      }
    });

    const resp = await response.json(); 
    const message = await ResponseBody(resp);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(message)
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
};