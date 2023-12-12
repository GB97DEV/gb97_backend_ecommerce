export const SplitInformation = async(information: string): Promise<string[]> => {
  return information.split("\n"); //Divide los textos para respetar las separaciones deifnidas
}