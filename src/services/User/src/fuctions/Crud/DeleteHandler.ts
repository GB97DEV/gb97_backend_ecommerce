import User from "../../../models/UserModel";
import { deleteGeneric } from "../../../helpers/controllers/deleteGenericController";
import { authMiddleware } from "../../../middleware/authentication";

// export const main = authMiddleware(async (event, context) => {
//   return deleteGeneric(User, event, context);
// });

export const main = async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";
  return deleteGeneric(User, event, context, acceptLanguage);
};
