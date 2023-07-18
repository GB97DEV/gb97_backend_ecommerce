import * as mongoose from 'mongoose';
import "./../models/OrganizationModel.ts";


const PackagingSuppliesSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'El campo "name" es requerido'],
      },
      description: {
         type: String,
      },
      unitPrice: {
         type: Number,
         required: [true, 'El campo "unitPrice" es requerido'],
      },
      quantity:{
         type: Number,
         required: [true, 'El campo "quantity" es requerido'],
      },
      stock: {
         type: Number,
         required: [true, 'El campo "stock" es requerido'],
      },
      stockMin: {
         type: Number,
         required: [true, 'El campo "stockMin" es requerido'],
      },
      provider: {
         type: String,
         required: [true, 'El campo "provider" es requerido']
      },
      organization: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Organization",
         required: true
      },
      packagingSuppliesStatus: {
         type: Number,
         default: 1,
      }
   },
   {
      timestamps: true,
   }
);

const PackagingSupplies = mongoose.model('PackagingSupplies', PackagingSuppliesSchema);
export default PackagingSupplies;