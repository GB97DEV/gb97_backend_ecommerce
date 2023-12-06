import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
    },
    organizationId: {
      type: String,
      unique: true,
      index: true,
      required: [true, "El campo 'organizationId' es requerido"],
    },
    organizationAlias: {
      type: String,
    },
    organizationName: {
      type: String,
      required: [true, "El campo 'organizationName' es requerido"],
    },
    organizationEmail: {
      type: String,
      required: [true, "El campo 'organizationEmail' es requerido"],
    },
    organizationLogo: {
      type: String,
    },
    organizationOwner: {
      type: String,
      required: [true, "El campo 'organizationOwner' es requerido"]
    },
    organizationOwnerDocument:{
      type: String,
      required: [true, "El campo 'organizationOwnerDocument' es requerido"]
    },
    organizationOwnerEmail: {
      type: String,
    },
    organizationTelephone: {
      type: String,
    },
    organizationCellphone: {
      type: String,
    },
    organizationAddress: {
      type: String,
    },
    organizationWebsite: {
      type: String,
    },
    organizationSocials: {
      type: String,
    },
    organizationStatus: {
      type: Number,
      default: 1,
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"]
    }
  },
  {
    timestamps: true,
  }
);


const Organization = mongoose.model("Organization", OrganizationSchema);
export default Organization;