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
  // context.callbackWaitsForEmptyEventLoop = false;

  // try {
  //   await connectDatabase();

  //   const userObj = await User.find().populate("personId", "organizationId");
  //   return {
  //     statusCode: 200,
  //     headers: responseHeaders,
  //     body: JSON.stringify({
  //       response: true,
  //       message: "Consulta exitosa",
  //       serverMessage: null,
  //       data: userObj,
  //     }),
  //   };
  // } catch (err) {
  //   console.error(err);
  //   return {
  //     statusCode: err.statusCode || 500,
  //     headers: responseHeaders,
  //     body: JSON.stringify({
  //       response: true,
  //       message: err.message,
  //       serverMessage: null,
  //       data: null,
  //     }),
  //   };
  // }
};
