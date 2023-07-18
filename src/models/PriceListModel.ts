import * as mongoose from "mongoose";
import "./../models/ItemModel.ts";
import "./../models/ClientModel.ts";

const PriceSchema = new mongoose.Schema(
  {
    // itemCode: {
    //   type: String,
    // },
    // itemName: {
    //   type: String,
    //   required: [true, 'El campo "itemName" es requerido'],
    // },
    // itemDescription: {
    //   type: String,
    // },
    // itemCollection: {
    //   type: Number,
    //   ref: "Collection",
    // },
    itemBasePrice: {
      type: Number,
      // required: [true, 'El campo "itemBasePrice" es requerido'],
    },
    price: {
      type: Number,
      required: [true, 'El campo "price" es requerido'],
    },
    pricesList: {
      type: Number,
    },
    // itemCreationDate: {
    //   type: String,
    //   default: new Date().toISOString(),
    // },
    // isVat: {
    //   type: Boolean,
    // },
    // isProduction: {
    //   type: Boolean,
    // },
    // itemUpdateDate: {
    //   type: String,
    // },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    // itemStatus: {
    //   type: Number,
    //   default: 1,
    // },
  },
  {
    timestamps: true,
  }
);

const PriceList = mongoose.model("PriceList", PriceSchema);
export default PriceList;
