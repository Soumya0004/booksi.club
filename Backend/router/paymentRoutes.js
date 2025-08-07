const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Stripe Secret Key

// **Create Stripe Checkout Session**
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { order, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: order.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.title },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `http://localhost:2004/profile/orderHistory?success=true`,
      cancel_url: `http://localhost:2004/cart?canceled=true`,
      metadata: { userId }, // Store user ID for reference
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ message: "Payment processing failed" });
  }
});

module.exports = router;
