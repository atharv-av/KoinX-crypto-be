import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
    timestamps: true
});

export const Crypto = mongoose.model('Crypto', cryptoSchema);