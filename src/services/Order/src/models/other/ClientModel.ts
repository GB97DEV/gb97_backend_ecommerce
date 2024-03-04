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

const ClientSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    clientStatus: {
      type: Number,
      default: 1,
    },
    numDocument: {
      type: String,
      required: [true, 'El campo "numDocument" es requerido'],
    },
    typeDocument: {
      type: Number,
      required: [true, 'El campo "typeDocument" es requerido'],
    },
    name: {
      type: String,
      required: [true, 'El campo "name" es requerido'],
    },
    businessName: {
      type: String
    },
    email: {
      type: String,
    },
    telephoneNumber: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'El campo "address" es requerido'],
    },
    type: {
      type: Number,
      required: [true, 'El campo "type" es requerido'],
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"]
    },
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", ClientSchema);
export default Client;
