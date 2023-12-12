import { PDFPage, PDFFont, rgb, RGB } from "pdf-lib";
import { FormatDocument } from "./FormatDocument";
import { ValidateNull } from "./ValidateNull";

interface DrawTextOptions {
  color?: RGB,
}

export const DrawText = (page: PDFPage, font: PDFFont, text: string, size: number, x: number, y: number, options: DrawTextOptions = {}) => {
  const { color = rgb(0,0,0) } = options;
  const content = ValidateNull(text); 
  try{
    page.drawText(FormatDocument(content),{
      x,
      y,
      size,
      font,
      color
    });
  } catch(err){
    console.log(err);
    throw new Error(`Error en el texto: ${text}`);
  }
}