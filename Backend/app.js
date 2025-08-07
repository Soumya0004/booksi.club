const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
require("./Conn/conn");
require("./config/cloudinaryConfig");

const app = express();

// ✅ Stripe Webhook BEFORE express.json
app.post(
  "/api/v1/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  require("./router/stripeWebhook")
);

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:2004", "http://localhost:2000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
const user = require("./router/user");
const book = require("./router/book");
const fav = require("./router/fevourite");
const cart = require("./router/cart");
const order = require("./router/order");
const payment = require("./router/paymentRoutes");

app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", fav);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// ✅ Start server with fallback port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
