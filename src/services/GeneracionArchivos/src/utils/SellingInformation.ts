import { PDFDocument, PDFFont, PDFPage, rgb } from "pdf-lib";
import CustomError from "./CustomError";
import { DrawRectangle } from "./DrawRectangle";
import { DrawText } from "./DrawText";
import { SplitInformation } from "./SplitInformation";
import { ValidatePage } from "./ValidatePage";
import { ValidateNull } from "./ValidateNull";
import { DrawSplitText } from "./DrawSplitText";

export const SellingInformation = async(doc: PDFDocument, page: PDFPage, normal: PDFFont, bold: PDFFont, oblique: PDFFont, items: any, widthPage: number, heightPage: number, margin: number, index: number, y: number): Promise<[number, PDFPage, any[]]> => {
  let x = margin;
  let textSize = 9;
  let widthText = 0;
  let textX = 0;
  let text = "";
  
  let initialY = y;
  let actualY = y; //Valor actual de y
  let minY = y; //Variable para determinar cual es el valor minimo de y
  let totalHeight = 0;
  let spacing = 0;
  try{
    //Se define las cabeceras de la table con su respectiva referencia
    const header = [
      {width: 40, label: "Cant.", ref: "itemQuantity"},
      {width: 180, label: "Producto", ref: "itemName"},
      {width: 170, label: "Descripción", ref: "itemDescription"},
      {width: 60, label: "P. Unitario", ref: "itemBasePrice"},
      {width: 50, label: "Desc.", ref: "itemDiscount"},
      {width: 50, label: "P. Total", ref: "itemTotal"},
    ] //El total de la suma de los width debe ser igual al widthPage menos los margenes de izquierda y derecha

    //Separación de la parte superior.
    y -= 30;
    //Se recorre el array header
    for(const { width, label } of header){
      DrawRectangle(page, x, y, width, 20, {color: rgb(0,0.15,0.81), opacity: 0.8, borderWidth: 0}); //Se dibuja el rectangulo de cada campo del header
      widthText = bold.widthOfTextAtSize(label, textSize); //Tomamos el tamaño del texto
      textX = (width - widthText) / 2; //Tomanos la mitad del texto para posicionarlo a la mitad

      DrawText(page, bold, label, textSize, x + textX, y + 6, {color: rgb(1,1,1)}); //Dibujamos el texto del label del header
      x += width; //Sumamos el ancho del header para ir moviendo cada celda
    }

    x = margin;

    for(const item of items){
      initialY = y; //Posicion inicial del texto tomado para calcular el height de la fila
      for(const {width, ref} of header){
        [page, y] = await ValidatePage(doc, page, widthPage, heightPage, margin, index, y); //Verifica que exista espacio antes de cada fila

        if(ref !== "itemDescription"){
          text = `${item[ref]}`; //Define el la variable text los textos de cada uno de los item en base a la ref definida en el header
        }

        if(ref === "itemDescription"){
          text = `Descripcion: ${ValidateNull(item[ref])}\nComentarios: ${ValidateNull(item["itemComment"])}` //Establece un texto predefindo para el itemDescription segun lo que necesita el usuario
        }

        const textArray = await SplitInformation(text); //Divide el texto en una matriz segun \n para respetar los espacios puestos por el usuario
        y -= 15; //Separación superior
        textArray.map((text) => { //Mapea el textArray
          widthText = normal.widthOfTextAtSize(text, textSize); //Tomamos el tamaño del texto
          if(ref === "itemDescription" || ref === "itemName"){
            textX = 5; //Define el espacio cuando cuando el texto no esta en el medio
          } else {
            textX = (width - widthText) / 2; //Tomanos la mitad del texto para posicionarlo a la mitad
          }

          if(widthText > (width - 10)){
            y = DrawSplitText(page, normal, text, textSize, 100, width, x + textX, y); //Divide el texto largo
          } else {
            DrawText(page, normal, text, textSize, x + textX, y + 2); //Dibuja el texto
          }

          y -= 13; //Separacion para el bucle de textArray
        });
        //Final del for del header
        y += 13; //Eliminar la ultima separación
        minY = Math.min(minY, y); //Determinar el valor minimo de y
        y = initialY; //Reestablece el valor del initialY en caso de que este se haya disminuido
        x += width; //Aumenta el valor de x conforme el width para la posición del cursor
      }
      //Final del for de items
      y = minY - 5; //Establece el valor de y con el valor de minY menos una separación de 5
      totalHeight = initialY - y; //Calcula el tamaño del height del rectangulo que rodea la fila
      x = margin; //Reestablece el valor de x para posicionarlo en el margen
      DrawRectangle(page, x, y, widthPage - (margin * 2), totalHeight); //Dibuja el rectangulo de cada fila
    }
    return [y, page, []] //Devuelve los valores necesitados
  }catch(err){
    throw new CustomError(err.message, 500); //Manda error
  }
}