module.exports.arnAuthorizer = () => ({
  dev: "arn:aws:lambda:us-east-1:503456759796:function:back-authorizer-dev-Authorizer",
  prod: "arn:aws:lambda:us-east-1:503456759796:function:back-authorizer-prod-Authorizer",
});

module.exports.jwtSecret = () => ({
  dev: "HKHVHJVKBKJKJBKBKHKBMKHB",
  prod: "HKHVHJVKBKJKJBKBKHKBMKHB",
});

module.exports.databaseM = () => ({
  prod: {
    mongoURL:
      "mongodb+srv://bg97proyectos:nNqnI2iDGfoWD1z2@gb97.vfdyrvl.mongodb.net/gb97Dev?retryWrites=true&w=majority", // ingresar el valor url correcto para dev
  },
  dev: {
    mongoURL:
      "mongodb+srv://bg97proyectos:nNqnI2iDGfoWD1z2@gb97.vfdyrvl.mongodb.net/gb97Prod?retryWrites=true&w=majority",
  },
});

module.exports.region = () => ({
  dev: {
    regionAws: "us-east-2",
  },
  prod: {
    regionAws: "us-east-1",
  },
});
