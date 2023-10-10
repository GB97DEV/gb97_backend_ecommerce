import mongoose from "mongoose";
import counterModel from "./../../../../helpers/counterModel.js";
import "./OrganizationModel";

const SubCategorySchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      required: [true, "El campo 'Id' es requerido"],
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
    },
    description: {
      type: String,
      required: [true, "El campo 'description' es requerido"],
    },
    imageUrl:{
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


const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
export default SubCategory;