const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    firstname: {
        type: String,
        maxlength: 50
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    role:{
        role: Number,
        default: 0
    },
    token: {
        type: Number
    },
    tokenExp: {
        type: Number
    }

});


const User = mongoose.model('User', userSchema); 

module.exports= {User};
