import { PDFDocument, PDFFont, PDFPage, drawRectangle, rgb } from "pdf-lib";
import CustomError from "./CustomError";
import { DrawRectangle } from "./DrawRectangle";
import { DrawText } from "./DrawText";
import { ValidatePage } from "./ValidatePage";

export const TotalInformation = async(doc: PDFDocument, page: PDFPage, normal: PDFFont, bold: PDFFont, oblique: PDFFont, observationData: any, totalData: any, widthPage: number, heightPage: number, margin: number, index: number, y: number): Promise<[number, PDFPage, number]> => {
  let observationIndex = index;
  let totalIndex = index;
  let x = margin;

  try {
    [y, observationIndex] = await Observations(doc, page, normal, bold, oblique, observationData, widthPage, heightPage, margin, index, x, y);
  } catch (err) {
    throw new CustomError(err.message, err.statusCode); //Retorna el error
  }
  x += 390 // Se mueve a la derecha para la siguiente parte
  try {
    [y, totalIndex] = await Total(doc, page, normal, bold, oblique, totalData, widthPage, heightPage, margin, index, x, y);
  } catch (err) {
    throw new CustomError(err.message, err.statusCode); //Retorna el error
  }
  index = Math.max(observationIndex, totalIndex); //En el caso de que el index haya aumentado en cualquiera de las secciones
  page = doc.getPage(index); //Extrae la pagina con el index mayor para devolverlo
  return [y, page, index] //Devuelve los valores
}

const Observations = async(doc: PDFDocument, page: PDFPage, normal: PDFFont, bold: PDFFont, oblique: PDFFont, data: any, widthPage: number, heightPage: number, margin: number, index: number, x: number, y: number): Promise<[number, number]> => {
  //Total de width 370
  let totalHeight = 0;
  let initialY = y;
  let sizeText = 9;
  try {
    [page, y, index] = await ValidatePage(doc, page, widthPage, heightPage, margin, index, y);
    x += 5; //Separación del borde izquierdo del rectangulo.
    y -= 13; //Separación superior del rectangulo.
    DrawText(page, bold, "Observaciones:", sizeText, x + 5, y); //Titulo de la sección
    y -= 13; // Espacio entre textos
    DrawText(page, normal, "Ninguna", sizeText, x + 5, y); //Contenido a poner en la sección
    y -= 5 //Separación inferior del texto con el rectangulo.
    totalHeight = initialY - y; //Calculo del height del rectangulo
    x = margin; //Posición inicial del cursor.
    DrawRectangle(page, x, y, 370, totalHeight); //Dibuja el rectangulo de observaciones
    return [y, index]; //Devuelve los valores
  } catch (err) {
    throw new CustomError(err.message, err.statusCode); //Retorna el error produccido
  }
}

const Total = async(doc: PDFDocument, page: PDFPage, normal: PDFFont, bold: PDFFont, oblique: PDFFont, data: any, widthPage: number, heightPage: number, margin: number, index: number, x: number, y: number): Promise<[number, number]> => {
  const rows = [
    {
      title: "SUBTOTAL 12%",
      content: data.subTotal12.toFixed(2),
      font: bold,
    },
    {
      title: "TOTAL IVA",
      content: data.totalIVA.toFixed(2),
      font: normal,
    },
    {
      title: "TOTAL",
      content: (data.subTotal12 + data.totalIVA).toFixed(2),
      font: bold,
    }
  ];
  //Total de 160
  try {
    let sizeText = 9;
    for(const row of rows ){
      [page, y, index] = await ValidatePage(doc, page, widthPage, heightPage, margin, index, y);
      RowTotal(page, row.font, row.title, row.content, sizeText, x, y);
      y -= 30;
    }
    return [y, index]
  } catch (err) {
    throw new CustomError(err.message, err.statusCode);
  }
}

const RowTotal = async(page: PDFPage, font: PDFFont, title: string, content: string, size: number, x: number, y: number) => {
  let widthText = 0;
  let textX = 0;
  let widthRow = 0;

  //TIene maximo 100 de width}
  widthRow = 100 //Define el widthRow del recuadro
  widthText = font.widthOfTextAtSize(title, size); //Calcula el width total del title
  textX = (widthRow - widthText) / 2; //Calculo para poner el texto en la mitad horizontal del recuadro
  DrawText(page, font, title, size, x + textX, y + 13); //Dibuja el texto del title
  DrawRectangle(page, x, y, widthRow, 30); //Dibuja el recuadro del title
  
  x += 100 //Desplazamiento del cursor para la siguiente parte
  
  //Tiene maximo 60 de width
  widthRow = 60; //Define el widthRow del recuadro
  widthText = font.widthOfTextAtSize(content, size); //Calcula el width total del content
  textX = (widthRow - widthText) / 2; //Calculo para poner el texto en la mitad horizontal del recuadro
  DrawText(page, font, content, size, x + textX, y + 13); //Dibuja el texto del content
  DrawRectangle(page, x, y, widthRow, 30); //Dibuja el recuadro del content
}