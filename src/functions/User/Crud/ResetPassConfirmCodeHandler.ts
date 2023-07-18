import User from "../../../models/UserModel";
import connectDatabase from "../../../database/mongodb";
import responseHeaders from "../../../helpers/responseHeaders"; // Importar responseHeaders
// import UserResetPassword from "../../../models/_UserResetPasswordModel";
import * as bcrypt from "bcryptjs";

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";
  try {
    await connectDatabase();

    const { userName, password, code } = JSON.parse(event.body);

    const user = await User.findOne({
      userName: userName,
    });

    let messageExist: string;
    if (acceptLanguage === "es") {
      messageExist = "No existe el usuario";
    } else {
      messageExist = "User does not exist";
    }

    if (!user) {
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({ message: messageExist }),
      };
    }

    // Verifica si la contraseña ingresada es correcta
    const isCodeMatched = await bcrypt.compare(code, user.resetPasswordToken);

    if (!isCodeMatched) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          response: false,
          message: ".",
          serverMessage: null,
          data: null,
        }),
      };
    }

    // Actualizar la contraseña del usuario y eliminar el token y la fecha de vencimiento
    user.password = password;
    await user.save();

    let messageSucce: string;
    if (acceptLanguage === "es") {
      messageSucce = "Contraseña actualizada correctamente.";
    } else {
      messageSucce = "Password updated successfully.";
    }

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({
        response: true,
        message: messageSucce,
        serverMessage: null,
        data: {
          userId: user._id,
          userName: user.userName,
        },
      }),
    };
  } catch (err) {
    let messageSucceError: string;
    if (acceptLanguage === "es") {
      messageSucceError = "No se pudo actualizar la correctamente.";
    } else {
      messageSucceError = "Could not update successfully.";
    }

    return {
      statusCode: err.statusCode || 500,
      headers: responseHeaders,
      body: JSON.stringify({
        response: false,
        message: messageSucceError,
        serverMessage: err.message,
        data: null,
      }),
    };
  }
};
