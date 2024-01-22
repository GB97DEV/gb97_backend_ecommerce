import Inventory from "../models/InventoryModel"

export const CreateRegister = async(inventoryUuid: string, registryType: number ,quantity: number) => {
  let inventoryQuantity = null;
  let resp = {
    previous: 0,
    replenishment: 0,
    release: 0,
    current: 0
  }
  try{
    const objInventory: any = await Inventory.findById(inventoryUuid);
    if(objInventory){
      inventoryQuantity = objInventory.quantity;
      resp.previous = inventoryQuantity;
      if(registryType === 1){ //Reposicion
        inventoryQuantity += quantity;
        resp.replenishment = quantity;
      }
      if(registryType === 2){ //Salida de Inventario
        inventoryQuantity -= quantity;
        resp.release = quantity
      }
      resp.current = inventoryQuantity;
    }
    if(inventoryQuantity){
      const newObj = {
        quantity: inventoryQuantity,
      }
      const newInventory = await Inventory.findByIdAndUpdate(inventoryUuid, newObj,{new: true});

      return {
        inventory: newInventory,
        changes:{...resp},
      }
    }
  } catch(err){
    console.log(err.message);
  }
}

export const ChangeRegister = async(inventoryUuid: string, registryType: number, actualQuantity: number, newQuantity: number) => {
  let inventoryQuantity = null;
  let resp = {
    previous: 0,
    replenishment: 0,
    release: 0,
    current: 0
  }
  let quantity = actualQuantity - newQuantity;
  try{
    const objInventory: any = await Inventory.findById(inventoryUuid);
    if(objInventory){
      inventoryQuantity = objInventory.quantity;
      resp.previous = inventoryQuantity;
      if(registryType === 1){ //Reposicion
        inventoryQuantity -= quantity;
        resp.replenishment = Math.abs(quantity);
      }
      if(registryType === 2){ //Salida de Inventario
        inventoryQuantity += quantity;
        resp.release = Math.abs(quantity)
      }
      resp.current = inventoryQuantity;
    }
    if(inventoryQuantity){
      const newObj = {
        quantity: inventoryQuantity,
      }
      const newInventory = await Inventory.findByIdAndUpdate(inventoryUuid, newObj,{new: true});

      return {
        inventory: newInventory,
        changes:{...resp},
      }
    }
  } catch(err){
    console.log(err.message);
  }
}
