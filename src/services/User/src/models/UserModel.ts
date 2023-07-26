import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Por favor ingresa una contraseña."],
      minLength: [8, "Password debe tener minimo 8 caractere."],
    },
    user_active: {
      type: String,
      enum: ["activo", "inactivo"],
      maxlength: 50,
    },
    rol: {
      type: String,
      enum: [
        "client",
        "customer"
      ],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Number,
    },
    num_document: {
      type: String,
      //required: [true, 'El campo "num_document" es requerido'],
    },
    name: {
      type: String,
      // required: [true, 'El campo "name" es requerido'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      // required: [true, 'El campo "email" es requerido'],
    },
    telephoneNumber: {
      type: String,
      // required: [true, 'El campo "telephoneNumber" es requerido'],
    },
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
