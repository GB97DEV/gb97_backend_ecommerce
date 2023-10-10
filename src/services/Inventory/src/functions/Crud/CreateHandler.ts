import Inventory from "../../models/InventoryModel";
import { createGeneric } from "../../../../../helpers/controllers/createGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return createGeneric(Inventory, event, context, acceptLanguage);
});
