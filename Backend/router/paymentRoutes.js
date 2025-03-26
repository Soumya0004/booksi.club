const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Stripe Secret Key
const User = require("../models/user");
const Order = require("../models/order");
const bodyParser = require("body-parser");

// ✅ **Create Stripe Checkout Session**
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
            success_url: `http://localhost:5173/profile/orderHistory?success=true`,
            cancel_url: `http://localhost:5173/cart?canceled=true`,
            metadata: { userId }, // Store user ID for reference
        });

        res.json({ sessionId: session.id });

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ message: "Payment processing failed" });
    }
});

// ✅ **Webhook to update order history & empty cart**
router.post("/stripe-webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        console.log("🔔 Webhook received. Verifying signature...");
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_KEY);
    } catch (err) {
        console.error("🚨 Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`✅ Webhook Event Type: ${event.type}`);

    if (event.type !== "checkout.session.completed") {
        console.log("ℹ️ Not a checkout.session.completed event. Ignoring.");
        return res.json({ received: true });
    }

    try {
        const session = event.data.object;
        console.log("💡 Session Data:", session);

        const userId = session.metadata?.userId;
        if (!userId) {
            console.error("🚨 User ID is missing in session metadata!");
            return res.status(400).json({ message: "User ID not found in metadata" });
        }

        console.log(`👤 Fetching user: ${userId}`);

        // ✅ Ensure session ID is checked properly
        const existingOrder = await Order.findOne({ user: userId, sessionId: session.id });
        if (existingOrder) {
            console.log("⚠️ Order already exists. Skipping duplicate processing.");
            return res.json({ message: "Order already processed" });
        }

        console.log("🔍 Fetching user from database...");
        const user = await User.findById(userId).populate("cart");

        if (!user) {
            console.error("🚨 User not found in database!");
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.cart.length) {
            console.error("🚨 User cart is empty! Cannot create an order.");
            return res.status(400).json({ message: "User cart is empty, cannot create order." });
        }

        console.log("📦 Creating new order...");

        // ✅ Save order with full book details
        const newOrder = new Order({
            user: user._id,
            books: user.cart.map(book => ({
                _id: book._id,
                title: book.title,
                author: book.author,
                price: book.price,
                url: book.url, // ✅ Ensures the book image URL is stored
            })),
            total: session.amount_total / 100,
            status: "Order placed",
            sessionId: session.id,
        });

        console.log("📌 Order details:", newOrder);

        await newOrder.save();
        user.orders.push(newOrder._id);
        await user.save();

        console.log(`✅ Order Created for User: ${userId}`);

        // ✅ Empty user cart
        await User.findByIdAndUpdate(userId, { cart: [] });

        res.json({ received: true });
    } catch (error) {
        console.error("🚨 Webhook processing error:", error);
        res.status(500).json({ message: "Webhook processing failed", error: error.message });
    }
});




module.exports = router;
