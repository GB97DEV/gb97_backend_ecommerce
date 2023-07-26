import mongoose from "mongoose";
import { Observable, defer } from "rxjs";


let conn = null;

const connectDatabase = (): Observable<any> => {
  return defer(async () => {
    if (conn == null) {
      const url = process.env.MONGOURL;
      console.log("Creating new connection to the database.......");
      conn = await mongoose.connect(url, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Successfully connected to the database");
    } else {
      console.log("Connection already established, reusing the existing connection");
    }
    return true; // Esto es para completar el Observable.
  });
};

export default connectDatabase;
