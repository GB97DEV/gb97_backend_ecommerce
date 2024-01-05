import { PDFDocument, PDFPage } from "pdf-lib";

export const ValidatePage = async(doc: PDFDocument, page: PDFPage, widthPage: number, heightPage: number, margin: number, index: number, y: number): Promise<[PDFPage, number, number]> => {
  if(y < 80){ //Comparo el limite maximo de la hoja
    doc.addPage([widthPage, heightPage]);
    index++;
    page = doc.getPage(index++);
    y = heightPage + margin;
  }
  return [page, y, index];
}