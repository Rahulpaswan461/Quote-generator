const mongoose = require("mongoose")

const quoteSchema = new mongoose.Schema({
    text:{
        type:String,
        required: true,
    },
    author:{
        type:String,
        required: true
    }
},{timestamps:true})

const Quote = mongoose.model("quote",quoteSchema)

module.exports = Quote