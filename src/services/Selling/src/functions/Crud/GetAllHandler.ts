import Selling from "../../models/SellingModel";
import { getAllGeneric } from "../../../../../helpers/controllers/getAllGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return getAllGeneric(Selling, event, context, acceptLanguage);
});
