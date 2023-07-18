import mongoose from "mongoose";
import counterModel from "./../helpers/counterModel";
import "./../models/OrderModel.ts";

const ExternDeliverySchema = new mongoose.Schema({
  DeadLineDate: {
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
  picture_external_delivery: {
    type: String,
  },
  guideNumber: {
    type: Number,
  },
});

const ServiceDeliverySchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  plateNumber: {
    type: String,
  },
  picture_system_delivery: {
    type: String,
  },
});

const OtherDeliverySchema = new mongoose.Schema({
  picture_other_delivery: {
    type: String,
  },
});

const PickUpSchema = new mongoose.Schema({
  picture_person_delivery: {
    type: String,
  },
  clientSignature_PickUp: {
    type: String,
  },
  fullname_employee: {
    type: String,
  },
  num_document_employee: {
    type: String,
  },
});

const DeliverySchema = new mongoose.Schema(
  {
    code: {
      type: Number,
    },
    picture: {
      type: String,
    },
    clientSignature: {
      type: String,
    },
    arrivalConfirmation: {
      type: Boolean,
    },
    externDelivery: [
      {
        type: ExternDeliverySchema,
      },
    ],
    servicelivery: [
      {
        type: ServiceDeliverySchema,
      },
    ],
    otherDelivery: [
      {
        type: OtherDeliverySchema,
      },
    ],
    pickUp: [
      {
        type: PickUpSchema,
      },
    ],
    deliveryDate: {
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
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
);

DeliverySchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "deliveryId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Delivery = mongoose.model("Delivery", DeliverySchema);
export default Delivery;

let counter = new counterModel({ _id: "deliveryId", seq: 0 });
counter.save().catch((error) => console.log(error));
