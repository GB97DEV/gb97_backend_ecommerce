import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/punto-venta/user";

const GetAllUsers = {
  handler: `${handlerPath(__dirname)}/Crud/GetAllHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "get",
        path: `${base_path}`,
      },
    },
  ],
};

const RegisterUsers = {
  handler: `${handlerPath(__dirname)}/Crud/RegisterHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/registro`,
      },
    },
  ],
};

const ResetPassUsers = {
  handler: `${handlerPath(__dirname)}/Crud/ResetPassHandler.main`,
  timeout: 20,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/reset-pass`,
      },
    },
  ],
};

const ResetPasswordConfirmUsers = {
  handler: `${handlerPath(__dirname)}/Crud/ResetPasswordConfirmHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/cambiar-clave`,
      },
    },
  ],
};

const ResetPasswordConfirmCode = {
  handler: `${handlerPath(__dirname)}/Crud/ResetPassConfirmCodeHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/confirm-code-pass`,
      },
    },
  ],
};

const UpdateUsers = {
  handler: `${handlerPath(__dirname)}/Crud/UpdateHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "put",
        path: `${base_path}/update/{id}`,
      },
    },
  ],
};

const GetUsers = {
  handler: `${handlerPath(__dirname)}/Crud/GetHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "get",
        path: `${base_path}/{_id}`,
      },
    },
  ],
};

const Login = {
  handler: `${handlerPath(__dirname)}/Crud/LoginHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/login`,
      },
    },
  ],
};

const ValidateToken = {
  handler: `${handlerPath(__dirname)}/Crud/ValidateTokenHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/validate-token`,
      },
    },
  ],
};

const DeleteUser = {
  handler: `${handlerPath(__dirname)}/Crud/DeleteHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/delete/{_id}`,
      },
    },
  ],
};

export {
  Login,
  GetAllUsers,
  RegisterUsers,
  GetUsers,
  UpdateUsers,
  ValidateToken,
  ResetPassUsers,
  ResetPasswordConfirmUsers,
  DeleteUser,
  ResetPasswordConfirmCode,
};
