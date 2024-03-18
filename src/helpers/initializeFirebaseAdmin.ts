import admin from 'firebase-admin';
import { credentials } from "./firebaseCredentials";
import { google } from "googleapis";

let conn = null
export const initializeFirebaseAdmin = async() => {
  const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
  const SCOPES = [MESSAGING_SCOPE];

  try {
    if(conn === null){
      conn = admin.initializeApp({
        credential: admin.credential.cert(credentials as admin.ServiceAccount)
      });
      const jwtClient = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        SCOPES,
        null
      );
    
      const token = await new Promise((resolve, reject) => {
        jwtClient.authorize((err, tokens) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(tokens.access_token);
        });
      });
      if(!token){
        throw new Error("No se pudo obtener el token")
      }
    }  
    return conn;
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}