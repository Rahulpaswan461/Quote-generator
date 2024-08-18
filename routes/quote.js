const express = require("express");
const Quote = require("../models/quote");

const router = express.Router()

router.post("/add-quote",async (req,res)=>{
    try{
       const quote = req.body.quote;
       await Quote.insertMany(quote)

       return res.status(200).json({msg:"quote-addedd successfully!!"})

    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error "})
    }
})

module.exports = router