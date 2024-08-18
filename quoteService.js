const Quote = require("./models/quote")

async function getRandomQuote(){
    const count = await Quote.countDocuments()
    const random = Math.floor(Math.random()*count)
    const quote = await Quote.findOne().skip(random)

    return quote 
}


module.exports ={
    getRandomQuote
}