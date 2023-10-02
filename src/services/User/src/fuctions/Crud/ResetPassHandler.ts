import User from "@/services/User/src/models/UserModel";
import connectDatabase from "@/database/mongodb";
import { sendEmail } from "@/utils/email";
import responseHeaders from "@/helpers/responseHeaders";
import * as bcrypt from "bcryptjs";

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "en";
  try {
    await connectDatabase();
    // Buscar usuario por correo electrónico
    const { username } = JSON.parse(event.body);
    const user = await User.findOne({ username: username });
    let messageError: string;
    if (acceptLanguage === "es") {
      messageError = "El usuario ingresado no existe.";
    } else {
      messageError = "The user entered does not exist.";
    }
    if (!user) {
      return {
        statusCode: 404,
        headers: responseHeaders,
        body: JSON.stringify({
          message: messageError,
        }),
      };
    }

    // Generar token de reinicio de contraseña
    const value = Math.floor(100000 + Math.random() * 900000);
    const resetPasswordToken = bcrypt.hashSync(value.toString(), 10);
    const resetPasswordExpires = Date.now() + 3600000; // 1 hora

    await User.updateOne(
      { _id: user._id },
      {
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: resetPasswordExpires,
      }
    );
    // Enviar correo electrónico con el enlace para reiniciar la contraseña
    let messageSendEmail: string;
    if (acceptLanguage === "es") {
      messageSendEmail = `Tu código de reseteo es: ${value}`;
    } else {
      messageSendEmail = `Your reset code is: ${value}`;
    }
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: messageSendEmail,
    });

    let messageSend: string;
    if (acceptLanguage === "es") {
      messageSend =
        "Se ha enviado un código de reseteo de contraseña al email ingresado";
    } else {
      messageSend = "A password reset code has been sent to the email entered";
    }

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify({
        message: messageSend,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      headers: responseHeaders,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
