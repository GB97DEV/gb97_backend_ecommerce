import Organization from "../../models/OrganizationModel";
import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders";
import { applyPaginationEmb } from "../../../../../helpers/paginationEmb";
import { authMiddleware } from "../../../../../middleware/authentication";
import Client from "../../models/ClientModel";
import Selling from "../../models/SellingModel";
import Store from "../../models/StoreModel";
import User from "../../models/UserModel";


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
  const pipeline: any[] = [];

  const referenceKeys = ["organization.organizationUuid","store.storeUuid", "client.clientUuid", "seller.sellerUuid"];
  const referenceMaps = {
    "organization.organizationUuid": {
      model: Organization,
    },
    "store.storeUuid": {
      model: Store,
    },
    "client.clientUuid": {
      model: Client,
    },
    "seller.sellerUuid":{
      model: User,
      fields: ["numDocument"]
    }
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
