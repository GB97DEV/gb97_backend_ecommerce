import mongoose from "mongoose";
import "./../models/OrganizationModel.ts";

const ClientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
    },
    clientStatus: {
      type: Number,
      default: 1,
    },
    num_document: {
      type: String,
      required: [true, 'El campo "num_document" es requerido'],
    },
    name: {
      type: String,
      required: [true, 'El campo "name" es requerido'],
    },
    lastName: {
      type: String,
    },
    businessName: {
      type: String,
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
