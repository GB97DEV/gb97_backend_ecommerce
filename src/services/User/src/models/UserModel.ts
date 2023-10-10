import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import counterModel from "./../../../../helpers/counterModel.js";
import "./../models/StoreModel.ts";
import "./../models/OrganizationModel.ts";

const UserSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Por favor ingresa una contraseña."],
      minLength: [8, "Password debe tener minimo 8 caracteres."],
    },
    offlineCode:{
      type: String,
      required: [true, "El campo 'offlineCode' es requerido"],
    },
    offlineCodeExpire: {
      type: String,
      required: [true, "El campo 'offlineCodeExpire' es requerido"],
    },
    offlineCodeStatus:{
      type: Number,

    },
    user_active: {
      type: String,
      enum: ["activo", "inactivo"],
    },
    rol: {
      type: String,
      enum: ["admin", "store_supervisor", "client", "customer"],
    },
    num_document: {
      type: String,
      //required: [true, 'El campo "num_document" es requerido'],
    },
    name: {
      type: String,
      // required: [true, 'El campo "name" es requerido'],
    },
    email: {
      type: String,
      // required: [true, 'El campo "email" es requerido'],
    },
    telephoneNumber: {
      type: String,
      // required: [true, 'El campo "telephoneNumber" es requerido'],
    },
    imageUrl: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Number,
    },
    liveUpdate: {
      type: Boolean,
      required: [true, "El campo 'liveUpdate' es requerido"]
    },
    offlineUpdate: {
      type: Boolean,
      required: [true, "El campo 'offlineUpdate' es requerido"]
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization"
    },
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "_Store"
    }
  },
  {
    timestamps: true,
  }
);

  
UserSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const Login = mongoose.model("User", UserSchema);
export default Login;