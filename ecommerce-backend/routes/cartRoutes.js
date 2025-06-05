const express = require('express');
const {addProductToCart,getCartItems,deleteProduct} = require('../controllers/cartController');
const route = express.Router();

route.post('/add',addProductToCart);
route.get('/get',getCartItems);
route.delete('/delete/:id',deleteProduct);
module.exports = route;