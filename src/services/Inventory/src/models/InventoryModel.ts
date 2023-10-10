import mongoose from "mongoose";
import "./OrganizationModel";
import "./ItemModel";
import "./SupplierModel"

const InventoryRecordsSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      default: new Date().toISOString(),
    },
    expirationDate: {
      type: String,
      default: new Date().toISOString(),
    },
    documentUrl: {
      type: String,
      default: ""
    },
    documentNumber:{
      type: String,
      default: ""
    },
    quantity: {
      type: Number,
      default: 0
    },
    cost: {
      type: Number,
      default: 0
    }
  }
);

const InventorySchema = new mongoose.Schema(
  {
    supplierId:{
      type: Number,
      unique: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier"
    },
    quantity:{
      type: Number,
      default: 0,
    },
    minStock:{
      type: Number,
      default: 0,
    },
    reorderQuantity:{
      type: Number,
      default: 0,
    },
    maxStock: {
      type: Number,
      default: 0,
    },
    record: [
      {
        type: InventoryRecordsSchema
      }
    ],
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item"
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization"
    },
    // store: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Store"
    // } //Talvez inventario de la sucursal y no de la tienda
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;

