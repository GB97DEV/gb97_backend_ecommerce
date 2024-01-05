import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import "./StoreModel";
import "./OrganizationModel";

const OrganizationDetails = new mongoose.Schema({
  organizationId: {
    type: Number,
    default: null
  },
  organizationUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    default: null,
  }
}, {
  _id: false // Configura _id como false para el esquema OrganizationDetails
});

const StoreDetails = new mongoose.Schema({
  storeId:{
    type: Number,
    default: null
  },
  storeUuid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_Store",
    default: null
  }
},{
  _id: false
});

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
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
      required: [true, "El campo 'offlineCodeStatus' es requerido"],
    },
    userActive: {
      type: String,
      enum: ["activo", "inactivo"],
    },
    rol: {
      type: String,
      enum: ["admin", "store_supervisor", "seller", "customer"],
    },
    gender: {
      type: String,
      required: [true, "El campo 'gender' es requerido"],
    },
    numDocument: {
      type: String,
      unique: true,
      required: [true, 'El campo "numDocument" es requerido'],
    },
    name: {
      type: String,
      required: [true, 'El campo "name" es requerido'],
    },
    email: {
      type: String,
    },
    telephoneNumber: {
      type: String,
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
    lastTimeSync:{
      type: String
    },
    syncStatus: {
      type: Number,
      required: [true, "El campo 'syncStatus' es requerido"]
    },
    facebookLogin: {
      type: Boolean,
      required: [true, "El campo 'facebookLogin' es requerido"]
    },
    googleLogin: {
      type: Boolean,
      required: [true, "El campo 'googleLogin' es requerido"]
    },
    appleLogin: {
      type: Boolean,
      required: [true, "El campo 'appleLogin' es requerido"]
    },
    organization: {
      type: OrganizationDetails
    },
    store: {
      type: StoreDetails,
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