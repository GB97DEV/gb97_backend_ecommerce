import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";
import { applyPagination } from "./../pagination";
import responseHeaders from "./../responseHeaders";
import extractFieldValidations from "./../fieldValidation";

export const getAllGeneric = async (
  Model,
  event,
  context,
  acceptLanguage
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDatabase();
    const { data, pagination } = await applyPagination(Model, event);
    if (data.length === 0) {
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          response: false,
          message: "No existen registros.",
          data: null,
        }),
      };
    }
    const message = customMessage(data, "ga", acceptLanguage);
    const body = {
      ...message,
      pagination,
    };
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(body),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
};
