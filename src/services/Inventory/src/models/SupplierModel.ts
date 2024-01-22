import mongoose from "mongoose";
import "./OrganizationModel";
import "./BrandModel";

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

const BrandDetails = new mongoose.Schema({
  brandId: {
    type: Number,
    default: null
  },
  brandUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    default: null,
  }
},{
  _id: false
})

const SupplierSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    address:{
      type: String,
      required: [true, "El campo 'address' es requerido"],
    },
    city: {
      type: String,
      required: [true, "El campo 'city' es requerido"],
    },
    state: {
      type: String,
      required: [true, "El campo 'state' es requerido"],
    },
    country: {
      type: String,
      required: [true, "El campo 'country' es requerido"],
    },
    lat:{
      type: Number,
      required: [true, "El campo 'lat' es requerido"],
    },
    lng:{
      type: Number,
      required: [true, "El campo 'lng' es requerido"],
    },
    zip: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
    },
    phone: {
      type: String,
    },
    leadTime: {
      type: Number,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    brands: [
      {
        type: BrandDetails
      }
    ],
    syncStatus: {
      type: Number,
      required: [true, "El campo 'name' es requerido"],
    },
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true,
  }
);


const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;

