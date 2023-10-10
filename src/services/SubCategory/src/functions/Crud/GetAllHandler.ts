import SubCategory from "../../models/SubCategoryModel";

import { getAllGeneric } from "../../../../../helpers/controllers/getAllGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return getAllGeneric(SubCategory, event, context, acceptLanguage);
};
