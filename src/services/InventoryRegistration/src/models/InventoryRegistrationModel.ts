import mongoose from "mongoose";
import "./InventoryModel";
import "./SupplierModel";
import "./OrganizationModel";
import "./SellingModel";

const InventoryDetails = new mongoose.Schema({
  inventoryId: {
    type: Number,
    default: null
  },
  inventoryUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    default: null,
  }
}, {
  _id: false
});

const SupplierDetails = new mongoose.Schema({
  supplierId: {
    type: Number,
    default: null
  },
  supplierUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    default: null
  }
},{
  _id: false
});

const SellingDetails = new mongoose.Schema({
  sellingId: {
    type: Number,
    default: null
  },
  sellingUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Selling",
    default: null
  }
},{
  _id: false
});

const OrganizationDetails = new mongoose.Schema({
  organizationId: {
    type: Number,
    default: null
  },
  organizationUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    default: null,
  }
}, {
  _id: false // Configura _id como false para el esquema OrganizationDetails
});

const InventoryRegistrationSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    registryType:{
      type: Number,
      required: [true, "El campo 'registryType' es requerido"]
    },
    date: {
      type: String,
      default: new Date().toISOString(),
    },
    expirationDate: {
      type: String,
      default: new Date().toISOString(),
    },
    quantity: {
      type: Number,
      required: [true, "El campo 'quantity' es requerido"]
    },
    cost: {
      type: Number,
    },
    payment: {
      type: Object,
    },
    totalPayment:{
      type: Number
    },
    documentUrl: {
      type: String
    },
    documentNumber: {
      type: String
    },
    comments: {
      type: String,
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"],
    },
    inventory: {
      type: InventoryDetails,
    },
    supplier: {
      type: SupplierDetails
    },
    selling:{
      type: SellingDetails,
    },
    organization: {
      type: OrganizationDetails
    }
  },
  {
    timestamps: true,
  }
);


const InventoryRegistration = mongoose.model("InventoryRegistration", InventoryRegistrationSchema);
export default InventoryRegistration;

