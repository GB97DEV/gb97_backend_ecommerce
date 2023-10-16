
import mongoose from "mongoose";
import "./CategoryModel";
import "./BrandModel.js";
import "./OrganizationModel";
import "./StoreModel";
import "./SubCategoryModel";
import "./TagModel";

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

const TagsDetails = new mongoose.Schema({
  tagId: {
    type: Number,
    default: null
  },
  tagUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
    default: null
  }
},{
  _id: false
});

const BrandDetails = new mongoose.Schema({
  brandId: {
    type: Number,
    default: null
  },
  brandUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    default: null
  }
},{
  _id: false
});

const StoreDetails = new mongoose.Schema({
  storeId: {
    type: Number,
    default: null
  },
  storeUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_Store",
    default: null
  }
},{
  _id: false
});

const ItemSchema = new mongoose.Schema(
  {
    Id:{
      type: Number,
      unique: true,
    },
    code: {
      type: String,
    },
    barcode: {
      type: String,
      required: [true, "El campo 'barcode' es requerido"],
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
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
    isVariant: {
      type: Boolean,
      required: [true, "El campo 'isVariant' es requerido"]
    },
    imageUrl: {
      type: String
    },
    cost: {
      type: Number,
    },
    price: {
      type: Number,
      required: [true, "El campo 'price' es requerido"]
    },
    syncStatus:{
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"]
    },
    features: {
      type: Object,
      required: [true, "El campo 'features' es requerido"]
    },
    itemCategory: {
      type: CategoryDetails
    },
    subCategory: {
      type: SubCategoryDetails
    },
    itemTags: [
      {
        type: TagsDetails
      }
    ],
    itemBrand: {
      type: BrandDetails
    },
    store:{
      type:StoreDetails
    },
    organization: {
      type: OrganizationDetails
    }
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);
export default Item;

