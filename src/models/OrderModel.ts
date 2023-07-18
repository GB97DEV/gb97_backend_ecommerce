import mongoose from "mongoose";
import "./../models/OrganizationModel.ts";
import "./../models/ClientModel.ts";
import counterModel from "./../helpers/counterModel"; // Importa el modelo

const OrderSchema = new mongoose.Schema(
  {
    code: Number,
    documentName: {
      type: String,
    },
    name: {
      type: String,
    },
    date: {
      type: String,
      default: new Date().toISOString(),
      required: [true, "El campo date es requerido."],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo date debe ser de tipo String.",
      },
    },
    requiredDate: {
      type: String,
      default: new Date().toISOString(),
      required: [true, "El campo requiredDate es requerido."],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo requiredDate debe ser de tipo String.",
      },
    },
    deliveredDate: {
      type: String,
    },
    total: {
      type: Number,
      required: [true, "El campo total es requerido."],
      min: -Number.MAX_VALUE,
      max: Number.MAX_VALUE,
      validate: {
        validator: function (value: any) {
          return typeof value === "number";
        },
        message: "El campo total debe ser de tipo Number.",
      },
    },
    totalPayed: {
      type: Number,
      min: -Number.MAX_VALUE,
      max: Number.MAX_VALUE,
    },
    status: {
      type: Number,
      required: [true, "El campo status es requerido."],
      default: 1,
      validate: {
        validator: function (value: any) {
          return value >= 1 && value <= 4;
        },
        message: "El valor del campo status debe estar entre 1 y 4.",
      },
    },
    invoiced: {
      type: Boolean,
      required: [true, "El campo invoiced es requerido."],
    },
    invoicedURL: {
      type: String,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      // validate: {
      //   validator: function (value: any) {
      //     return typeof value === "string";
      //   },
      //   message: "El campo clientId debe ser de tipo String.",
      // },
    },
    clientName: {
      type: String,
      required: [true, "El campo clientName es requerido."],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo clientName debe ser de tipo String.",
      },
    },
    userName: {
      type: String,
      required: [true, "El campo userName es requerido."],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo userName debe ser de tipo String.",
      },
    },
    assistantId: {
      type: String,
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo assistantId debe ser de tipo String.",
      },
    },
    assistantName: {
      type: String,
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo assistantName debe ser de tipo String.",
      },
    },
    comments: {
      type: String,
    },
    discount: {
      type: Number,
    },
    charge: {
      type: Number,
      min: -Number.MAX_VALUE,
      max: Number.MAX_VALUE,
    },
    payment: {
      type: Array,
    },
    details: {
      type: Array,
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "El organizationId no debe estar vacio"],
    },
    dataStatus: {
      type: Number,
      default: 1,
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
