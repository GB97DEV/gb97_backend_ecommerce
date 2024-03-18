import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/message/api";

const GetMessageToken = {
  handler: `${handlerPath(__dirname)}/Crud/MessageHandler.main`,
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

const SendNotification = {
  handler: `${handlerPath(__dirname)}/Crud/SendNotificationHandler.main`,
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
  GetMessageToken,
  SendNotification,
};
