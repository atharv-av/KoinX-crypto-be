import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
});