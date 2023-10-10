import mongoose from "mongoose";
import counterModel from "./../../../../helpers/counterModel.js";
import "./../models/OrganizationModel";

const StoreSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    store_name: {
      type: String,
      maxlength: 50,
      required: [true, "El campo 'store_name' es requerido."],
    },
    owner_name: {
      type: String,
      maxlength: 50,
      required: [true, "El campo 'owner_namer' es requerido."],
    },
    owner_num_document:{
      type: String,
      required: [true, "El campo 'owner_num_document' es requerido"]
    },
    owner_email: {
      type: String
    },
    address: { 
      type: String, 
      default: null, 
      maxlength: 255,
      required: [true, "El campo 'addresss' es requerido."],
    },
    email: { 
      type: String, 
      default: null, 
      maxlength: 100,
      required: [true, "El campo 'email' es requerido."],
    },
    phone: {
      type: String,
      maxlength: 15,
    },
    status: { 
      type: String, 
      enum: ['0', '1'], 
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
      ref: "Organization"
    }
  },
  {
    timestamps: true,
  }
);


const Store = mongoose.model("_Store", StoreSchema);
export default Store;
