import { PDFDocument, PDFPage } from "pdf-lib";

export const DrawQRCode = async(doc:PDFDocument, page: PDFPage, QR:string) => {
  let x = 510;
  let y = 0;
  const qrImage = await doc.embedPng(Buffer.from(QR, 'base64'));
  try {
    page.drawImage(qrImage,{
      x,
      y,
      width: 60,
      height: 60
    })
  } catch (err) {
    console.log(err);
    throw new Error(`Error en el QR`);
  }
}