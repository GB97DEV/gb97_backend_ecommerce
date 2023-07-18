import mongoose from "mongoose";

const UserResetPasswordSchema = new mongoose.Schema(
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
    type: {
      type: String,
      trim: true,
    },
    //user: { type: mongoose.Types.ObjectId, ref: "EntrepriseUser" },
  },
  {
    timestamps: true,
  }
);

const UserResetPassword = mongoose.model(
  "_UserResetPassword",
  UserResetPasswordSchema
);
export default UserResetPassword;
