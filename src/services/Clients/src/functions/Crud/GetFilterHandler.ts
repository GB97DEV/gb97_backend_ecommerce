import Client from "../../model/ClientModel";
import Organization from "../../model/OrganizationModel";
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders";
import { applyPaginationEmb } from "./../../../../../helpers/paginationEmb";
import { authMiddleware } from "../../../../../middleware/authentication";
import mongoose from "mongoose";

export const main = authMiddleware(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";

  // const filtros = event.body || {};
  const filtros = JSON.parse(event.body) || {};
  const filtrosValidos = Object.entries(filtros).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  let query = {};
  const pipeline: any[] = [];

  // Crea un objeto createdAtQuery si startDate y endDate están presentes
  const createdAtQuery: { [key: string]: any } = {}; // añade una index signature para evitar el error

  // Extrae startDate y endDate de filtros
  const { startDate, endDate } = filtros;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Comprueba que las fechas son válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Las fechas proporcionadas no son válidas.");
    }

    // Asegúrate de que start es anterior a end
    if (start > end) {
      throw new Error(
        "La fecha de inicio debe ser anterior a la fecha de fin."
      );
    }

    createdAtQuery.createdAt = {
      $gte: start,
      $lte: end,
    };
  }

  // Si `createdAtQuery` no está vacío, agrégalo al pipeline como una etapa `$match`
  if (Object.keys(createdAtQuery).length > 0) {
    pipeline.push({ $match: createdAtQuery });
  }

  const referenceKeys = ["organization"]; // Explicitly define the reference keys

  for (const referenceKey of referenceKeys) {
    const RefModel = Organization; // Explicitly define the RefModel
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

  const filtrosValidos2 = Object.entries(filtros).filter(
    ([key, value]) => 
      value !== undefined && 
      value !== null && 
      value !== "" && 
      key !== "startDate" && 
      key !== "endDate"
  );

  for (const [key, value] of filtrosValidos2) {
    if (referenceKeys.includes(key.split(".")[0])) {
      const filterKey = `${key}`;
      let filterValue;
  
      if (typeof value === "string" && mongoose.Types.ObjectId.isValid(value)) {
        filterValue = new mongoose.Types.ObjectId(value);
      } else if (typeof value === "string") {
        filterValue = { $regex: new RegExp(value.toLowerCase(), "i") };
      } else {
        filterValue = value;
      }
  
      pipeline.push({ $match: { [filterKey]: filterValue } });
    } else {
      let queryValue;
  
      if (typeof value === "string" && mongoose.Types.ObjectId.isValid(value)) {
        queryValue = new mongoose.Types.ObjectId(value);
      } else if (typeof value === "string") {
        queryValue = { $regex: new RegExp(value.toLowerCase(), "i") };
      } else {
        queryValue = value;
      }
  
      query[key] = queryValue;
    }
  }

  pipeline.push({ $match: query });
  

  try {
    await connectDatabase();
    const { data, pagination } = await applyPaginationEmb(
      Client,
      event,
      pipeline
    );

    if (!data) {
      let message: string;
      if (acceptLanguage === "es") {
        message = "No existen registros.";
      } else {
        message = "There are no records.";
      }
      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          response: false,
          message: message,
          data: null,
        }),
      };
    }

    const message = customMessage(data, "ga", acceptLanguage);
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
});
