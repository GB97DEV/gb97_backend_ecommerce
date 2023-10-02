import Client from "../../model/ClientModel";
import { updateGeneric } from "../../../../../helpers/controllers/updateGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return updateGeneric(Client, event, context, acceptLanguage);
});
