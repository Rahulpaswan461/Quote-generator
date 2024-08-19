require("dotenv").config()
const express = require("express")
const userRoute = require("./routes/user")
const {connectMongoDB} = require("./connection")
const bodyParser = require("body-parser")
const {checkForAuthenticatedUser} = require("./middlewares/auth")
const cookieParser = require("cookie-parser")
const quoteRoute = require("./routes/quote")
const path = require("node:path")
  
const app = express()
const PORT = process.env.PORT || 8000

connectMongoDB(process.env.MONGO_URL)
.then(()=> console.log("MongoDB is connected !!"))
.catch((error) => console.log("There is some error while connecting !!"))

// middleware 
app.use(bodyParser.json())
app.use(cookieParser())
app.use(checkForAuthenticatedUser("token"))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:false}))

require("./dailyEmailTask")

app.get("/",(req,res)=>{
    return res.render("home",{
        user:req.user
    })
})

app.use("/api/user",userRoute)
app.use("/api/quote",quoteRoute)

app.listen(PORT,()=>{
    console.log("Server is running !!");
    
})