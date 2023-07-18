import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import validator from "validator";

const AutoIncrement = AutoIncrementFactory(mongoose);

const QuotationVarSchema = new mongoose.Schema(
  {
    _id: Number,
    clientId: {
      type: String,
      required: true,
    },
    variantId: {
      type: Number,
      required: true,
    },
    variantQuantity: {
      type: Number,
      required: true,
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
    quotationId: {
      type: Number,
      ref: "Quotation",
      required: true,
    },
    quotationPrice: {
      type: Number,
      required: true,
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

QuotationVarSchema.plugin(AutoIncrement, { inc_field: "_id" });

const QuotationVar = mongoose.model("QuotationVar", QuotationVarSchema);
export default QuotationVar;
