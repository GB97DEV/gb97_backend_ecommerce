import Cloth from "../../models/ClothModel";
import Organization from "../../models/OrganizationModel";
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders";
import { applyPaginationEmb } from "../../../../../helpers/paginationEmb";

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const filtros = JSON.parse(event.body) || {};
  const filtrosValidos = Object.entries(filtros).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  let query = {};
  const pipeline: any[] = [];

  const referenceKeys = ["organization"];

  for (const referenceKey of referenceKeys) {
    const RefModel = Organization;

    pipeline.push({
      $lookup: {
        from: RefModel.collection.name,
        localField: referenceKey,
        foreignField: "_id",
        as: referenceKey,
      },
    });

    pipeline.push({
      $unwind: `$${referenceKey}`,
    });
  }

  for (const [key, value] of filtrosValidos) {
    if (referenceKeys.includes(key.split(".")[0])) {
      const filterKey = `${key}`;
      const regexFilter =
        typeof value === "string"
          ? { $regex: new RegExp(value.toLowerCase(), "i") }
          : value;
      pipeline.push({ $match: { [filterKey]: regexFilter } });
    } else {
      query[key] =
        typeof value === "string"
          ? { $regex: new RegExp(value.toLowerCase(), "i") }
          : value;
    }
  }

  pipeline.push({ $match: query });
  try {
    await connectDatabase();
    const { data, pagination } = await applyPaginationEmb(
      Cloth,
      event,
      pipeline
    );
    if (data.length === 0) {
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          response: false,
          message: "No existen registros.",
          data: null,
        }),
      };
    }

    const message = customMessage(data, "ga");
    const body = { ...message, pagination };

    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(body),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: responseHeaders,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
};
