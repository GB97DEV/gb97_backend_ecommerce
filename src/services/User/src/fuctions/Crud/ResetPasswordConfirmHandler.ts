import User from "@/services/User/src/models/UserModel";
import connectDatabase from "@/database/mongodb";
import responseHeaders from "@/helpers/responseHeaders";

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";

  try {
    await connectDatabase();

    const { userName, password, OrganizationId } = JSON.parse(event.body);
    // const ipAddress = event.requestContext.identity.sourceIp;

    // Buscar usuario por token y verificar la fecha de vencimiento
    const user = await User.findOne({
      userName: userName,
    });

    let message: string;
    if (acceptLanguage === "es") {
      message = "No existe el usuario.";
    } else {
      message = "The user does not exist.";
    }

    if (!user) {
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({ message: "No existe el usuario." }),
      };
    }

    // Actualizar la contraseña del usuario y eliminar el token y la fecha de vencimiento
    user.password = password;
    await user.save();

    let messageSucc: string;
    if (acceptLanguage === "es") {
      messageSucc = "Contraseña actualizada correctamente.";
    } else {
      messageSucc = "Password updated successfully.";
    }

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({
        response: true,
        message: messageSucc,
        serverMessage: null,
        data: {
          userId: user._id,
          userName: user.userName,
        },
      }),
    };
  } catch (err) {
    let messageError: string;
    if (acceptLanguage === "es") {
      messageError = "No se pudo actualizar la correctamente.";
    } else {
      messageError = "Could not update successfully.";
    }
    return {
      statusCode: err.statusCode || 500,
      headers: responseHeaders,
      body: JSON.stringify({
        response: false,
        message: messageError,
        serverMessage: err.message,
        data: null,
      }),
    };
  }
};
