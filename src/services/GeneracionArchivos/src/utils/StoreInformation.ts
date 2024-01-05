import CustomError from "./CustomError";

import { PDFDocument, PDFFont, PDFPage } from "pdf-lib";

import { MiddleWhiteSpace } from "./MiddleWhiteSpace";
import { CenterText } from "./CenterText";
import { ValidateNull } from "./ValidateNull";
import { DrawLogo } from "./DrawLogo";
import { DrawText } from "./DrawText";
import { DrawRectangle } from "./DrawRectangle";

export const StoreInformation = async(doc: PDFDocument, page: PDFPage, normal: PDFFont, bold: PDFFont, storeData: any, y: number, widthPage: number, margin: number): Promise<[number]> => {
  let corte: number = 0;
  let text: string = "";
  let widthTextSize: number = 0;
  let totalHeight = 0;
  let initialText = 0;
  let minHeigth = 55;
  
  let x = margin;
  let textSize = 9;
  let titleSize = 15;
  
  if(!storeData || storeData === null){
    throw new CustomError("Error al consultar la tienda", 404);
  }

  y -= 10; //Separación superior del texto del borde de la hoja.
  try{
    text = storeData.storeName; //Define el nomnbre de la organización
    widthTextSize = bold.widthOfTextAtSize(text, titleSize); //Toma el valor de la longitud del texto en base a titleSize y la fuente bold
    //Compara la logintud del texto al tamaño de ka hoja
    if(widthTextSize > widthPage){
      //Si es mayor
      corte = MiddleWhiteSpace(text); //Busca el espacio en blanco mas cercano a la mitad
      let firstText: string = text.slice(0, corte).trim(); //Divide la primera parte del texto
      let secondText: string = text.slice(corte).trim(); //Divide la segunda parte del texto
      CenterText(page, bold, firstText, titleSize, y); //Dibuja la primera parte del texto
      y -= 24; //Realiza una separación
      CenterText(page, bold, secondText, titleSize, y); //Dibuja la segunda parte del texto
    } else{
      CenterText(page, bold, text, titleSize, y); //Dibuja el texto en la mitad de la hoja
    }
    //Separación de la parte superior
    y -= 10;
    //Toma el valor inicial de y para definir la altura del rectangulo
    initialText = y;

    //Inicio del texto
    y -= 13;
    text = "Dirección:"
    DrawText(page, bold, text, textSize, margin + 5, y);
    widthTextSize = bold.widthOfTextAtSize(text, textSize) + margin + 8;
    DrawText(page, normal,`${storeData.address}`, textSize, widthTextSize, y);

    y -= 13;
    text = "Correo:"
    DrawText(page, bold, text, textSize, margin + 5, y);
    widthTextSize = bold.widthOfTextAtSize(text, textSize) + margin + 8;
    DrawText(page, normal,`${storeData.email}`, textSize, widthTextSize, y);

    y -= 13;
    text = "Telefono:"
    DrawText(page, bold, text, textSize, margin + 5, y);
    widthTextSize = bold.widthOfTextAtSize(text, textSize) + margin + 8;
    DrawText(page, normal,`${storeData.phone}`, textSize, widthTextSize, y);

    // //Valida si existen los numeros de telefono.
    // if(ValidateNull(organizationData.organizationTelephone) === ValidateNull(organizationData.organizationCellphone)){
    //   DrawText(page, normal, "No definido", textSize, widthTextSize, y); //En caso de no tener ninguno pone un No definido de manera general.
    // }else{
    //   text = ValidateNull(`${organizationData.organizationTelephone}`)
    //   //Pone los números de telefono.
    //   DrawText(page, normal, text, textSize, widthTextSize, y);      
    //   if(ValidateNull(`${organizationData.organizationCellphone}`) !== "No definido"){
    //     widthTextSize += normal.widthOfTextAtSize(text, textSize) + 3;
    //     DrawText(page, normal, `/ ${organizationData.organizationCellphone}`, textSize, widthTextSize, y);      
    //   }
    // }
    //Dibuja el logo de la organización
    //Hace una separación y dibuja el rectangulo
    y -= 5;
    totalHeight = initialText - y; //Calcula la altura del rectangulo en base a todo el texto.
    if(totalHeight < minHeigth){
      y -= (minHeigth - totalHeight);
      totalHeight = minHeigth;
    }
    await DrawLogo(doc, page, storeData.storeData, 420, y + 3);
    DrawRectangle(page, x, y, widthPage - (margin * 2), totalHeight, {borderWidth: 0.5}); //Dibuja el rectangulo.
    
    return [ y ] ; //Retorna valores.
  } catch(err){
    throw new CustomError(err.message, 500); //Manda error
  }
}