import Cloth from "../../models/ClothModel";
import { deleteGeneric } from "../../../../../helpers/controllers/deleteGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = authMiddleware(async (event, context) => {
  return deleteGeneric(Cloth, event, context);
});
