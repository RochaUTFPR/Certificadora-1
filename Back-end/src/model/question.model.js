const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    number: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    levelQuestion:{
        type: Number,
        require: true
    },
    result:{
        type: Number,
        require: true
    },
})

module.exports = mongoose.model('questions', questionSchema)