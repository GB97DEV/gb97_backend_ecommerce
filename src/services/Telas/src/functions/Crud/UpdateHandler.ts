import Cloth from "../../models/ClothModel";
import { updateGeneric } from "../../../../../helpers/controllers/updateGenericController";
import { authMiddleware } from "../../../../../middleware/authentication";

export const main = async (event, context) => {
  return updateGeneric(Cloth, event, context);
};
