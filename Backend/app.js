const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

require("./Conn/conn");
require("./config/cloudinaryConfig");

const app = express();

// ✅ Stripe Webhook FIRST — raw body parser
app.post(
  "/api/v1/stripe-webhook",
  bodyParser.raw({ type: "application/json" }),
  require("./router/stripeWebhook")
);

// ✅ CORS Setup
app.use(
  cors({
    origin: [
      "http://localhost:2000",                      // local user frontend
      "http://localhost:2004",                      // local admin panel
      "https://booksiclub.netlify.app",             // deployed user site
      "https://bookisadmin.netlify.app"             // deployed admin panel
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/v1", require("./router/user"));
app.use("/api/v1", require("./router/book"));
app.use("/api/v1", require("./router/fevourite"));
app.use("/api/v1", require("./router/cart"));
app.use("/api/v1", require("./router/order"));
app.use("/api/v1", require("./router/paymentRoutes"));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

