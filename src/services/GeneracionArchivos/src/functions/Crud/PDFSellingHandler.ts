import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';

import Selling from "../../models/SellingModel";

import connectDatabase from "../../../../../database/mongodb";
import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders.js";

import { authMiddleware } from "../../../../../middleware/authentication";

import { CenterText } from "../../utils/CenterText";
import { OrganizationInformation } from '../../utils/OrganizationInformation';
import { ClientInformation } from '../../utils/ClientInformation';
import { SellingNumber } from '../../utils/SellingNumber';
import { SellingInformation } from '../../utils/SellingInformation';

//Valores globales del
const widthPage = 590;
const heightPage = 850;
const margin = 20;

export const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { _id } = event.pathParameters;
  
  let y = heightPage;
  let index = 0;
  let text = "";

  let organizationAlias: string = '';
  let organizationId: string = '';
  let organizationName: string = '';
  let organizationAddress: string = '';

  await connectDatabase();

  const sellingData: any = await Selling.findById(_id).populate([
    "organization.organizationUuid",
    "client.clientUuid",
    "store.storeUuid",
  ]).lean();

  if(!sellingData){
    return {
      statusCode: 400,
      headers: responseHeaders,
      body: JSON.stringify({
        response: false,
        message: 'No se pudo obtener la informacion de la venta',
        data: null,
      }),
    };
  }
  //Crear el número de venta
  const sellerNumber = SellingNumber(sellingData.store.storeUuid, sellingData.code)
  //Crear la instancia de pdf-lib
  const doc = await PDFDocument.create();
  //Fuentes de texto
  const helvetica = await doc.embedFont(StandardFonts.Helvetica); 
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await doc.embedFont(StandardFonts.HelveticaOblique);
  //Creacion de la página del pdf, con los valores de width y height definidos
  let page = doc.addPage([widthPage , heightPage ]);
  //Margen superior de la página
  y -= margin;
  
  try {
    [organizationAlias, organizationId, y ] = await OrganizationInformation(doc, page, helvetica, helveticaBold, sellingData.organization.organizationUuid, y, widthPage, margin);
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

  y -= margin;
  try{
    // const clientData = {
    //   clientName: sellingData.clientName,
    //   clientAddress: sellingData.clientAddress,
    //   data: sellingData.client.clientUuid,
    // }
    y = await ClientInformation(page, helvetica, helveticaBold, sellingData.client.clientUuid, sellerNumber, margin, widthPage, y)
  } catch(err){
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

  try{
    [y, page, []] = await SellingInformation(doc, page, helvetica, helveticaBold, helveticaOblique, sellingData.items, widthPage, heightPage, margin, index, y);
  } catch(err){
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

  // const filename = fileName(organizationAlias.replace(/ /g,"-"), orderData.code)
  const pdfBytes = await doc.save();
  const buffer = Buffer.from(pdfBytes);
   return {
    statusCode: 200,
    headers:{
      "Content-Type": "application/pdf",
    },
    body: buffer.toString('base64'),
    isBase64Encoded:true,
  }
};
