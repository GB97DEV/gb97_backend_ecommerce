import User from "../../../models/UserModel";
import connectDatabase from "../../../database/mongodb";
import { authMiddleware } from "../../../middleware/authentication";
import responseHeaders from "./../../../helpers/responseHeaders";
import { getAllGeneric } from "../../../helpers/controllers/getAllGenericController";

export const main = async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";
  return getAllGeneric(User, event, context, acceptLanguage);
};
