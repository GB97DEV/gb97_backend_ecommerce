import mongoose from "mongoose";
import counterModel from "./../helpers/counterModel"; // Importa el modelo
import validator from "validator";

const OrderProdSchema = new mongoose.Schema(
  {
    _id: Number,
    itemCode: {
      type: Number,
      required: [true, "El campo itemCode es requerido"],
      validate: {
        validator: function (value: any) {
          return (
            validator.isNumeric(value.toString()) &&
            Number.isInteger(parseFloat(value))
          );
        },
        message: "El campo itemCode debe ser un valor numérico entero",
      },
    },
    itemName: {
      type: String,
      required: [true, "El campo itemName es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo itemName debe ser una cadena de caracteres",
      },
    },
    itemBasePrice: {
      type: Number,
      required: [true, "El campo itemBasePrice es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "number";
        },
        message: "El campo itemBasePrice debe ser un valor numérico",
      },
    },
    itemTotal: {
      type: Number,
      required: [true, "El campo itemTotal es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "number";
        },
        message: "El campo itemTotal debe ser un valor numérico",
      },
    },
    itemQuantity: {
      type: Number,
      required: [true, "El campo itemQuantity es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "number";
        },
        message: "El campo itemQuantity debe ser un valor numérico",
      },
    },
    itemColor: {
      type: String,
    },
    itemSize: {
      type: String,
    },
    itemModel: {
      type: String,
    },
    hasSpecialPrice: {
      type: Boolean,
    },
    itemSpecialPrice: {
      type: Number,
    },
    itemDiscount: {
      type: Number,
    },
    complements: {
      type: Object,
    },
    organizationId: {
      type: Number,
      required: [true, "El campo organizationId es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "number";
        },
        message: "El campo organizationId debe ser un valor numérico",
      },
    },
    orderDataStatus: {
      type: Number,
      default: 1,
    },
    iva: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

OrderProdSchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "orderprodId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc._id = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const OrderProd = mongoose.model("OrderProd", OrderProdSchema);
export default OrderProd;

// Crear el contador al inicio de la aplicación.
let counter = new counterModel({ _id: "orderprodId", seq: 0 });
counter.save().catch((error) => console.log(error));
