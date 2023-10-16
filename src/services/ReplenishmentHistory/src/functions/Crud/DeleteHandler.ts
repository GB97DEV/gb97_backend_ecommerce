import ReplenishmentHistory from "../../models/ReplenishmentHistoryModel";

import { deleteGeneric } from "../../../../../helpers/controllers/deleteGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return deleteGeneric(ReplenishmentHistory, event, context, acceptLanguage);
});

