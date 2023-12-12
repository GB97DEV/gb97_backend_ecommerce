export const ValidateNull = (text: string) => {
  if(!text || text === 'undefined' || text === "")
    return "No definido";
  return text;
}