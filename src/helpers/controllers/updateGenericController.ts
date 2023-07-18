import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";
import convertData from "../reqDataModeling";

export const updateGeneric = async (Model, event, context, acceptLanguage) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    await connectDatabase();
    const obj = await convertData(event);
    const query = event.pathParameters;
    let updateObj = obj;
    if (Array.isArray(obj)) {
      updateObj = { $set: { ...obj[0] } };
    }
    if (updateObj._id) {
      delete updateObj._id;
    }
    const objUpdated = await Model.findOneAndUpdate(query, updateObj, {
      new: true,
    });
    const message = customMessage(objUpdated, "u", acceptLanguage);
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ ...message, objUpdated }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ type: false, message: err.message }),
    };
  }
};
