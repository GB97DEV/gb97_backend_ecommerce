import { PDFPage, PDFFont, RGB, rgb } from "pdf-lib";

interface CenterTextOptions {
  color?: RGB,
  opacity?: number,
}

export const CenterText = (page: PDFPage , font: PDFFont, text: string, size: number, y: number, options: CenterTextOptions = {}) => {
  const { color = rgb(0,0,0), opacity = 1 } = options;
  const textSize: number = font.widthOfTextAtSize(text, size);
  const textX: number = (page.getWidth() - textSize) / 2;
  try{
    page.drawText(text, { 
      x: textX, 
      y, 
      size, 
      font,
      color,
      opacity
    });
  }catch(err){
    console.log(err);
    throw new Error(`Error en el texto: ${text}`);
  }
}