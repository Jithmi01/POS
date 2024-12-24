const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    },
    qtyOnHand:{
        type:Array,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
});


module.exports = mongoose.model('Product',ProductSchema);