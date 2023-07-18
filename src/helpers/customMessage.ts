function customMessage(obj, type, acceptLanguage) {
  switch (type) {
    case "u":
      let message: string;
      if (acceptLanguage === "es") {
        message = "Registro " + obj._id + " actualizado exitosamente.";
      } else {
        message = "Regiter " + obj._id + " successfully updated.";
      }
      return {
        response: true,
        message: message,
      };
      break;

    case "c":
      let messageCreate: string;
      if (acceptLanguage === "es") {
        messageCreate = "Registro creado exitosamente.";
      } else {
        messageCreate = "Record created successfully.";
      }
      return {
        response: true,
        message: messageCreate,
      };
      break;

    case "ga":
      let messageGetAll: string;
      if (acceptLanguage === "es") {
        messageGetAll = "Registros encontrados satisfactoriamente.";
      } else {
        messageGetAll = "Records found successfully.";
      }
      return { response: true, message: messageGetAll, data: obj };
      break;

    case "g":
      let messageGet: string;
      if (acceptLanguage === "es") {
        messageGet = "Consulta exitosa.";
      } else {
        messageGet = "Successful query.";
      }
      return { response: true, message: messageGet, data: obj };
      break;

    case "d":
      let messageDelete: string;
      if (acceptLanguage === "es") {
        messageDelete = "Registro eliminado exitosamente.";
      } else {
        messageDelete = "Record deleted successfully.";
      }
      return {
        response: true,
        message: messageDelete,
        data: obj,
      };
      break;

    case "sc":
      return {
        response: true,
        message: "Registros semilla creados exitosamente.",
      };
      break;

    default:
      return { response: true, message: "Por favor envia un tipo." };
      break;
  }
}

export default customMessage;
