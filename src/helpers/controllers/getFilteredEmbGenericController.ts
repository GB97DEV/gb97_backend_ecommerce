import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";
import { applyPaginationEmb } from "../paginationEmb";
import responseHeaders from "../responseHeaders";

export const getFilteredEmbGeneric = async (
  Model,
  RefModels, // Ahora es un arreglo
  event,
  context
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const filtros = event.body || {};
  const filtrosValidos = Object.entries(filtros).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  let query = {};
  const pipeline: any[] = [];

  const referenceKeys = Object.keys(Model.schema.paths).filter(
    (key) => Model.schema.paths[key].options.ref
  );

  if (referenceKeys.length > 0) {
    for (const referenceKey of referenceKeys) {
      const RefModel = RefModels.find(
        (refModel) =>
          refModel.modelName === Model.schema.paths[referenceKey].options.ref
      );

      if (RefModel) {
        pipeline.push({
          $lookup: {
            from: RefModel.collection.name,
            localField: referenceKey,
            foreignField: "_id",
            as: "refModel",
          },
        });

        pipeline.push({
          $addFields: {
            refModel: { $arrayElemAt: ["$refModel", 0] },
          },
        });

        for (const [key, value] of filtrosValidos) {
          if (key.startsWith(RefModel.modelName.toLowerCase())) {
            const filterKey = `${key}`;
            const regexFilter =
              typeof value === "string"
                ? { $regex: new RegExp(value, "i") }
                : value;

            pipeline.push({ $match: { [filterKey]: regexFilter } });
          } else {
            query[key] =
              typeof value === "string"
                ? { $regex: new RegExp(value, "i") }
                : value;
          }
        }
      }
    }
  }

  pipeline.push({ $match: query });

  try {
    await connectDatabase();
    const { data, pagination } = await applyPaginationEmb(
      Model,
      event,
      pipeline
    );
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
// export const getFilteredEmbGeneric = async (
//   Model,
//   RefModel,
//   event,
//   context
// ) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   const filtros = event.body || {};
//   const filtrosValidos = Object.entries(filtros).filter(
//     ([, value]) => value !== undefined && value !== null && value !== ""
//   );

//   let query = {};
//   const pipeline: any[] = [];

//   const referenceKey = Object.keys(Model.schema.paths).find(
//     (key) => Model.schema.paths[key].options.ref
//   );

//   if (referenceKey) {
//     pipeline.push({
//       $lookup: {
//         from: RefModel.collection.name,
//         localField: referenceKey,
//         foreignField: "_id",
//         as: "refModel",
//       },
//     });

//     pipeline.push({
//       $addFields: {
//         refModel: { $arrayElemAt: ["$refModel", 0] },
//       },
//     });

//     for (const [key, value] of filtrosValidos) {
//       if (key.startsWith(RefModel.modelName.toLowerCase())) {
//         const filterKey = `${key}`;
//         const regexFilter =
//           typeof value === "string"
//             ? { $regex: new RegExp(value, "i") }
//             : value;

//         pipeline.push({ $match: { [filterKey]: regexFilter } });
//       } else {
//         query[key] =
//           typeof value === "string"
//             ? { $regex: new RegExp(value, "i") }
//             : value;
//       }
//     }
//   }

//   pipeline.push({ $match: query });

//   try {
//     await connectDatabase();
//     const { data, pagination } = await applyPaginationEmb(
//       Model,
//       event,
//       pipeline
//     );
//     const message = customMessage(data, "ga");
//     const body = { ...message, pagination };

//     return {
//       statusCode: 200,
//       headers: responseHeaders,
//       body: JSON.stringify(body),
//     };
//   } catch (err) {
//     return {
//       statusCode: err.statusCode || 500,
//       headers: responseHeaders,
//       body: JSON.stringify({ status: false, error: err.message }),
//     };
//   }
// };
