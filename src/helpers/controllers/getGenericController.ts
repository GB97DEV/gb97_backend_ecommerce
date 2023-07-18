import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";
// import DinamicCamp from "../../models/_DinamicCampModel";

export const getGeneric = async (
  Model,
  event,
  context,
  acceptLanguage
  // colletionName,
  // acceptLanguage
) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With, action",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    await connectDatabase();
    const { _id } = event.pathParameters;
    const Obj = await Model.findById(_id).lean();
    if (Obj) {
      const message = customMessage(Obj, "g", acceptLanguage);
      // let CampsSchema = {};
      // if (colletionName) {
      //   const Camps = await DinamicCamp.aggregate([
      //     { $match: { name: colletionName } },
      //     { $unwind: "$camps" },
      //     { $match: { "camps.lg": acceptLanguage } },
      //     { $project: { "camps.lg": 0 } },
      //   ]).then((result) => result[0]);
      //   CampsSchema = Camps.camps;
      // }
      const body = {
        ...message,
        // schema: CampsSchema,
      };
      return { statusCode: 200, headers, body: JSON.stringify(body) };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          response: false,
          message: "No existen registros.",
          data: null,
        }),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
