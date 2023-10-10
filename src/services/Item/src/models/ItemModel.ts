
import mongoose from "mongoose";
import "./CategoryModel";
import "./BrandModel.js";
import "./OrganizationModel";
import "./StoreModel";
import "./SubCategoryModel";
import "./TagModel";
const ItemSchema = new mongoose.Schema(
  {
    Id:{
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
    },
    bar_code: {
      type: Number,
      unique: true,
      index: true,
      required: [true, "El campo 'code' es requerido"],
    },
    description: {
      type: String,
      required: [true, "El campo 'description' es requerido"]
    },
    isVat: {
      type: Boolean,
      required: [true, "El campo 'isVat' es requerido"]
    },
    isService: {
      type: Boolean,
      required: [true, "El campo 'isService' es requerido"]
    },
    imageUrl: {
      type: String
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand"
    },
    features: {
      type: Object,
      required: [true, "El campo 'features' es requerido"]
    },
    liveUpdate: {
      type: Boolean,
      required: [true, "El campo 'liveUpdate' es requerido"]
    },
    offlineUpdate: {
      type: Boolean,
      required: [true, "El campo 'offlineUpdate' es requerido"]
    },
    stores:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "_Store"
      }
    ],
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization"
    }
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;

