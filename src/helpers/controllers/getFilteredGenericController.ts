import connectDatabase from "../../database/mongodb";
import customMessage from "../customMessage";
import { applyPagination } from "./../pagination";
import responseHeaders from "./../responseHeaders";

export const getFilteredGeneric = async (
  Model,
  event,
  context,
  acceptLanguage
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  // Usa event.body para leer los filtros
  const rawFiltros = event.body ? JSON.parse(event.body) : {};

  // Extrae startDate y endDate de rawFiltros
  const { startDate, endDate, ...restFiltros } = rawFiltros;

  // Filtra las entradas con valores vacíos o no existentes y crea el objeto query
  const filtrosValidos = Object.entries(restFiltros).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );

  // Convierte los filtros a minúsculas
  const filtrosLowerCase = filtrosValidos.map(([key, value]) => [
    key,
    typeof value === "string" ? value.toLowerCase() : value,
  ]);

  // Crea un objeto createdAtQuery si startDate y endDate están presentes
  const createdAtQuery =
    startDate && endDate
      ? {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        }
      : {};

  // Crea un objeto de consulta a partir de filtrosLowerCase y createdAtQuery
  const query = {
    ...Object.fromEntries(filtrosLowerCase),
    ...createdAtQuery,
  };

  // Crea un regex case-insensitive para cada filtro de tipo string
  const queryRegex = {};
  for (const [key, value] of filtrosLowerCase) {
    if (typeof value === "string") {
      queryRegex[key] = { $regex: new RegExp(value, "i") };
    }
  }

  // Combina el objeto query con el objeto queryRegex
  const finalQuery = { ...query, ...queryRegex };

  try {
    await connectDatabase();
    const { data, pagination } = await applyPagination(
      Model,
      event,
      finalQuery
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

    const message = customMessage(data, "ga", acceptLanguage);

    const body = {
      ...message,
      pagination,
    };
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(body),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
};
