import * as mongoose from "mongoose";

export const applyPaginationEmb = async (Model, event, pipeline = []) => {
  // Obtener queryStringParameters del objeto event
  const { queryStringParameters } = event;

  // Obtener los parámetros 'page' y 'limit', asignar valores predeterminados si no están presentes
  const page = queryStringParameters?.page
    ? parseInt(queryStringParameters.page)
    : 1;
  const limit = queryStringParameters?.limit
    ? parseInt(queryStringParameters.limit)
    : 100;

  const skip = (page - 1) * limit;

  // Agrega etapas de paginación al pipeline de agregación
  // const paginatedPipeline = [...pipeline, { $skip: skip }, { $limit: limit }];
  const paginatedPipeline = [
    ...pipeline,
    { $sort: { createdAt: -1 } }, // Añade este stage para ordenar los documentos de forma descendente
    { $skip: skip },
    { $limit: limit },
  ];

  // Ejecuta el pipeline de agregación con paginación
  const data = await Model.aggregate(paginatedPipeline).allowDiskUse(true);

  let totalCountPipeline = [
    ...pipeline,
    { $group: { _id: null, count: { $sum: 1 } } },
  ];

  // Ejecuta el pipeline de agregación sin paginación para contar documentos
  const totalCount = await Model.aggregate(totalCountPipeline).allowDiskUse(
    true
  );

  const totalDocs = totalCount.length ? totalCount[0].count : 0;
  const totalPages = Math.ceil(totalDocs / limit);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount: totalDocs,
      limit,
    },
  };
};
