export const SellingNumber = (store: any, sellingCode: number): string => {
  if(!store || store === null){
    throw new Error("No se pudo obtener la información de la tienda")
  }

  return `001-${ZeroFormat(store.code, 3)}-${ZeroFormat(sellingCode, 10)}`
}

const ZeroFormat = (value: number, long: number): string => {
  const valueString: string = value.toString();
  const actualLong: number = valueString.length;

  // Calcula la cantidad de ceros que se deben agregar
  const quantZeros: number = Math.max(0, long - actualLong);

  // Crea la cadena final con ceros a la izquierda y concatena el valor original
  const finalString: string = "0".repeat(quantZeros) + valueString;

  return finalString;
}