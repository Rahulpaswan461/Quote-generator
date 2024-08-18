const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { createTokenForAuthenticatedUser } = require("../service/authentication");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isLoggedIn:{
        type:Boolean,
        default: false
    },
    stopDailyQuote:{
        type:Boolean,
        default: true,
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    const user = this;
    if(!user.isModified('password')) return next()

     try{
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(user.password,salt)

         user.password = hashedPassword
         next()
     }
     catch(error){
        return next(error)
     }

})
userSchema.static("matchPasswordAndGenerateToken",async function(email,password){
     const user = await this.findOne({email:email})

     if(!user)
        throw Error("Invalid username or password")

    const isMatch = await bcrypt.compare(password,user.password)
    if(isMatch){
      const token = createTokenForAuthenticatedUser(user)
      return token
    }
    else{
        throw new Error("Invalid username or password ")
    }
})


const User = mongoose.model("user",userSchema)

module.exports = User