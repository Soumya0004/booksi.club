const router =require("express").Router();
const User=require("../models/user")
const {authenticationToken}= require("./userAuth")

// add book to favourite

router.put("/add-book-to-favourite", authenticationToken ,async (req ,res)=>{
    try {
        const {bookid ,id} = req.headers;
        const userData=await User.findById(id);
        const isbookFevorite = userData.favourites.includes(bookid);
      if (isbookFevorite) {
        return res.status(200).json({message: "Book is already in favourites"})
        
      }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}})
        return res.status(200).json({message:"Book added to  favourites"})
        
    } catch (error) {
        res.status(500).json({message:"An error occurred"})
        
    }
} )
  
//delete from favourite
router.put("/remove-book-to-favourite", authenticationToken ,async (req ,res)=>{
  try {
      const {bookid ,id} = req.headers;
      const userData=await User.findById(id);
      const isbookFevorite = userData.favourites.includes(bookid);
    if (isbookFevorite) {
      await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}})
      
    }
     
      return res.status(200).json({message:"Book removed from  favourites"})
      
  } catch (error) {
      res.status(500).json({message:"An error occurred"})
      
  }
} )

//get fev book of a porticular user

router.get("/get-favorite-book",authenticationToken ,async(req,res)=>{
  try {
    const {id}= req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks =userData.favourites;
    return res.json({
      status:"Succcess",
      data:favouriteBooks,
    });

    
  } catch (error) {
    res.status(500).json({message:"An error occurred"})
  }
})



module.exports =router;