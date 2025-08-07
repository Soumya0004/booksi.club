const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user");
const Order = require("../models/order");

module.exports = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_KEY);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type !== "checkout.session.completed") {
    return res.json({ received: true });
  }

  try {
    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (!userId) {
      console.error("❌ User ID is missing in session metadata!");
      return res.status(400).json({ message: "User ID not found in metadata" });
    }

    const existingOrder = await Order.findOne({ user: userId, sessionId: session.id });
    if (existingOrder) {
      console.log("⚠️ Order already exists. Skipping duplicate processing.");
      return res.json({ message: "Order already processed" });
    }

    const user = await User.findById(userId).populate("cart");
    if (!user || !user.cart.length) {
      return res.status(400).json({ message: "User/cart invalid" });
    }

    const newOrder = new Order({
      user: user._id,
      books: user.cart.map(book => ({
        _id: book._id,
        title: book.title,
        author: book.author,
        price: book.price,
        url: book.url,
      })),
      total: session.amount_total / 100,
      status: "Order placed",
      sessionId: session.id,
    });

    await newOrder.save();
    user.orders.push(newOrder._id);
    user.cart = [];
    await user.save();

    console.log("✅ Order created for:", userId);
    res.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.status(500).json({ message: "Webhook processing failed", error: error.message });
  }
};
