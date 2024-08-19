const express = require("express")
const {handleSignupUser,handleLoginUser,logoutUser,stopDailyQuote,addQuoteToList} = require("../controllers/user")
 
const router = express.Router()

router.get("/signup",(req,res)=>{
    return res.render("signup")
})
router.get("/login",(req,res)=>{
    return res.render("signin")
})

router.post("/signup",handleSignupUser)
router.post("/login",handleLoginUser)
router.get("/logout",logoutUser)
router.patch("/:userId/stop/daily-quote",stopDailyQuote)
module.exports = router