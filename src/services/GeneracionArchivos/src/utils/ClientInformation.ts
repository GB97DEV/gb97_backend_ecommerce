import { PDFPage, PDFFont, rgb, drawText } from "pdf-lib";
import { CenterText } from "./CenterText";
import { DrawRectangle } from "./DrawRectangle";
import { DrawText } from "./DrawText";
import { FormatDate } from "./FormatDate";
import CustomError from "./CustomError";

export const ClientInformation = async(page: PDFPage, normal: PDFFont, bold: PDFFont, clientData: any, sellingNumber: string, margin: number, widthPage: number, y: number): Promise<number> => {
  let x = margin + 5;
  let initialText = y;
  let totalHeight = 0;

  let textSize = 9;
  let titleSize = 15

  let text = "";
  let widthText = 0;

  const [day, month, year] = FormatDate();

  if(!clientData || clientData === null){
    throw new CustomError("No se pudo obtener la información del Cliente", 404); //Da error si no existe información del cliente
  }

  //Separación superior
  y -= 15;
  try{
  //Primero se dibuja el rectangulo para que no tape las letras
  DrawRectangle(page, margin, y, widthPage - (margin * 2), 20, {color: rgb(0,0.15,0.81), borderWidth: 0, opacity: 0.8}); //Dibuja el rectangulo donde se pondra el titulo
  y += 5; //Aumenta para subir el texto
  text = "INFORMACIÓN DEL CLIENTE"
  CenterText(page, bold, text, titleSize, y, {color: rgb(1,1,1)}); //Dibuja el texto sobre el rectangulo

  y -= 15;
  initialText = y;


  y -= 13;
  text = "N°:";
  widthText = bold.widthOfTextAtSize(text, textSize) + margin + 8;
  DrawText(page, bold, text, textSize, x, y);
  DrawText(page, normal, sellingNumber, textSize, widthText, y);

  y -= 13;
  text = "Fecha de Emisión:"
  widthText = bold.widthOfTextAtSize(text, textSize) + margin + 8;
  DrawText(page, bold, text, textSize, x, y);
  DrawText(page, normal, `${day}/${month}/${year}`, textSize, widthText, y);

  y -= 13;
  text = "Nombres y Apellidos:";
  widthText = bold.widthOfTextAtSize(text, textSize) + margin + 8;
  DrawText(page, bold, text, textSize, x, y);
  DrawText(page, normal, `${clientData.name}`, textSize, widthText, y);

  y -= 13;
  text = "Identificación:";
  widthText = bold.widthOfTextAtSize(text, textSize) + margin + 8;
  DrawText(page, bold, text, textSize, x, y);
  DrawText(page, normal, `${clientData.numDocument}`, textSize, widthText, y);

  y -= 13;
  text = "Correo:";
  widthText = bold.widthOfTextAtSize(text, textSize) + margin + 8;
  DrawText(page, bold, text, textSize, x, y);
  DrawText(page, normal, `${clientData.email}`, textSize, widthText, y);

  y -= 13;
  text = "Dirección:";
  widthText = bold.widthOfTextAtSize(text, textSize) + margin + 8;
  DrawText(page, bold, text, textSize, x, y);
  DrawText(page, normal, `${clientData.address}`, textSize, widthText, y);

  y -= 5;
  totalHeight = initialText - y;
  DrawRectangle(page, x - 5, y, widthPage - (margin * 2), totalHeight);
  return y;
  }catch(err){
    throw new CustomError(err.message, 500); //Manda error

  }
}