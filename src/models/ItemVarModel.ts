import mongoose from "mongoose";
import counterModel from "./../helpers/counterModel"; // Importa el modelo

const ItemaVarSchema = new mongoose.Schema(
  {
    _id: Number,
    itemCode: {
      type: Number,
      ref: "Items",
      required: true,
    },
    variantId: {
      type: String,
      required: true,
    },
    variantBarcode: {
      type: Number,
      unique: true,
    },
    variantDescription: {
      type: String,
      required: true,
    },
    variantCost: {
      type: Number,
      required: true,
    },
    variantPrice: {
      type: Number,
      required: true,
    },
    variantStock: {
      type: Number,
      required: true,
    },
    variantSize: {
      type: String,
      required: true,
    },
    variantColor: {
      type: String,
      required: true,
    },
    variantModel: {
      type: String,
      required: true,
    },
    collectionId: {
      type: Number,
      ref: "Collection",
      required: true,
    },
    variantMeasurements: {
      type: Object,
      required: true,
    },
    variantCreationDate: {
      type: String,
      default: new Date().toISOString(),
    },
    variantUpdateDate: {
      type: String,
      default: function () {
        //@ts-ignore
        return this.variantCreationDate;
      },
    },
    variantStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

ItemaVarSchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "itemvarId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc._id = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Organization = mongoose.model("ItemVar", ItemaVarSchema);
export default Organization;

// Crear el contador al inicio de la aplicación.
let counter = new counterModel({ _id: "itemvarId", seq: 0 });
counter.save().catch((error) => console.log(error));
