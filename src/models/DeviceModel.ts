import mongoose from "mongoose";
import "./UserModel";

const DeviceSchema = new mongoose.Schema(
  {
    imei: {
      type: String,
      default: null,
    },
    model: {
      type: String,
      default: null
    },
    osVersion: {
      type: String,
      default: null
    },
    token: {
      type: String,
      default: null
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El campo 'user' es requerido"]
    }
  },
  {
    timestamps: true
  }
);

const Device = mongoose.model("Device", DeviceSchema);
export default Device;