import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cryptoRoutes from "./routes/cryptoRoutes.js"
import cron from "node-cron"
import axios from "axios";
import { Crypto } from "./models/cryptoModel.js";

const app = express();

dotenv.config();

app.use("/api/v1", cryptoRoutes)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB()
});

cron.schedule('* * * * *', async () => {
    const coins = ['bitcoin', 'matic-network', 'ethereum'];

    for (let coin of coins) {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`);

            const { usd: price } = response.data.market_data.current_price;
            const { usd: marketCap } = response.data.market_data.market_cap;
            const change24h = response.data.market_data.price_change_percentage_24h;

            const cryptoData = new Crypto({
                coinId: coin,
                price,
                marketCap,
                change24h
            });
            await cryptoData.save();
        } catch (error) {
            console.error(`Error fetching or saving data for ${coin}: `, error);
        }
    }
});
