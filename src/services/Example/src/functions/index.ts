import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/positions/api";

const GetAllPositions = {
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

const GetFilterPosition = {
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

const CreatePosition = {
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

const GetPosition = {
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

const DeletePosition = {
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

const UpdatePosition = {
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
  GetAllPositions,
  GetFilterPosition,
  GetPosition,
  CreatePosition, 
  DeletePosition,
  UpdatePosition,
};
