import { Crypto } from "../models/cryptoModel.js";
import TryCatch from "../utils/errorHandler.js";

export const fetchLatestData = TryCatch(async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin query param is required" });
  }

  const latestData = await Crypto.findOne({ coinId: coin }).sort({
    timestamp: -1,
  });
  console.log("Latest data found:", latestData); // Log the fetched data

  if (!latestData) {
    return res.status(404).json({ error: `No data found for ${coin}` });
  }

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  });
});
