const router = require("express").Router();
const { authenticationToken } = require("./userAuth");
const Book = require("../models/book");
const User = require("../models/user");
const Order = require("../models/order");

// 📌 ✅ PLACE ORDER (MULTIPLE BOOKS SUPPORTED)
router.post("/place-order", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers; // User ID
        const { order } = req.body; // Array of books

        if (!order || order.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        // 📌 ✅ Extract Book IDs Correctly
        const bookIds = order.map((book) => book._id); // Ensure book IDs are stored

        // 📌 ✅ Validate Books
        const existingBooks = await Book.find({ _id: { $in: bookIds } });
        if (existingBooks.length !== bookIds.length) {
            return res.status(400).json({ message: "One or more books not found" });
        }

        // 📌 ✅ Create Order with Books
        const newOrder = new Order({
            user: id,
            books: bookIds, // ✅ Storing an array of book IDs
            status: "Order placed",
        });

        const savedOrder = await newOrder.save();

        // 📌 ✅ Update User Orders & Clear Cart
        await User.findByIdAndUpdate(id, {
            $push: { orders: savedOrder._id },
            $set: { cart: [] },
        });

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });

    } catch (error) {
        console.error("🚨 Error placing order:", error);
        return res.status(500).json({ message: "An error occurred while placing order" });
    }
});


// 📌 ✅ GET ORDER HISTORY FOR A USER
router.get("/get-order-history", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        console.log(`📜 Fetching order history for user: ${id}`);

        const userData = await User.findById(id)
            .populate({
                path: "orders",
                populate: {
                    path: "books",
                    model: "books", // ✅ Make sure the correct model is used
                },
            });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json({
            status: "success",
            data: userData.orders.reverse(), // Show latest orders first
        });

    } catch (error) {
        console.error("🚨 Error fetching order history:", error);
        return res.status(500).json({ message: "An error occurred while fetching orders" });
    }
});


// 📌 ✅ GET ALL ORDERS (ADMIN)
router.get("/get-all-orders", authenticationToken, async (req, res) => {
    try {
        const allOrders = await Order.find()
            .populate("books") // ✅ Populate multiple books
            .populate("user")
            .sort({ createdAt: -1 });

        return res.json({
            status: "success",
            data: allOrders,
        });

    } catch (error) {
        console.error("🚨 Error fetching all orders:", error);
        res.status(500).json({ message: "An error occurred while fetching orders" });
    }
});

// 📌 ✅ UPDATE ORDER STATUS
router.put("/update-status/:id", authenticationToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: "Success",
            message: "Order status updated successfully",
        });

    } catch (error) {
        console.error("🚨 Error updating order status:", error);
        res.status(500).json({ message: "An error occurred while updating status" });
    }
});

module.exports = router;
