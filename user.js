import { Stream } from "stream";

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
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    role:{
        role: number,
        default: 0
    },
    token: {
        type: number
    },
    tokenExp: {
        type: number
    }

});


const User = mongoose.model('User', userSchema); 

module.exports= {User};