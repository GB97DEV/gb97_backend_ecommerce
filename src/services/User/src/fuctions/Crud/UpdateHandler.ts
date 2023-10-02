import User from "@/services/User/src/models/UserModel";
import connectDatabase from "@/database/mongodb";
import { authMiddleware } from "@/middleware/authentication";

export const main = authMiddleware(
  async (
    event: { body: string; pathParameters: any },
    context: { callbackWaitsForEmptyEventLoop: boolean }
  ) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
      await connectDatabase();
      const reqUserObj = JSON.parse(event.body);
      const userToUpdate = { ...reqUserObj };
      const query = { _id: event.pathParameters.id };
      const UserObjUpdated = await User.findOneAndUpdate(query, userToUpdate, {
        new: true,
        upsert: true,
      });
      return {
        statusCode: 200,
        body: JSON.stringify({
          response: true,
          message: "usuario actualizado correctamente!",
          serverMessage: null,
          data: { userId: UserObjUpdated._id },
        }),
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({
          response: false,
          message: "Error al actualizar",
          serverMessage: err.message,
          data: null,
        }),
      };
    }
  }
);
