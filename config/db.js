import TryCatch from "../utils/errorHandler.js";
import mongoose from "mongoose";

export const connectDB = TryCatch(async() => {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
        dbName: "KoinX",
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
})
