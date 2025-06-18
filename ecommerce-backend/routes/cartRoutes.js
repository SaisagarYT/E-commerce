const {protect} = require('../middleware/authMiddleware');

const express = require('express');
const {addProductToCart,getCartItems,deleteProduct, removeAll,deleteCompleteProduct} = require('../controllers/cartController');
const route = express.Router();

route.post('/add',protect,addProductToCart);
route.get('/get',protect,getCartItems);
route.delete('/delete/:id',protect,deleteProduct);
route.delete('/remove/all',protect,removeAll);
route.delete('/complete/:id',protect,deleteCompleteProduct);
module.exports = route;