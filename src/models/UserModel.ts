import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import "./../models/OrganizationModel.ts";
import "./../models/PersonModel.ts";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Por favor ingresa una contraseña."],
      minLength: [8, "Password debe tener minimo 8 caractere."],
    },
    personId: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    userActive: {
      type: String,
      enum: ["activo", "inactivo"],
      maxlength: 50,
    },
    logic: {
      type: String,
      enum: ["a", "i"],
    },
    // app: {
    //   type: String,
    //   enum: ["pedidos", "producción"],
    //   required: [true, "Por favor ingresa un rol."],
    // },
    rol: {
      type: String,
      enum: [
        "supervisor",
        "operario",
        "contador",
        "control de calidad",
        "vendedor",
        "cliente",
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
      // required: [true, 'El campo "num_document" es requerido'],
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
