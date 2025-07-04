import mongoose from "mongoose";
import { DB_NAME_MONGODB } from "../constants.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME_MONGODB}`);
    console.log(
      `MongoDB Connected:\nHOST DB: ${conn.connection.host}`.bold.cyan
    );
  } catch (error) {
    console.log("mongoose connection error", error);
    process.exit(1);
  }
};

export default connectDB;
