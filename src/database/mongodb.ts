const mongoose = require("mongoose");

let conn = null;

const connectDatabase = async () => {
  if (conn == null) {
    const url = process.env.MONGOURL;
    console.log("Creating new connection to the database.......");
    conn = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
    });
    return conn;
  }
  console.log(
    "Connection already established, reusing the existing connection"
  );
};

export default connectDatabase;
