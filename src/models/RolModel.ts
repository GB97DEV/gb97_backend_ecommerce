import mongoose from "mongoose";

const RolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El campo 'name' es requerido"],
      unique: true, // Indica que el campo debe ser único
    },
    imageUrl: {
      type: String,
      default: null
    },
    module: [{
      type: String,
      required: [true, "El campo 'module' es requerido"]
    }],
  },
  {
    timestamps: true,
  }
);

RolSchema.pre('save', function(next) {
  this.name = this.name.toUpperCase();
  next();
});

const Rol = mongoose.model("Rol", RolSchema);
export default Rol;