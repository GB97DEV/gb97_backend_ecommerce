import mongoose from "mongoose";
import "./UserModel";

const AddressSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "El campo 'address' es requerido"]
    },
    neighborhood: {
      type: String,
      required: [true, "El campo 'neighborhood' es requerido"]
    },
    lat: {
      type: Number,
      required: [true, "El campo 'lat' es requerido"]
    },
    lng: {
      type: Number,
      required: [true, "El campo 'lng' es requerido"]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true
  }
);

const Address = mongoose.model("Address", AddressSchema);
export default Address;