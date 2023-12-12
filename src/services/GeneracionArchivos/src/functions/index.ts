import { handlerPath } from "../../../../libs/core/HandlerResolver";

const base_path: string = "gb97/pdf-selling/api";

const PDFSelling = {
  handler: `${handlerPath(__dirname)}/Crud/PDFSellingHandler.main`,
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

export {
  PDFSelling
};
