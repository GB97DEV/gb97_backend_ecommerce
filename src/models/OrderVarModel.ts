import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";
import validator from "validator";

const AutoIncrement = AutoIncrementFactory(mongoose);

const OrderVarSchema = new mongoose.Schema(
  {
    //_id: Number,
    clientId: {
      type: String,
      required: true,
      unique: true,
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
    complements: {
      type: Object,
    },
    orderId: {
      type: Number,
      ref: "Order",
      required: true,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    orderComment: {
      type: String,
      required: true,
    },
    orderDataStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

OrderVarSchema.plugin(AutoIncrement, { inc_field: "_id" });

const OrderVar = mongoose.model("OrderVar", OrderVarSchema);
export default OrderVar;
