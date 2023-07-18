import Cloth from "../../models/ClothModel";
import { createGeneric } from "../../../../../helpers/controllers/createGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  return createGeneric(Cloth, event, context);
});
