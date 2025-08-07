const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

require("./Conn/conn");
require("./config/cloudinaryConfig");

const app = express();

// ✅ CORS Setup
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:2000",
        "http://localhost:2004",
        "https://booksiclub.netlify.app",
        "https://bookisadmin.netlify.app",
      ];
      console.log("CORS request from:", origin);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);

app.options("*", cors()); // ✅ Enable preflight

// ✅ Stripe webhook (raw body)
app.post(
  "/api/v1/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  require("./router/stripeWebhook")
);

// ✅ General middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1", require("./router/user"));
app.use("/api/v1", require("./router/book"));
app.use("/api/v1", require("./router/fevourite"));
app.use("/api/v1", require("./router/cart"));
app.use("/api/v1", require("./router/order"));
app.use("/api/v1", require("./router/paymentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
