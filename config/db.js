const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGOO_URI).then(()=>{
        console.log("connected to db")
    })
}

module.exports = connectDB;
