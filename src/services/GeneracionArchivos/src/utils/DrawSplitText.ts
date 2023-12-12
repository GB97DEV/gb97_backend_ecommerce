import { NumberCapability } from "aws-sdk/clients/pinpointsmsvoicev2";
import { PDFPage, PDFFont } from "pdf-lib";
import { DrawText } from "./DrawText";

interface DrawSplitTextOptions {
  spacing?: number
}

export const DrawSplitText = (page: PDFPage, font: PDFFont, text: string, size: number, corte: number, width: number, x: number, y: number, options: DrawSplitTextOptions = {}): number => {
  const {spacing = 13} = options;
  
  let firstPart = "";
  let secondPart = "";

  let textSize = 0;
  let cort = corte; //Asigna el valor de corte para manipular y no perderlo
  do{
    firstPart = text.slice(0, cort); //Divide el texto antes del corte
    secondPart = text.slice(cort); //Divide el texto despues del corte
    textSize = font.widthOfTextAtSize(firstPart, size); //Toma el tamaño de firstPart
    if(textSize < width){ //Compara el tamaño del texto en base al width
      if(firstPart.charAt(firstPart.length - 1) === " "){ //Si el ultimo caracter es un espacio se detiene
        break;
      }
    }
    cort -= 1; //Disminuye el corte
  }while(cort > 0); //Ciclo mientras cort sea mayor a 0

  DrawText(page, font, firstPart, size, x, y); //Dibuja el firstPart
  y -= spacing //Separa el texto en base al spacing definido

  textSize = font.widthOfTextAtSize(secondPart, size); //Toma el valor de la longitud del secondText
  if(textSize > width){ //Compara la longitud con el width
    y = DrawSplitText(page, font, secondPart, size, corte, width, x, y, options); //Si es mayor hace un llamado nuevamente
  }else{
    DrawText(page, font, secondPart, size, x, y); //Si no es mayor pone el texto y termina el bucle
  }
  return y;
}