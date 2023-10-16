import mongoose from "mongoose";
import "./OrganizationModel";
import "./BrandModel";
import "./CategoryModel";
import "./SubCategoryModel";
import "./TagModel";
import "./StoreModel";

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

const TagDetails = new mongoose.Schema({
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

const SupplierSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
    },
    logoUrl: {
      type: String,
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'name' es requerido"],
    },
    brands: [
      {
        type: BrandDetails
      }
    ],
    categories: [
      {
        type: CategoryDetails
      }
    ],
    subcategories: [
      {
        type: SubCategoryDetails
      }
    ],
    tags: [
      {
        type: TagDetails
      }
    ],
    affiliatedStores: [
      {
        type: StoreDetails
      }
    ],
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true,
  }
);


const Supplier = mongoose.model("Supplier", SupplierSchema);
export default Supplier;

