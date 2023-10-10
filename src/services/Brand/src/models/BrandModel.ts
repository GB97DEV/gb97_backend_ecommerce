import mongoose from "mongoose";
import "./OrganizationModel";

const BrandSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
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
    logo_url: {
      type: String
    },
    liveUpdate: {
      type: Boolean,
      required: [true, "El campo 'liveUpdate' es requerido"]
    },
    offlineUpdate: {
      type: Boolean,
      required: [true, "El campo 'offlineUpdate' es requerido"]
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    timestamps: true,
  }
);


const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;

