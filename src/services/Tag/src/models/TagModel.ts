import mongoose from "mongoose";
import counterModel from "./../../../../helpers/counterModel.js";
import "./OrganizationModel";

const TagSchema = new mongoose.Schema(
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
    },
    liveUpdate: {
      type: Boolean,
      required: [true, "El campo 'liveUpdate' es requerido"],
    },
    offlineUpdate: {
      type: Boolean,
      required: [true, "El campo 'offlineUpdate' es requerido"],
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

const Tag = mongoose.model("Tag", TagSchema);
export default Tag;