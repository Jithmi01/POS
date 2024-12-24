const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    role:{
        type:Array,//{roleName:'MANAGER'},{roleName:"USER"},{roleName:"ADMIN"}
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
});

module.exports = mongoose.model('User',userSchema);