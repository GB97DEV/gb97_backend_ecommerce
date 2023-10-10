import mongoose from "mongoose";
import "./../model/OrganizationModel.ts";
import counterModel from "./../../../../helpers/counterModel.js";

const ClientSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    clientStatus: {
      type: Number,
      default: 1,
    },
    type_document: {
      type: Number,
      required: [true, 'El campo "type_document" es requerido'],
    },
    num_document: {
      type: String,
      required: [true, 'El campo "num_document" es requerido'],
    },
    name: {
      type: String,
      required: [true, 'El campo "name" es requerido'],
    },
    email: {
      type: String,
      required: [true, 'El campo "email" es requerido'],
    },
    telephoneNumber: {
      type: String,
      required: [true, 'El campo "telephoneNumber" es requerido'],
    },
    address: {
      type: String,
      required: [true, 'El campo "address" es requerido'],
    },
    type: {
      type: Number,
      required: [true, 'El campo "type" es requerido'],
    },
    liveUpdate: {
      type: Boolean,
      required: [true, 'El campo "liveUpdate" es requerido'],
    },
    offlineUpdate: {
      type: Boolean,
      required: [true, 'El campo "offlineUpdate" es requerido'],
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

const Client = mongoose.model("Client", ClientSchema);
export default Client;
