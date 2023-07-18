import mongoose from "mongoose";

const UserFailedLoginSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: [true, "Por favor ingresa un nivel."],
    },
    date_conexion: {
      type: Date,
    },
    ip: {
      type: String,
      required: [true, "Por favor ingresa una ip."],
    },
    navegator: {
      type: String,
      required: [true, "Por favor ingresa un navegador."],
    },
    latitude: {
      type: String,
      trim: true,
      //required: [true, "Por favor ingresa una latitud."],
    },
    longitude: {
      type: String,
      trim: true,
      //required: [true, "Por favor ingresa una longitud."],
    },
    //user: { type: mongoose.Types.ObjectId, ref: "EntrepriseUser" },
  },
  {
    timestamps: true,
  }
);

const UserFailedLogin = mongoose.model(
  "_UserFailedLogin",
  UserFailedLoginSchema
);
export default UserFailedLogin;
