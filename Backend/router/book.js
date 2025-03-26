const router =require("express").Router();
const User=require("../models/user")
const jwt= require("jsonwebtoken")
const Book = require("../models/book")
const {authenticationToken}= require("./userAuth")
const multer = require("multer");  // ✅ Import multer

const storage = multer.diskStorage({}); // No local storage
const upload = multer({ storage });
const cloudinary = require("../config/cloudinaryConfig"); // Import Cloudinary

router.post("/add-book", authenticationToken, upload.single("image"), async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);

        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are not authorized to perform admin actions" });
        }

        // Upload image to Cloudinary
        const cloudinaryRes = await cloudinary.uploader.upload(req.file.path, {
            folder: "books",
        });

        const book = new Book({
            url: cloudinaryRes.secure_url, // Cloudinary image URL
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        await book.save();
        res.status(200).json({ message: "Book added successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

//update book

router.put("/update-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const { url, title, author, price, desc, language } = req.body;

        // Find the existing book
        const existingBook = await Book.findById(bookid);
        if (!existingBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        let imageUrl = existingBook.url; // Default to existing image URL

        // If a new image is provided, upload to Cloudinary
        if (url && url.startsWith("data:image")) { 
            const uploadedResponse = await cloudinary.uploader.upload(url, {
                folder: "books",
                public_id: `book_${bookid}`
            });

            imageUrl = uploadedResponse.secure_url; // Get Cloudinary URL
        }

        // Update the book details
        await Book.findByIdAndUpdate(bookid, {
            url: imageUrl,  // Updated image URL from Cloudinary
            title,
            author,
            price,
            desc,
            language,
        });

        return res.status(200).json({
            message: "Book updated successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});
//delete book --admin

router.delete("/delete-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        // Find the book before deleting
        const book = await Book.findById(bookid);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        // Extract Cloudinary public_id from URL (assuming format: https://res.cloudinary.com/.../books/book_123.jpg)
        if (book.url) {
            const publicId = book.url.split('/').pop().split('.')[0]; // Extract filename without extension
            await cloudinary.uploader.destroy(`books/${publicId}`); // Delete from Cloudinary
        }

        // Delete the book from the database
        await Book.findByIdAndDelete(bookid);

        return res.status(200).json({ message: "Book deleted successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


//get all books

router.get("/get-all-books",async(req,res)=>{
    try {
        const books =await Book.find().sort({createdAt:-1});
        return res.json({
            status:"Success",
            data:books,
        });
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
    }
});

//get recently added books limit 4 
router.get("/get-recent-books", async (req, res) => {
    try {
        // Fetch latest 4 books, ensuring they have valid images
        const books = await Book.find({ url: { $exists: true, $ne: "" } })
            .sort({ createdAt: -1 })
            .limit(4);

        if (!books.length) {
            return res.status(404).json({ message: "No recent books found" });
        }

        return res.json({
            status: "Success",
            data: books,
        });

    } catch (error) {
        console.error("Error fetching recent books:", error);
        return res.status(500).json({ message: "An error occurred while fetching recent books" });
    }
});


//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.json({
            status: "success",
            data: book,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


module.exports=router;