import mongoose from "mongoose";

const UserConexionSchema = new mongoose.Schema({
  domain: {
    type: Number,
    trim: true,
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
    required: [true, "Por favor ingresa una latitud."],
  },
  longitude: {
    type: String,
    trim: true,
    required: [true, "Por favor ingresa una longitud."],
  },
  type: {
    type: String,
    trim: true,
    required: [true, "Por favor ingresa un tipo."],
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

UserConexionSchema.pre("save", async function (next) {});

const UserConexion = mongoose.model("_UserConexion", UserConexionSchema);
export default UserConexion;
