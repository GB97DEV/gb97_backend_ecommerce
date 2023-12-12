import mongoose from "mongoose";
import counterModel from "../../../../helpers/counterModel.js"
import "./Others/ClientModel.js";
import "./Others/StoreModel.js";
import "./Others/OrganizationModel.js";
import "./Others/UserModel.js";
import "./Others/InventoryModel.js"

const SellingItem = new mongoose.Schema({
  itemId: {
    type: Number,
    default: null
  },
  itemUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    default: null
  },
  itemCode: {
    type: String,
  },
  barcode: {
    type: String,
  },
  itemName: {
    type: String,
  },
  itemIsVat: {
    type: Boolean,
  },
  itemDescription: {
    type: String,
  },
  itemBasePrice: {
    type: Number,
  },
  itemDiscount: {
    type: Number,
  },
  itemQuantity: {
    type: Number,
  },
  itemTotal: {
    type: Number,
  },
  itemComment: {
    type: String,
  },
  itemHasInventoryTrack: {
    type: Boolean,
  },
  inventoryId: {
    type: Number,
    defautl: null,
  },
  inventoryUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    default: null
  },
},{
  _id: false,
})

const ClientDetails = new mongoose.Schema({
  clientId: {
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

const SellerDetails = new mongoose.Schema({
  sellerId: {
    type: Number,
    default: null,
  },
  sellerUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }
} ,{
  _id: false,
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
    invoiceNumber: {
      type: String,
    },
    invoiceUrl: {
      type: String,
    },
    invoiceDate: {
      type: String,
    },
    invoiceEnv: {
      type: String,
    },
    clientName: {
      type: String,
      required: [true, "El campo 'clientName' es requerido"]
    },
    clientAddress: {
      type: String,
      required: [true, "El campo 'clientAddress' es requerido"]
    },
    sellerName: {
      type: String,
      required: [true, "El campo 'sellerName' es requerido"]
    },
    discount: {
      type: Number,
      required: [true, "El campo 'discount' es requerido"]
    },
    charge: {
      type: Number,
      required: [true, "El campo 'charge' es requerido"]
    },
    payments: {
      type: Object
    },
    numOfPayments: {
      type: Number,
      required: [true, "El campo 'numOfPayments' es requerido"]
    },
    dataStatus: {
      type: Number,
      default: 0
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"]
    },
    client: {
      type: ClientDetails,
    },
    seller: {
      type: SellerDetails,
    },
    store: {
      type: StoreDetails
    },
    items:[
      {
        type: SellingItem
      }
    ],
    organization: {
      type: OrganizationDetails
    },
  },
  {
    timestamps: true
  }
);

SellingSchema.pre("save", async function (next) {
  let doc = this;
  try {
    const storeUuid = doc.store?.storeUuid;
    let counterName = `${storeUuid}SellingPosId`
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

const Selling = mongoose.model("Selling", SellingSchema);
export default Selling;