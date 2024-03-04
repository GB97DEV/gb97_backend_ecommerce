import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/address/api";

const GetAllAddress = {
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

const GetFilterAddress = {
  handler: `${handlerPath(__dirname)}/Crud/GetFilterHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/filter`,
      },
    },
  ],
};

const CreateAddress = {
  handler: `${handlerPath(__dirname)}/Crud/CreateHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}`,
      },
    },
  ],
};

const GetAddress = {
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

const DeleteAddress = {
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

const UpdateAddress = {
  handler: `${handlerPath(__dirname)}/Crud/UpdateHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "put",
        path: `${base_path}/{_id}`,
      },
    },
  ],
};

export {
  GetAllAddress,
  GetFilterAddress,
  GetAddress,
  CreateAddress, 
  DeleteAddress,
  UpdateAddress,
};
