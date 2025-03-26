const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user", // ✅ Ensure it matches your User model name
      required: true,
    },
    books: [
      {
        type: mongoose.Types.ObjectId,
        ref: "books", // ✅ Ensure it matches your Book model name
        required: true,
      }
    ],
    status: {
      type: String,
      default: "Pending",
      enum: ["Order placed", "Out for delivery", "Delivered", "Canceled", "Pending"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
