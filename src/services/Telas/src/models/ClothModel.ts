import * as mongoose from "mongoose";
import "./OrganizationModel.ts";

const ClothSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      rquired: [true, 'El campo "code" es requerido']
    },
    name: {
      type: String,
      required: [true, 'El campo "name" es requerido'],
    },
    description: {
      type: String,
    },
    measurement: {
      type: String,
      required: [true, 'El campor "measurement" es requerido']
    },
    composition: {
      type: String,
      required: [true, 'El campo "composition" es requerido'],
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      required: [true, 'El campo "color" es requerido'],
    },
    priceMeter: {
      type: Number,
      default: 0,
    },
    priceKilo: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, 'El campo "stock" es requerido'],
    },
    stockMin: {
      type: Number,
      required: [true, 'El campo "stockMin" es requerido'],
    },
    provider: {
      type: String,
      required: [true, 'El campo "provider" es requerido'],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    clothStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Cloth = mongoose.model("Cloth", ClothSchema);
export default Cloth;
