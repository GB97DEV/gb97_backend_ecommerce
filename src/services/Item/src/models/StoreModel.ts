import mongoose from "mongoose";
import "./../models/OrganizationModel.ts";

const StoreSchema = new mongoose.Schema(
  {
    store_name: {
      type: String,
      maxlength: 50,
      required: [true, "El campo es requerido."],
    },
    owner_name: {
      type: String,
      maxlength: 50,
      required: [true, "El campo es requerido."],
    },
    address: { 
      type: String, 
      default: null, 
      maxlength: 255,
      required: [true, "El campo es requerido."],
    },
    email: { 
      type: String, 
      default: null, 
      maxlength: 100,
      required: [true, "El campo es requerido."],
    },
    phone: {
      type: String,
      maxlength: 15,
      required: [true, "El campo es requerido."],
    },
    lang: {
      type: String,
      maxlength: 2,
      required: [true, "El campo es requerido."],
    },
    status: { 
      type: String, 
      enum: ['0', '1'], 
      required: [true, 'El campo es requerido.'] 
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization"
    }
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("_Store", StoreSchema);
export default Store;
