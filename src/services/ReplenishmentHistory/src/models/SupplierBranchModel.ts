import mongoose from "mongoose";
import "./OrganizationModel";
import "./SupplierModel"

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
})

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

const SupplierBranchSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    street: {
      type: String,
      required: [true, "El campo  'street' es requerido"]
    },
    city: {
      type: String,
      required: [true, "El campo  'city' es requerido"]
    },
    state: {
      type: String,
      required: [true, "El campo  'state' es requerido"]
    },
    zip: {
      type: String,
      required: [true, "El campo  'zip' es requerido"]
    },
    country: {
      type: String,
      required: [true, "El campo 'country' es requerido"]
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String
    },
    website: {
      type: String,
    },
    logoUrl: {
      type: String
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"],
    },
    supplier: {
      type: SupplierDetails
    },
    organization:{
      type: OrganizationDetails
    }
  },
  {
    timestamps: true,
  }
);


const SupplierBranch = mongoose.model("SupplierBranch", SupplierBranchSchema);
export default SupplierBranch;

