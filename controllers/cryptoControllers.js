import { Crypto } from "../models/cryptoModel.js";

export const fetchLatestData = async (req, res) => {
  const { coin } = req.query;

  try {
    if (!coin) {
      return res.status(400).json({ error: "coin query param is required" });
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
  } catch (error) {
    console.error("Error fetching latest data:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

export const findDeviation = async (req, res) => {
  const { coin } = req.query;

  try {
    if (!coin) {
      return res.status(400).json({ error: "coin query param is required" });
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
  } catch (error) {
    console.error("Error finding deviation:", error);
    res.status(500).json({ error: "An error occurred while calculating deviation." });
  }
};
