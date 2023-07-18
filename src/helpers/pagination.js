export const applyPagination = async (Model, event, query = {}) => {
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

  // Obtener los campos que son referencias
  const populateFields = [];
  const paths = Model.schema.paths;

  for (let path in paths) {
    const pathObj = paths[path];
    if (pathObj.options && pathObj.options.ref) {
      populateFields.push(path);
    }
  }

  // Crear la consulta base
  let baseQuery = Model.find(query).skip(skip).limit(limit);

  // Asegurarse de que la columna 'createdAt' exista en el modelo
  if ("createdAt" in Model.schema.paths) {
    baseQuery = baseQuery.sort({ createdAt: "desc" });
  }

  // if ("groupName" in Model.schema.paths) {
  //   baseQuery = baseQuery.sort({ groupName: "asc" });
  // }

  // Si hay campos a poblar, añadir cada uno a la consulta con populate
  populateFields.forEach((field) => {
    baseQuery = baseQuery.populate(field);
  });

  // Modificar la consulta para incluir el objeto query en la búsqueda
  let data = await baseQuery.lean();
  // Renombra las propiedades
  data = data.map((item) => {
    if (item.personId) {
      item.person = item.personId;
      delete item.personId;
    }
    if (item.organizationId) {
      item.organization = item.organizationId;
      delete item.organizationId;
    }
    if (item.groupId) {
      item.client = item.clientId;
      delete item.clientId;
    }
    if (item.groupId) {
      item.group = item.groupId;
      delete item.groupId;
    }
    return item;
  });
  const totalCount = await Model.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
    },
  };
};

// export const applyPagination = async (Model, event, query = {}) => {
//   // Obtener queryStringParameters del objeto event
//   const { queryStringParameters } = event;

//   // Obtener los parámetros 'page' y 'limit', asignar valores predeterminados si no están presentes
//   const page = queryStringParameters?.page
//     ? parseInt(queryStringParameters.page)
//     : 1;
//   const limit = queryStringParameters?.limit
//     ? parseInt(queryStringParameters.limit)
//     : 10;

//   const skip = (page - 1) * limit;

//   // Modificar la consulta para incluir el objeto query en la búsqueda
//   const data = await Model.find(query).skip(skip).limit(limit).lean();
//   const totalCount = await Model.countDocuments(query);
//   const totalPages = Math.ceil(totalCount / limit);

//   return {
//     data,
//     pagination: {
//       currentPage: page,
//       totalPages,
//       totalCount,
//       limit,
//     },
//   };
// };
