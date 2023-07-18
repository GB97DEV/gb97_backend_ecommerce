import * as mongoose from "mongoose";
import "./../models/OrganizationModel.ts";
import "./../models/ClientModel.ts";
import counterModel from "./../helpers/counterModel"; // Importa el modelo

const QuotationSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
    },
    quotationName: {
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
    deliveryTime: {
      type: String,
      default: new Date().toISOString(),
    },
    validDate: {
      type: String,
      default: new Date().toISOString(),
    },
    total: {
      type: Number,
      required: [true, "El campo total es requerido."],
      validate: {
        validator: function (value: any) {
          return typeof value === "number";
        },
        message: "El campo total debe ser de tipo Number.",
      },
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
    clientAddress: {
      type: String,
      required: [true, "El campo clientAddres es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo clientAddres debe ser de tipo String.",
      },
    },
    clientEmail: {
      type: String,
      required: [true, "El campo clientEmail es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo clientEmail debe ser de tipo String.",
      },
    },
    clientPhone: {
      type: String,
      required: [true, "El campo clientPhone es requerido"],
      validate: {
        validator: function (value: any) {
          return typeof value === "string";
        },
        message: "El campo clientPhone debe ser de tipo String.",
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
    isOrder: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: Number,
      default: 0,
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
    paymentMethod: {
      type: String,
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
    quotationDataStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

QuotationSchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "quotationId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Quotation = mongoose.model("Quotation", QuotationSchema);
export default Quotation;

// Crear el contador al inicio de la aplicación.
let counter = new counterModel({ _id: "quotationId", seq: 0 });
counter.save().catch((error) => console.log(error));
