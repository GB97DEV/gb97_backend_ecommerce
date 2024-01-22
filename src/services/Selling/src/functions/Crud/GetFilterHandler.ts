import Selling from "../../models/SellingModel";
import Organization from "../../models/OrganizationModel";
import Client from "../../models/ClientModel";
import Store from "../../models/StoreModel";
import Item from "../../models/ItemModel";
import User from "../../models/UserModel";

import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders";

import { applyPaginationEmb } from "../../../../../helpers/paginationEmb";
import { authMiddleware } from "../../../../../middleware/authentication";
import mongoose from "mongoose";

function normalizeDate(dateString) {
  const parts = dateString.split("T");
  const dateParts = parts[0].split("-");

  const year = dateParts[0];
  const month = String(dateParts[1]).padStart(2, "0");
  const day = String(dateParts[2]).padStart(2, "0");

  return new Date(`${year}-${month}-${day}T${parts[1]}`);
}

export const main = authMiddleware( async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const acceptLanguage =
    event.headers["Accept-Language"] ||
    event.headers["accept-language"] ||
    "es";
  const filtros = JSON.parse(event.body) || {};
  const filtrosValidos = Object.entries(filtros).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  let query = {};
  const createdAtQuery: any = {};
  const pipeline: any[] = [];

  const referenceKeys = [
    "store.storeUuid",
    "client.clientUuid",
    "seller.sellerUuid",
    "organization.organizationUuid",
  ];
  const referenceMaps = {
    "store.storeUuid": {
      model: Store,
    },
    "client.clientUuid": {
      model: Client,
    },
    "seller.sellerUuid":{
      model: User
    },
    "organization.organizationUuid": {
      model: Organization,
    },
  }

  for (const referenceKey of referenceKeys) {
    const reference = referenceMaps[referenceKey];
    const RefModel = reference.model;

    pipeline.push({
      $lookup: {
        from: RefModel.collection.name,
        localField: referenceKey,
        foreignField: "_id",
        as: referenceKey,
      },
    });

    pipeline.push({
      $unwind: {
        path: `$${referenceKey}`,
        preserveNullAndEmptyArrays: true,  // Manejo de referencias nulas o vacías
      },
    });
  }

  const { startDate, endDate } = filtros;
  if (startDate && endDate) {
    const start = normalizeDate(startDate);
    const end = normalizeDate(endDate);

    // const start = new Date(startDate);
    // const end = new Date(endDate);
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

  for (const [key, value] of filtrosValidos) {
    if(key === "startDate" || key === "endDate"){
      continue;
    }
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
      Selling,
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
    //Defino los atirbutos que necesito
    const modifiedData = data.map(item => ({
      ...item,
      seller: {
        sellerId: item.seller?.sellerUuid?._id || null,
        sellerUuid: {
          _id: item.seller?.sellerUuid?._id || "",
          Id: item.seller?.sellerUuid?.Id || 0,
          numDocument: item.seller?.sellerUuid?.numDocument || "",
          name: item.seller?.sellerUuid?.name || "",
          email: item.seller?.sellerUuid?.email || "",
          telephoneNumber: item.seller?.sellerUuid?.telephoneNumber || "",
        },
      },
    }));
    
    const message = customMessage(modifiedData, "ga", acceptLanguage);
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
