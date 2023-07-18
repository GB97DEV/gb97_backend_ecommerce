import User from "../../../models/UserModel";
import connectDatabase from "../../../database/mongodb";
import { authMiddleware } from "../../../middleware/authentication";

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";

  try {
    await connectDatabase();
    const { _id } = event.pathParameters;
    const userObj = await User.findOne({ _id: _id }).populate("personId");

    if (userObj) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: true,
          message: "Consulta exitosa",
          serverMessage: null,
          data: userObj,
        }),
      };
    } else {
      let messageError: string;
      if (acceptLanguage === "es") {
        messageError = "Error en la consulta";
      } else {
        messageError = "Query Error";
      }
      return {
        statusCode: 404,
        body: JSON.stringify({
          response: false,
          message: messageError,
          serverMessage: null,
          data: null,
        }),
      };
    }
  } catch (err) {
    let messageError: string;
    if (acceptLanguage === "es") {
      messageError = "Error en la consulta";
    } else {
      messageError = "Query Error";
    }
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        response: false,
        message: messageError,
        serverMessage: err.message,
        data: null,
      }),
    };
  }
};
