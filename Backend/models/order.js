const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    books: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books", 
        required: true,
      }
    ],
    status: {
      type: String,
      default: "Pending",
      enum: ["Order placed",, "Out for delivery", "Delivered", "Canceled", "Pending"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
