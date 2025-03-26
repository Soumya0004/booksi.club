const router =require("express").Router();
const User=require("../models/user")
const {authenticationToken}= require("./userAuth")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use env variables for security

//put book to catd

router.put("/add-to-cart" ,authenticationToken, async (req, res)=>{
    try {
        const {bookid , id} = req.headers;
        const userData =await User.findById(id);
        const isBookinCart= userData.cart.includes(bookid);
        if(isBookinCart){
            return res.json({
                status:"Success",
                message:"Book is alrady in Cart"
            });
        }
        await User.findByIdAndUpdate(id ,{
            $push:{cart:bookid},
        });
        return res.json({
            status:"Success",
            message:"book added to cart"
        })


    } catch (error) {
        res.status(500).json({message:"An error occurred"})
    }
})


//remove from cart

router.put("/remove-to-cart/:bookid" ,authenticationToken, async (req, res)=>{
    try {

        const {bookid} = req.params;
        const {id}= req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid},
        });

        return res.json({
            status:"success",
            message:"book remouve from cart"
        });
        
    } catch (error) {
        res.status(500).json({message:"An error occurre"})
        
    }

})

//get cart from a porticular user

router.get("/get-user-cart", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        // Ensure user exists
        const userData = await User.findById(id).populate("cart");
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Reverse cart to show latest items first
        const cart = userData.cart.reverse();

        return res.json({
            status: "success",
            data: cart,
        });

    } catch (error) {
        console.error("Error fetching user cart:", error);
        res.status(500).json({ message: "An error occurred while fetching cart" });
    }
});



module.exports =router;