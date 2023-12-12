import { PDFPage, RGB, rgb } from "pdf-lib";

interface DrawRectangleOptions {
  borderColor?: RGB;
  borderWidth?: number;
  color?: RGB;
  opacity?: number;
}

export const DrawRectangle = (page: PDFPage, x: number, y: number, width: number, height: number, options: DrawRectangleOptions = {}) => {
  const { 
    borderColor = rgb(0, 0, 0), 
    borderWidth = 0.5,
    color = rgb(0, 0, 0),
    opacity = 0,
  } = options;

  page.drawRectangle({
    x,
    y,
    width,
    height,
    borderColor,
    borderWidth,
    color,
    opacity
  });
}