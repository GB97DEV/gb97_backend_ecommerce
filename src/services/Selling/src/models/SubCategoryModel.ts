import mongoose from "mongoose";
import "./OrganizationModel";
import "./CategoryModel";

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

const CategoryDetails = new mongoose.Schema({
  categoryId: {
    type: Number,
    default: null
  },
  categoryUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  }
}, {
  _id: false // Configura _id como false para el esquema OrganizationDetails
});

const SubCategorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
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
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"],
    },
    category: {
      type: CategoryDetails
    },
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true,
  }
);


const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
export default SubCategory;