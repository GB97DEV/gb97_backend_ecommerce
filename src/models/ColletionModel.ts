import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const CollectionSchema = new mongoose.Schema(
  {
    //_id: Number,
    collectionId: {
      type: String,
      unique: true,
      required: [true, "El campo collectionId es requerido"],
    },
    collectionName: {
      type: String,
      required: [true, "El campo collectionName es requerido"],
    },
    collectionCreationDate: {
      type: String,
      default: new Date().toISOString(),
    },
    collectionUpdateDate: {
      type: String,
      default: function () {
        return this.collectionCreationDate;
      },
    },
    collectionStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

CollectionSchema.plugin(AutoIncrement, { inc_field: "_id" });

const Collection = mongoose.model("Collection", CollectionSchema);
export default Collection;
