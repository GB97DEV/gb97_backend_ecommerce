const extractFieldValidations = (schema) => {
  const fieldValidations = {};
  const excludedFields = ["_id", "createdAt", "updatedAt", "__v"];

  for (let field in schema.paths) {
    const pathOptions = schema.paths[field].options;

    // Comprueba si el campo está en los excludedFields y si no tiene un alias.
    if (!excludedFields.includes(field) || pathOptions.alias) {
      fieldValidations[field] = {
        type: pathOptions.type.name,
      };

      if (pathOptions.required !== undefined) {
        fieldValidations[field].required = !!pathOptions.required;
      }

      if (pathOptions.maxlength) {
        fieldValidations[field].maxLength = pathOptions.maxlength;
      }

      if (pathOptions.ref) {
        fieldValidations[field].ref = pathOptions.ref;
        fieldValidations[field].api = `${pathOptions.ref
          .toLowerCase()
          .replace("_", "")}`;
      }

      if (pathOptions.enum) {
        fieldValidations[field].enum = pathOptions.enum;
      }
    }
  }

  return fieldValidations;
};

export default extractFieldValidations;

// const extractFieldValidations = (schema) => {
//   const schemaObj = schema.obj;
//   const fieldValidations = {};

//   for (const field in schemaObj) {
//     const fieldSchema = Array.isArray(schemaObj[field])
//       ? schemaObj[field][0]
//       : schemaObj[field];

//     if (fieldSchema.type && fieldSchema.type.obj) {
//       // Si el campo es un objeto (embebido)
//       // Recursión para el esquema embebido
//       fieldValidations[field] = extractFieldValidations(fieldSchema.type);
//     } else {
//       // Extracción normal
//       const { type, required, maxlength, enum: enumValues } = fieldSchema;

//       fieldValidations[field] = {
//         type: type ? type.name : undefined,
//         required: required ? required[0] : false,
//         maxLength: maxlength,
//         enum: enumValues,
//       };
//     }
//   }

//   return fieldValidations;
// };

// export default extractFieldValidations;

// const extractFieldValidations = (schema) => {
//   const schemaObj = schema.obj;
//   const fieldValidations = {};

//   for (const field in schemaObj) {
//     const { type, required, maxlength, enum: enumValues } = schemaObj[field];

//     fieldValidations[field] = {
//       type: type.name,
//       required: required ? required[0] : false,
//       maxLength: maxlength,
//       enum: enumValues,
//     };
//   }

//   return fieldValidations;
// };

// export default extractFieldValidations;
