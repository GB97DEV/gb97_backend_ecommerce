import mongoose from "mongoose";
import "./../models/OrganizationModel.ts";
import "./../models/PersonModel.ts";

const ClientSchema = new mongoose.Schema(
  {
    clientId: {
      type: String,
    },
    // personId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Person",
    // },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    clientStatus: {
      type: Number,
      default: 1,
    },
    // client_organization_validation: {
    //   type: String,
    //   unique: true,
    // },
    num_document: {
      type: String,
      required: [true, 'El campo "num_document" es requerido'],
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
    type: {
      type: Number,
      required: [true, 'El campo "type" es requerido'],
      validate: {
        validator: (v: any) => typeof v === "number",
        message: 'El campo "type" debe ser un número',
      },
    },
  },
  {
    timestamps: true,
  }
);

// ClientSchema.pre("save", async function (next) {
//   this.client_organization_validation = `${this.num_document}@${this.organizationId}`;
//   const existingUser = await mongoose.model("Client").findOne({
//     client_organization_validation: this.client_organization_validation,
//   });
//   if (existingUser && existingUser._id.toString() !== this._id.toString()) {
//     const error = new mongoose.Error.ValidationError();
//     error.addError(
//       "client_organization_validation",
//       new mongoose.Error.ValidatorError({
//         message: "client_organization_validation debe ser unico.",
//       })
//     );
//     return next(error);
//   }
// });

const Client = mongoose.model("Client", ClientSchema);
export default Client;
