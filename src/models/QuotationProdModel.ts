import mongoose from "mongoose";
import validator from "validator";

const QuotationProdSchema = new mongoose.Schema(
  {
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
    quotationDataStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const QuotationProd = mongoose.model("QuotationProd", QuotationProdSchema);
export default QuotationProd;
