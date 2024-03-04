import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/order/api";

const GetAllOrder = {
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

const GetFilterOrder = {
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

const CreateOrder = {
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

const GetOrder = {
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

const DeleteOrder = {
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

const UpdateOrder = {
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
  GetAllOrder,
  GetFilterOrder,
  GetOrder,
  CreateOrder, 
  DeleteOrder,
  UpdateOrder,
};
