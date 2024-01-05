import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/subcategory/api";

const GetAllSubCategory = {
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

const GetFilterSubCategory = {
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

const GetAllSubCat = {
  handler: `${handlerPath(__dirname)}/Crud/GetAllSubHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/categories`,
      },
    },
  ],
};

const CreateSubCategory = {
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

const GetSubCategory = {
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

const DeleteSubCategory = {
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

const UpdateSubCategory = {
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
  GetAllSubCategory,
  GetFilterSubCategory,
  GetAllSubCat,
  GetSubCategory,
  CreateSubCategory, 
  DeleteSubCategory,
  UpdateSubCategory,
};
