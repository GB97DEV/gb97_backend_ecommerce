import Tag from "../../models/TagModel";

import { getAllGeneric } from "../../../../../helpers/controllers/getAllGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return getAllGeneric(Tag, event, context, acceptLanguage);
});
