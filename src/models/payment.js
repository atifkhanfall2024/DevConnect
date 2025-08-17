const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sessionId: { type: String, required: true },
  amount: { type: Number, required: true },
  productName: { type: String, required: true },
  status: { type: String, default: "unpaid" }, // unpaid, paid
  createdAt: { type: Date, default: Date.now },
} , {timestamps:true});

module.exports = mongoose.model("payment", orderSchema);