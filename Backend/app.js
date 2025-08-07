const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Load DB and Cloudinary Configs
require("./Conn/conn");
require("./config/cloudinaryConfig");

const app = express();

// ✅ Allowed frontend domains
const allowedOrigins = [
  "http://localhost:2000",
  "http://localhost:2004",
  "https://booksiclub.netlify.app",
  "https://bookisadmin.netlify.app",
];

// ✅ Apply CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ✅ Stripe webhook: use raw body parser here only
app.post(
  "/api/v1/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  require("./router/stripeWebhook")
);

// ✅ Body parsers for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Main API Routes
app.use("/api/v1", require("./router/user"));
app.use("/api/v1", require("./router/book"));
app.use("/api/v1", require("./router/fevourite"));
app.use("/api/v1", require("./router/cart"));
app.use("/api/v1", require("./router/order"));
app.use("/api/v1", require("./router/paymentRoutes"));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
