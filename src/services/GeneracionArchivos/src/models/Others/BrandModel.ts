import mongoose from "mongoose";
import "./OrganizationModel";

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

const BrandSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
    },
    name: {
      type: String,
      unique: true,
      required: [true, "El campo 'name' es requerido"],
    },
    description: {
      type: String,
      required: [true, "El campo 'description' es requerido"],
    },
    website: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String
    },
    logoUrl: {
      type: String
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"],
    },
    organization: {
      type: OrganizationDetails,
    }
  },
  {
    timestamps: true,
  }
);


const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;

