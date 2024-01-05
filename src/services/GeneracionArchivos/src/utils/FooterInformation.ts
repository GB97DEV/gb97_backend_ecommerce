import axios from "axios"
import { PDFDocument, PDFFont, PDFPage, rgb } from "pdf-lib";

export const FooterInformation = async(doc:PDFDocument, page: PDFPage, normal: PDFFont) => {
  let text = '';
  let y = 25;
  try {
    const response = await axios.get(`https://bucket-images-gb97.s3.amazonaws.com/upload/0691776360001.png`, { responseType: 'arraybuffer' });
    const jpgImage = await doc.embedPng(response.data);
    page.drawImage(jpgImage, {
      x: 20,
      y: y - 15,
      width: 20,
      height: 20,
    });
  } catch (error) {
    console.log(error.message);
  }
  
  text = 'Documento generado por la aplicación POS GB97. Visitanos:'
  page.drawText(text, {
    x: 44,
    y,
    size: 7,
    font: normal,
  });

  let textSize = normal.widthOfTextAtSize(text, 7);
  text = 'https://www.gb97.ec/'
  page.drawText(text, {
    x: textSize + 46,
    y,
    size: 7,
    font: normal,
    color: rgb(0,0,1),
  })

  y -= 8;
  text = 'Para más información comunicate con nostros a través de nuestro correo: informacion@gb97.ec' 
  page.drawText(text, {
    x: 44,
    y,
    size: 7,
    font: normal,
  });

  y -= 8;
  text = 'O mediante nuestra línea telefónica: 02-226-4009'
  page.drawText(text, {
    x: 44,
    y,
    size: 7,
    font: normal,
  });
};