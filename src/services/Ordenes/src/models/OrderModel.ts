import mongoose from "mongoose";
import "./../models/OrganizationModel.ts";
import "./../models/ClientModel.ts";
import counterModel from "../../../../helpers/counterModel.js";

const OrderSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
    },
    num_of_payments: {
      type: Number,
    },
    documentName: {
      type: String,
    },
    name: {
      type: String,
    },
    date: {
      type: String,
    },
    requiredDate: {
      type: String,
    },
    deliveredDate: {
      type: String,
    },
    total: {
      type: Number,
      required: [true, "El campo total es requerido."],
    },
    totalPayed: {
      type: Number,
    },
    status: {
      type: Number,
      required: [true, "El campo status es requerido."],
    },
    invoiced: {
      type: Boolean,
      required: [true, "El campo invoiced es requerido."],
    },
    invoicedURL: {
      type: String,
    },
    invoicedDate: {
      type: String,
    },
    invoicedNumber: {
      type: String,
    },
    invoicedEnv: {
      type: String,
    },
    clientName: {
      type: String,
      required: [true, "El campo clientName es requerido."],
    },
    userName: {
      type: String,
      required: [true, "El campo userName es requerido."],
    },
    assistantId: {
      type: String,
    },
    assistantName: {
      type: String,
    },
    comments: {
      type: String,
    },
    discount: {
      type: Number,
    },
    charge: {
      type: Number,
    },
    payment: {
      type: Array,
    },
    details: {
      type: Array,
      required: true,
    },
    dataStatus: {
      type: Number,
      default: 1,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "El organizationId no debe estar vacio"],
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "orderId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;

// Crear el contador al inicio de la aplicación.
let counter = new counterModel({ _id: "orderId", seq: 0 });
counter.save().catch((error) => console.log(error));
