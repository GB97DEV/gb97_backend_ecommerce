import mongoose from "mongoose";
import "./../models/OrganizationModel";

const PositionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"]
    },
    description: {
      type: String,
      required: [true, "El campo 'description' es requerido"]
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "El campo 'organization' no debe estar vacio"],
    }
  },
  {
    timestamps: true,
  }
);

const Position = mongoose.model("Position", PositionSchema);
export default Position;