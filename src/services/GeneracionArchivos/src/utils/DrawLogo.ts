import { PDFDocument, PDFPage } from "pdf-lib";
import axios from "axios";

export const DrawLogo = async(doc: PDFDocument, page: PDFPage, organizationLogo: string, x: number, y: number) =>{
  const width = 130;
  const height = 50;
  const defaultWH = 50;
  try {
    const pngResponse = await axios.get(organizationLogo, { responseType: 'arraybuffer' });
    const pngImage = await doc.embedPng(pngResponse.data);
    page.drawImage(pngImage, {
      x,
      y,
      width,
      height,
    });
  } catch (pngError) {
    const response = await axios.get(`https://bucket-images-gb97.s3.amazonaws.com/upload/default.png`, { responseType: 'arraybuffer' });
    const defaultImage = await doc.embedPng(response.data);
    page.drawImage(defaultImage, {
      x: 480,
      y,
      width: defaultWH,
      height: defaultWH,
    })
  }
}