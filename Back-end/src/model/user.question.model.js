const mongoose = require('mongoose')

const UserQuestionSchema = new mongoose.Schema({
    user_Id: {
        type: Number,
        require: true,
    },
    question_id: {
        type: Number,
        require: true
    },
    attempts:{
        type: Number,
        require: true
    },
    success:{
        type: Boolean,
        require: true
    },
})

module.exports = mongoose.model('usersQuestions', UserQuestionSchema)