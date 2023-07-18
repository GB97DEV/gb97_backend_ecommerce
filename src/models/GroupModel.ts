import * as mongoose from "mongoose";

// let counterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 },
// });
// let counterModel = mongoose.model("counter", counterSchema);

const GroupSchema = new mongoose.Schema(
  {
    // _id: Number,
    groupCode: {
      type: String,
    },
    groupName: {
      type: String,
      required: [true, "El campo groupName es requerido"],
    },
    groupDescription: {
      type: String,
    },
    complements: {
      type: Object,
    },
    groupStatus: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// GroupSchema.pre("save", async function (next) {
//   let doc = this;
//   try {
//     let counter = await counterModel.findByIdAndUpdate(
//       "groupId",
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true }
//     );
//     doc._id = counter.seq;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const Group = mongoose.model("Group", GroupSchema);
export default Group;

// Crear el contador al inicio de la aplicación.
// let counter = new counterModel({ _id: "groupId", seq: 0 });
// counter.save().catch((error) => console.log(error));
