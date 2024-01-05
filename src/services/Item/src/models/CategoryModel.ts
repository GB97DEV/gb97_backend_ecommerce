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

const CategorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
    },
    importName: {
      type: String,
    },
    shortName: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl:{
      type: String,
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"],
    },
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
