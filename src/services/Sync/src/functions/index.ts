import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/sync/api";


const GetSync = {
  handler: `${handlerPath(__dirname)}/Crud/GetHandler.main`,
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



export {
  GetSync
};
