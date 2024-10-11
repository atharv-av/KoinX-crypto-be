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

  if (!latestData) {
    return res.status(404).json({ error: `No data found for ${coin}` });
  }

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  });
});

export const findDeviation = TryCatch(async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin query param is required" });
  }

  const prices = await Crypto.find({ coinId: coin })
    .sort({ timestamp: -1 })
    .limit(100)
    .select("price");

  if (prices.length === 0) {
    return res.status(404).json({ error: `No data found for ${coin}` });
  }

  const priceValues = prices.map((doc) => doc.price);
  const mean = priceValues.reduce((a, b) => a + b) / priceValues.length;

  const variance =
    priceValues.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
    priceValues.length;
  const deviation = Math.sqrt(variance);

  res.json({ deviation: deviation.toFixed(2) });
});
