const User = require("../models/user");

async function handleSignupUser(req,res){
    try{
         const {name , email , password } = req.body;
         if(!name || !email || !password) 
            return res.status(400).json({msg:"Information incomplete !!"})

         let user = new User({
            name: name,
            email: email,
            password: password
         })
         user = await user.save()

         if(!user){
            return res.status(400).json({msg:"No user created !!!"})
         }

         return res.status(200).json(user)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json("Internal Sever Error !!")
    }
}

async function handleLoginUser(req,res){
    try{
      const { email, password } = req.body;
      if(!email || !password) return res.status(400).json({msg:"Incomplete information "})
       
      let user = await User.findOne({email:email})  
      const token = await User.matchPasswordAndGenerateToken(email,password)
       
      user.isLoggedIn = true;
      await user.save()

      return res.cookie("token",token).json({msg:"logged in successfully !!!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error !!"})
    }
}

async function logoutUser(req,res){
    try{
        const user = req.cookies["token"];
        user.isLoggedIn = false;
       return res.clearCookie("token").json({msg:"user loggedout successfully !!"})
    }
    catch(error){
       console.log("There is some error",error)
       return res.status(500).json({msg:"Internal Server Error !!"})
    }
}

async function stopDailyQuote(req,res){
    try{
       let user = await User.findByIdAndUpdate(req.params.userId,{
        stopDailyQuote:false
       })
       await user.save();
       return res.status(200).json({msg:"Information updated successfully !!!"})
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

module.exports = {
    handleSignupUser,
    handleLoginUser,
    logoutUser,
    stopDailyQuote
}