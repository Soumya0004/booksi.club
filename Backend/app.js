const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Database & Cloudinary Config
require("./Conn/conn");
require("./config/cloudinaryConfig");

const app = express();

// ✅ Allowed origins for frontend
const allowedOrigins = [
  "http://localhost:2000",              // local user frontend
  "http://localhost:2004",              // local admin panel
  "https://booksiclub.netlify.app",     // deployed user frontend
  "https://bookisadmin.netlify.app"     // deployed admin panel
];

// ✅ Apply CORS before all other middleware/routes
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// ✅ Stripe Webhook must come before express.json()
app.post(
  "/api/v1/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  require("./router/stripeWebhook")
);

// ✅ General Body Parsers (after webhook)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1", require("./router/user"));
app.use("/api/v1", require("./router/book"));
app.use("/api/v1", require("./router/fevourite"));
app.use("/api/v1", require("./router/cart"));
app.use("/api/v1", require("./router/order"));
app.use("/api/v1", require("./router/paymentRoutes"));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
