import admin from 'firebase-admin';
import { initializeFirebaseAdmin } from "@/helpers/initializeFirebaseAdmin";
import convertData from "@/helpers/reqDataModeling";
import { authMiddleware } from "@/middleware/authentication";
import { google } from "googleapis";
import { Message } from 'firebase-admin/lib/messaging/messaging-api';


export const main = authMiddleware( async(event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*", // O reemplaza el "*" por tu dominio específico
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
    };
    await initializeFirebaseAdmin();
    const body = await convertData(event);
    let response;
    let message;
    if(body.token){
      message = {
        token: body.token,
        notification: {
          title: body.title,
          body: body.body,
          image: "https://bucket-images-gb97.s3.amazonaws.com/upload/notification-images/GB-POS.png"
        },
      };
      response = await admin.messaging().send(message)
    }

    if(body.tokens){
      message = {
        tokens: body.tokens,
        notification: {
          title: body.title,
          body: body.body,
          image: "https://bucket-images-gb97.s3.amazonaws.com/upload/notification-images/GB-POS.png"
        },
      };
      response = await admin.messaging().sendEachForMulticast(message)
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        response: true,
        message: "Se envio el mensaje",
        body: response
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ status: false, error: err.message }),
    };
  }
})