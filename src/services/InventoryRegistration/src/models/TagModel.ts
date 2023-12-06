import mongoose from "mongoose";
import "./OrganizationModel";
import "./SubCategoryModel";

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

const SubCategoryDetails = new mongoose.Schema({
  subcategoryId: {
    type: Number,
    default: null
  },
  subcategoryUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    default: null
  }
},{
  _id: false
});

const TagSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
    },
    description: {
      type: String,
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"],
    },
    subcategory: {
      type: SubCategoryDetails
    },
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", TagSchema);
export default Tag;