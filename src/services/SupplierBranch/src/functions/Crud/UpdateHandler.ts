import SupplierBranch from "../../models/SupplierBranchModel";

import { updateGeneric } from "../../../../../helpers/controllers/updateGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware( async (event, context) => {
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  return updateGeneric(SupplierBranch, event, context, acceptLanguage);
});
