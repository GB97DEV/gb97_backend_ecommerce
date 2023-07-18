import * as mongoose from "mongoose";
import "./../models/OrganizationModel.ts";
import "./../models/GroupModel.ts";
// import "./../models/CollectionModel.ts";
import counterModel from "./../helpers/counterModel"; // Importa el modelo

const ItemSchema = new mongoose.Schema(
  {
    code: Number,
    name: {
      type: String,
      required: [true, "el campo name es requerido"],
    },
    description: {
      type: String,
    },
    unit: {
      type: String,
      // enum:['pulgadas','onzas','metros']
    },
    dimensions: {
      type: String,
    },
    color: {
      type: String,
    },
    UnitPrice: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    stock: {
      type: Number,
    },
    Suppliers: {
      type: Number,
    },
    provider: {
      type: Number,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  {
    timestamps: true,
  }
);

ItemSchema.pre("save", async function (next) {
  let doc = this;
  try {
    let counter = await counterModel.findByIdAndUpdate(
      "supplyId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Item = mongoose.model("Supply", ItemSchema);
export default Item;

// Crear el contador al inicio de la aplicación.
let counter = new counterModel({ _id: "supplyId", seq: 0 });
counter.save().catch((error) => console.log(error));
