import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/rephist/api";

const GetAllRepHis = {
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

const GetFilterRepHis = {
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

const CreateRepHis = {
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

const GetRepHis = {
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

const DeleteRepHis = {
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

const UpdateRepHis = {
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
  GetAllRepHis,
  GetFilterRepHis,
  GetRepHis,
  CreateRepHis, 
  DeleteRepHis,
  UpdateRepHis,
};
