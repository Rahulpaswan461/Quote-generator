const express = require("express");
const Quote = require("../models/quote");

const router = express.Router()

router.get("/add-quote",(req,res)=>{
    return res.render("add-quote",{
        user:req.user
    })
})

router.post("/add-quote/user",async (req,res)=>{
    try{
       let quote = new Quote({
          text : req.body.text,
          author : req.body.author
       })
       
       quote = await quote.save();
   
       return res.render("home",{
         user:req.user
       })
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error"})
    }
})
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