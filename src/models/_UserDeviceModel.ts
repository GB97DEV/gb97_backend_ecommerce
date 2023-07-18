import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EntrepriseUser",
  },
  deviceName: {
    type: String,
    required: true,
  },
  deviceId: {
    type: String,
    required: true,
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now,
  },
});

const UserDevice = mongoose.model("_Device", DeviceSchema);
export default UserDevice;