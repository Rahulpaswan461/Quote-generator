const crons = require("node-cron")
const {getRandomQuote} = require("./quoteService")
const sendEmail = require("./mailer")
const User = require("./models/user")

crons.schedule('0 8 * * *',async () =>{
    console.log("Running daily email task ...")

    const quote = await getRandomQuote();
    const quoteText = `${quote.text} - ${quote.author}`

    const users = await User.find({isLoggedIn:true})

    users.forEach((user) =>{
        sendEmail(user.email,"Quote of The Day",quoteText)
    })

})