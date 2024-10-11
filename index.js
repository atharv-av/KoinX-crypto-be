import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cryptoRoutes from "./routes/cryptoRoutes.js"

const app = express();

dotenv.config();

app.use("/api/v1", cryptoRoutes)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
});
