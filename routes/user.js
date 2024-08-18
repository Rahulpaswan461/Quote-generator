const express = require("express")
const {handleSignupUser,handleLoginUser,logoutUser,stopDailyQuote} = require("../controllers/user")
 
const router = express.Router()


router.post("/signup",handleSignupUser)
router.post("/login",handleLoginUser)
router.post("/logout",logoutUser)
router.patch("/:userId/stop/daily-quote",stopDailyQuote)
module.exports = router