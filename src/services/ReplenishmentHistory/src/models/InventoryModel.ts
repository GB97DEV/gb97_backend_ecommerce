import mongoose from "mongoose";
import "./OrganizationModel";
import "./ItemModel";
import "./StoreModel"

const ItemDetails = new mongoose.Schema({
  itemId:{
    type: Number,
    default: null
  },
  itemUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    default: null,
  }
},{
  _id: false,
});

const StoreDetails = new mongoose.Schema({
  storeId:{
    type: Number,
    default: null
  },
  storeUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_Store",
    default: null,
  }
},{
  _id: false,
});

const OrganizationDetails = new mongoose.Schema({
  organizationId:{
    type: Number,
    default: null
  },
  organizationUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "",
    default: null,
  }
},{
  _id: false,
});


const InventorySchema = new mongoose.Schema(
  {
    Id:{
      type: Number,
      unique: true,
    },
    quantity:{
      type: Number,
      required: [true, "El campo 'quantity' es requerido"]
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
    syncStatus: {
      type: Number
    },
    item: {
      type: ItemDetails,
    },
    store: {
      type: StoreDetails
    },
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;

