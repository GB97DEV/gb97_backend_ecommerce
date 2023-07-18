import mongoose from "mongoose";

let counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counterModel = mongoose.model("counter", counterSchema);

export default counterModel;
