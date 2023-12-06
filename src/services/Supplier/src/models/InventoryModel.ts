import mongoose from "mongoose";
import "./OrganizationModel";
import "./ItemModel";
import "./StoreModel";
import "./SupplierModel";
import "./CategoryModel";
import "./SubCategoryModel";

const ItemDetails = new mongoose.Schema({
  itemId:{
    type: Number,
    default: null
  },
  itemUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    default: null,
  },
  categoryId:{
    type: Number,
    default: null
  },
  categoryUuid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  subcategoryId: {
    type: Number,
    default: null
  },
  subcategoryUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
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
    ref: "Organization",
    default: null,
  }
},{
  _id: false,
});

const SupplierBranchDetails = new mongoose.Schema({
  supplierBranchId:{
    type: Number,
    default: null
  },
  supplierBranchUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
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
    price: {
      type: Number,
    },
    discount: {
      type: Number,
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
    suppliers: [
      {
        type: SupplierBranchDetails
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;

