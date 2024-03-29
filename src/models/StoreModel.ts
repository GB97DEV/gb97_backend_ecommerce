import mongoose from "mongoose";
import counterModel from "../helpers/counterModel.js"
import "./OrganizationModel";
import "./SupplierModel";

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

const SupplierBranchDetails = new mongoose.Schema({
  supplierOfficeId: {
    type: Number,
    default: null,
  },
  supplierOfficeUuid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    default: null,
  }
},{
  _id: false // Configura _id como false para el esquema OrganizationDetails
})


const StoreSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    code: {
      type: Number,
    },
    storeName: {
      type: String,
      maxlength: 50,
      required: [true, "El campo 'store_name' es requerido."],
    },
    ownerName: {
      type: String,
      maxlength: 50,
      required: [true, "El campo 'owner_namer' es requerido."],
    },
    ownerNumDocument:{
      type: String,
      required: [true, "El campo 'owner_num_document' es requerido"]
    },
    ownerEmail: {
      type: String
    },
    address: { 
      type: String, 
      maxlength: 255,
      required: [true, "El campo 'addresss' es requerido."],
    },
    lat: {
      type: Number
    },
    lng: {
      type: Number
    },
    email: { 
      type: String, 
      maxlength: 100,
      required: [true, "El campo 'email' es requerido."],
    },
    storeLogo: {
      type: String
    },
    phone: {
      type: String,
      maxlength: 15,
    },
    status: { 
      type: String, 
      enum: ['0', '1'], 
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"]
    },
    suppliers: [
      {
        type: SupplierBranchDetails
      }
    ],
    organization: {
      type: OrganizationDetails,
    }
  },
  {
    timestamps: true,
  }
);
StoreSchema.pre("save", async function (next) {
  let doc = this;
  try {
    const orgUuid = doc.organization?.organizationUuid;
    let counterName = `${orgUuid}StorePosId`
    let counterCreate = new counterModel({ _id: counterName, seq: 0 });
    counterCreate.save().catch((error) => console.log(error));
    let counter = await counterModel.findByIdAndUpdate(
      counterName,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Store = mongoose.model("_Store", StoreSchema);
export default Store;

