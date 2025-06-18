const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
    },
    color:{
        type:String
    },
    quantity:{
        type:Number
    }
});
module.exports = mongoose.model('Cart',cartSchema);