import Order from "../../models/OrderModel";
import { getAllGeneric } from "../../../../../helpers/controllers/getAllGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";
import responseHeaders from "../../../../../helpers/responseHeaders";
import connectDatabase from "../../../../../database/mongodb";
import { applyPagination } from "../../../../../helpers/pagination";
import customMessage from "../../../../../helpers/customMessage";

export const main = authMiddleware(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  try {
    await connectDatabase();
    const { data, pagination } = await applyPagination(Order, event);
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

    const cleanedData = data.map((order) => {
      if (
        order.invoicedURL &&
        order.invoicedURL.startsWith(
          "http://www.erasasesoria.com:9090/Mercurio/"
        )
      ) {
        order.invoicedURL = order.invoicedURL.replace(
          "http://www.erasasesoria.com:9090/Mercurio/",
          "http://www.facturaec.erassoluciones.com:9090/media/"
        );
      }

      return order;
    });

    const message = customMessage(cleanedData, "ga", acceptLanguage);
    const body = {
      ...message,
      // schema: CampsSchema,
      pagination,
      // fieldValidations,
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
});
