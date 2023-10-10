import mongoose from "mongoose";
import "./OrganizationModel.js";

const SupplierSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
    },
    logoUrl: {
      type: String,
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


const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;

