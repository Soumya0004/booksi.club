const mongoose = require("mongoose");

const book = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Manga",
        "Poetry",
        "Story",
        "Fiction",
        "Non-Fiction",
        "Fantasy",
        "Science",
        "History",
      ],
      required: true,
    }
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("books", book);
