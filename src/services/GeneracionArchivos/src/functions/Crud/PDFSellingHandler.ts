import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';
import { S3, config } from "aws-sdk";

import Selling from "../../models/SellingModel";

import customMessage from "../../../../../helpers/customMessage";
import responseHeaders from "../../../../../helpers/responseHeaders.js";
import connectDatabase from "../../../../../database/mongodb";

import { authMiddleware } from "../../../../../middleware/authentication";

import { CenterText } from "../../utils/CenterText";
import { StoreInformation } from '../../u../../utils/StoreInformation';
import { ClientInformation } from '../../utils/ClientInformation';
import { SellingNumber } from '../../utils/SellingNumber';
import { SellingInformation } from '../../utils/SellingInformation';
import { TotalInformation } from '../../utils/TotalInformation';
import { FooterInformation } from '../../utils/FooterInformation';
import { GenerateQRCode } from '../../utils/GenerateQRCode';
import { DrawQRCode } from '../../utils/DrawQRCode';

//Valores globales del
const widthPage = 590;
const heightPage = 850;
const margin = 20;

export const main = authMiddleware(async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { _id } = event.pathParameters;
  
  let y = heightPage;
  let index = 0;
  let text = "";

  let organizationId: string = '';

  let subTotal12: number = 0;
  let totalIVA: number = 0;

  try{
    await connectDatabase();
  } catch(err){
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

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
    [ y ] = await StoreInformation(doc, page, helvetica, helveticaBold, sellingData.store.storeUuid, y, widthPage, margin);
    organizationId = sellingData.organization.organizationUuid.organizationId;
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

  y -= margin;

  try{
    [y, page, index, subTotal12, totalIVA ] = await SellingInformation(doc, page, helvetica, helveticaBold, helveticaOblique, sellingData.items, widthPage, heightPage, margin, index, y);
  } catch(err){
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

  y -= 10;

  try {
    const observationData = {
      charge: sellingData.charge,
      payments: sellingData.payments,
      numOfPayments: sellingData.numOfPayments,
    };

    const totalData = {
      subTotal12,
      totalIVA,
    };

    [y, page, index] = await TotalInformation(doc, page, helvetica, helveticaBold, helveticaOblique, observationData, totalData, widthPage, heightPage, margin, index, y);
  } catch(err){
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }

  const filename = `ComprobanteVenta-${sellerNumber}`

  const key = `${organizationId}/selling/${filename}.pdf`;
  const bucketName = "bucket-documents-pos";
  const publicUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;

  const qrData = await GenerateQRCode(publicUrl);
  
  try {
    await DrawQRCode(doc, page, qrData);
  } catch (err) {
    console.log(err);
  }

  do {
    page = doc.getPage(index);
    await FooterInformation(doc, page, helveticaOblique);
    index--;
  }while (index >= 0)

  const pdfBytes = await doc.save();
  const buffer = Buffer.from(pdfBytes);
  
  // return {
  //   statusCode: 200,
  //   headers:{
  //     "Content-Type": "application/pdf",
  //   },
  //   body: buffer.toString('base64'),
  //   isBase64Encoded:true,
  // }
  
  config.update({
    accessKeyId: "AKIA5435MIR6HPQR7BQF",
    secretAccessKey: "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",
    region: "us-east-1"
  });
  const s3 = new S3();
  
  
  // Subir el objeto al bucket
  await s3.putObject({
    Bucket: bucketName,
    Key: key,
    Body: buffer,
    ContentType: "application/pdf",
  }).promise();

  try{
    // await Quotation.findOneAndUpdate()

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        response: true,
        message: `Se genero el comprobante: ${sellerNumber}`,
        url: publicUrl,
      }),
    };
    return response;
  } catch (error) {
    console.error('Error al guardar el Comprobante:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        response: false,
        message: `Error al guardar el Comprobante: ${error.message}`,
      }),
    };
  }
});
