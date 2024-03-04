import mongoose from "mongoose";
import "./other/ClientModel";
import "./other/UserModel";
import "./other/AddressModel";
import "./other/ItemModel";

const ProductDetails = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    default: null
  },
  quantity: {
    type: Number,
    default: null
  },
  price: {
    type: Number,
    default: null
  },
  isVat: {
    type: Boolean,
    default: null
  },
  coments: {
    type: String,
    default: null
  }
},{
  _id: false
});

const OrderSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    },
    delivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address"
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    status: {
      type: Number
    },
    timestamp: {
      type: Number
    },
    products: [
      {
        type: ProductDetails
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order