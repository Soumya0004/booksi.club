const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
require("./Conn/conn");
require("./config/cloudinaryConfig");  // <-- Import Cloudinary config

// Use raw body parsing **only** for Stripe webhooks (before JSON parsing)
app.use("/api/v1/stripe-webhook", bodyParser.raw({ type: "application/json" }));

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:2000"], // Allow multiple localhost origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));app.use(express.json());  // ✅ Apply JSON parsing only to other routes
app.use(express.urlencoded({ extended: true }));

const user = require("./router/user");
const Book = require("./router/book");
const Fevourite = require("./router/fevourite");
const Cart = require("./router/cart");
const Order = require("./router/order");
const paymentRoutes = require("./router/paymentRoutes");

// ✅ Correct route structure
app.use("/api/v1", user);
app.use("/api/v1", Book);
app.use("/api/v1", Fevourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);
app.use("/api/v1", paymentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
