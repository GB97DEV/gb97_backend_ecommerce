import * as mongoose from "mongoose";
import "./../models/OrganizationModel.ts";
import "./../models/GroupModel.ts";
import "./../models/ItemModel.ts";
// import "./../models/CollectionModel.ts";
import counterModel from "./../helpers/counterModel"; // Importa el modelo

const ItemSchema = new mongoose.Schema(
  {
    code: Number,
    itemCode: {
      type: String,
    },
    itemName: {
      type: String,
      required: [true, 'El campo "itemName" es requerido'],
    },
    itemDescription: {
      type: String,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      // validate: {
      //   validator: (v: any) => typeof v === "number",
      //   message: 'El campo "itemGroup" debe ser un número',
      // },
      required: [true, 'El campo "itemGroup" es requerido'],
    },
    // itemCollection: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Collection",
    // },
    itemBasePrice: {
      type: Number,
      required: [true, 'El campo "itemBasePrice" es requerido'],
    },
    pricesList: {
      type: Array,
    },
    itemCreationDate: {
      type: String,
      default: new Date().toISOString(),
    },
    isVat: {
      type: Boolean,
    },
    isProduction: {
      type: Boolean,
    },
    itemUpdateDate: {
      type: String,
      default: function () {
        //@ts-ignore
        return this.itemCreationDate;
      },
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    itemStatus: {
      type: Number,
      default: 1,
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
      "itemId",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.code = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

const Item = mongoose.model("Item", ItemSchema);
export default Item;

// Crear el contador al inicio de la aplicación.
let counter = new counterModel({ _id: "itemId", seq: 0 });
counter.save().catch((error) => console.log(error));
