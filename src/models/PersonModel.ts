import * as mongoose from "mongoose";
// import "./../models/OrganizationModel.ts";

const PersonSchema = new mongoose.Schema(
  {
    personId: {
      type: String,
      unique: true,
      index: true,
      required: [true, 'El campo "personId" es requerido'],
    },
    type: {
      type: Number,
      required: [true, 'El campo "type" es requerido'],
      validate: {
        validator: (v: any) => typeof v === "number",
        message: 'El campo "type" debe ser un número',
      },
    },
    name: {
      type: String,
      required: [true, 'El campo "name" es requerido'],
    },
    lastName: {
      type: String,
    },
    businessName: {
      type: String,
      // unique: true,
    },
    email: {
      type: String,
      required: [true, 'El campo "email" es requerido'],
    },
    telephoneNumber: {
      type: String,
      required: [true, 'El campo "telephoneNumber" es requerido'],
    },
    address: {
      type: String,
      required: [true, 'El campo "address" es requerido'],
    },
    personStatus: {
      type: Number,
      default: 1,
    },
    // organizationId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Organization",
    // },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("Person", PersonSchema);
export default Person;
