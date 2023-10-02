
import mongoose from "mongoose";
import "./../models/StoreModel.ts";
import "./../models/CategoryModel.ts";
import counterModel from "./../../../../helpers/counterModel.js";
const Decimal128 = mongoose.Schema.Types.Decimal128;

const ItemSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
      index: true,
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
    cost: {
      type: Decimal128,
      required: [true, "El campo 'cost' es requerido"],
    },
    price: {
      type: Decimal128,
      required: [true, "El campo 'price' es requerido"],
    },
    stock: {
      type: Number,
      required: [true, "El campo 'stock' es requerido"]
    },
    isVat: {
      type: Boolean,
      required: [true, "El campo 'isVat' es requerido"]
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
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
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_Store"
    }
  },
  {
    timestamps: true,
  }
);

ItemSchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "itemPOSId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;

// Crear el contador al inicio de la aplicación.
let counter = new counterModel({ _id: "itemPOSId", seq: 0 });
counter.save().catch((error) => console.log(error));
