import Selling from "../../models/SellingModel";
import { createGeneric } from "../../../../../helpers/controllers/createGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return createGeneric(Selling, event, context, acceptLanguage);
});
