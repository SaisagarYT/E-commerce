const mongoose = require('mongoose');

const productSchmea = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        default:'/images/sample.jpg',
    },
    images: [{
        type:String,
    }],
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    discountedPrice: {
        type: Number,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    taxIncluded: {
        type: String,
        default: '',
    },
    startDate: {
        type: String,
        default: '',
    },
    endDate: {
        type: String,
        default: '',
    },
    stockStatus: {
        type: String,
        default: '',
    },
    unlimited: {
        type: Boolean,
        default: false,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    sizeType: {
        type: String,
        default: '',
    },
    sizes: [{
        type: String,
    }],
    reviews: [
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    }
    ],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    productType:{
        type:String,
    }
},
{timestamps:true});

module.exports = mongoose.model('Product',productSchmea);