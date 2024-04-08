const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    profile:{
        type: Number,
        require: true
    },
    level:{
        type: Number,
        require: true
    },
    punctuation:{
        type: Number,
        require: true
    }

})

module.exports = mongoose.model('users', UserSchema)


