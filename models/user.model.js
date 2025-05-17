const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:[3,"username must be at least 3 characters long"],
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8,"password must be at least 8 characters long"]
    }
})

const user = mongoose.model("user",userSchema);

module.exports = user;
