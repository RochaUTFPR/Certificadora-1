const mongoose = require('mongoose')

const { generateHash } = require("../utils/hashProvider");

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

UserSchema.pre("save", async function (next) {
    const user = this;
  
    user.password = await generateHash(user.password);
  
    return next();
});
  
UserSchema.pre("findOneAndUpdate", async function (next) {
    const doc = this;

    const userUpdated = doc.getUpdate();

    if (userUpdated.password) {
        userUpdated.password = await generateHash(userUpdated.password);
    }

    return next();
});


module.exports = mongoose.model('users', UserSchema)


