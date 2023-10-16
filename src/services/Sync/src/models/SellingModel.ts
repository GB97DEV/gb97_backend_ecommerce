import mongoose from "mongoose";
import counterModel from "../../../../helpers/counterModel.js"
import "./ClientModel";
import "./StoreModel"
import "./OrganizationModel"

const ClientDetails = new mongoose.Schema({
  clietId: {
    type: Number,
    default: null
  },
  clientUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
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

const SellingSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    code: {
      type: Number
    },
    date: {
      type: String,
      default: new Date().toISOString(),
    },
    total:{
      type: Number,
      required: [true, "El campo 'total' es requerido"]
    },
    totalPayed: {
      type: Number,
      required: [true, "El campo 'totalPayed' es requerido"]
    },
    status:{
      type: Number,
    },
    invoiced: {
      type: Boolean,
      default: false
    },
    clientName: {
      type: String,
      required: [true, "El campo 'clientName' es requerido"]
    },
    userName: {
      type: String,
      required: [true, "El campo 'userName' es requerido"]
    },
    discount: {
      type: Number,
      required: [true, "El campo 'discount' es requerido"]
    },
    charge: {
      type: Number,
      required: [true, "El campo 'charge' es requerido"]
    },
    payment: {
      type: Object
    },
    numOfPayments: {
      type: Number,
      required: [true, "El campo 'numOfPayments' es requerido"]
    },
    dataStatus: {
      type: Boolean,
      default: false
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"]
    },
    items:{
      type: Object
    },
    client: {
      type: ClientDetails
    },
    store: {
      type: StoreDetails
    },
    organization: {
      type: OrganizationDetails
    }
  },
  {
    timestamps: true
  }
);

SellingSchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "sellingPosId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Selling = mongoose.model("Selling", SellingSchema);
export default Selling;

let counter = new counterModel({ _id: "sellingPosId", seq: 0 });
counter.save().catch((error) => console.log(error));