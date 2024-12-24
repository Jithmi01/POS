const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
});

module.exports = mongoose.model('Customer',CustomerSchema);