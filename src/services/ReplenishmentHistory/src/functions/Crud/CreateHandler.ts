import ReplenishmentHistory from "../../models/ReplenishmentHistoryModel";
import { createGeneric } from "../../../../../helpers/controllers/createGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return createGeneric(ReplenishmentHistory, event, context, acceptLanguage);
});