import Cloth from "../../models/ClothModel";
import { getAllGeneric } from "../../../../../helpers/controllers/getAllGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  return getAllGeneric(Cloth, event, context);
});
