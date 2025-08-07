const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

require("./Conn/conn");
require("./config/cloudinaryConfig");

const app = express();

// ✅ Correct and Safe CORS setup
const allowedOrigins = [
  "http://localhost:2000",                     // local user frontend
  "http://localhost:2004",                     // local admin panel
  "https://booksiclub.netlify.app",            // deployed user site
  "https://bookisadmin.netlify.app"            // deployed admin panel
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// ✅ Ensure OPTIONS preflight is handled
app.options("*", cors());

// ✅ Stripe webhook (raw body required)
app.post(
  "/api/v1/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  require("./router/stripeWebhook")
);

// ✅ General body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1", require("./router/user"));
app.use("/api/v1", require("./router/book"));
app.use("/api/v1", require("./router/fevourite"));
app.use("/api/v1", require("./router/cart"));
app.use("/api/v1", require("./router/order"));
app.use("/api/v1", require("./router/paymentRoutes"));

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
