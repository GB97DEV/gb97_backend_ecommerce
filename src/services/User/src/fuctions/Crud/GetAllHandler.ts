import User from "@/services/User/src/models/UserModel";
import { getAllGeneric } from "@/helpers/controllers/getAllGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";
  return getAllGeneric(User, event, context, acceptLanguage);
});
