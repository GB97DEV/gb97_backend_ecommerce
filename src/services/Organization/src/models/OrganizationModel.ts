import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema(
  {
    organizationId: {
      type: String,
      unique: true,
      index: true,
      required: [true, "El campo 'organizationId' es requerido"],
    },
    organizationAlias: {
      type: String,
      required: [true, "El campo 'organizationAlias' es requerido"],
    },
    organizationName: {
      type: String,
      required: [true, "El campo 'organizationName' es requerido"],
    },
    organizationEmail: {
      type: String,
      required: [true, "El campo 'organizationEmail' es requerido"],
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
      type: Object,
    },
    organizationStatus: {
      type: Number,
      default: 1,
    },
    mod:{
      type: Array 
    }
  },
  {
    timestamps: true,
  }
);

const Organization = mongoose.model("Organization", OrganizationSchema);
export default Organization;
