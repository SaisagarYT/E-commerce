const express = require('express');
const {addProductToCart,getCartItems,deleteProduct, removeAll} = require('../controllers/cartController');
const route = express.Router();

route.post('/add',addProductToCart);
route.get('/get',getCartItems);
route.delete('/delete/:id',deleteProduct);
route.delete('/delete/all',removeAll);
module.exports = route;