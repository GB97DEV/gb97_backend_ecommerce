import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/pago/api";



const GetCheckoutId = {
  handler: `${handlerPath(__dirname)}/Crud/CheckoutIdHandler.main`,
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

const GetStatusPayment = {
  handler: `${handlerPath(__dirname)}/Crud/StatusPaymentHandler.main`,
  events: [
    {
      http: {
        cors: {
          origins: ["*"],
        },
        method: "post",
        path: `${base_path}/status`,
      },
    },
  ],
};

export {
  GetCheckoutId, 
  GetStatusPayment,
};
