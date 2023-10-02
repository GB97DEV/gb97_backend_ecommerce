import User from "@/services/User/src/models/UserModel";
import connectDatabase from "@/database/mongodb";
import { authMiddleware } from '../../../../../middleware/authentication';

export const main = authMiddleware(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const headers = {
    "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
    "Access-Control-Allow-Headers":
      "Content-Type, User-Agent, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
  };

  try {
    await connectDatabase();
    //Check if the user already exist or not
    const { username } = JSON.parse(event.body);
    const userExist = await User.findOne({ userName: username });
    if (userExist) {
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          response: false,
          message: "El usuario ya existe.",
          serverMessage: null,
          data: userExist,
        }),
      };
    }

    //Register
    const reqUserObj = JSON.parse(event.body);
    let userObj = { ...reqUserObj };
    const userObjCreated = await User.create(userObj);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        response: true,
        message: "Usuario creado exitosamente.",
        serverMessage: null,
        data: userObjCreated,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      headers,
      body: JSON.stringify({
        response: false,
        message: "No se pudo crear el usuario",
        serverMessage: err.message,
        data: null,
      }),
    };
  }
});
