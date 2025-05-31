const express = require('express');
const {protect,admin} = require('../middleware/authMiddleware');
const {getAllProducts,getProductById,createProduct,deleteProduct,updateProduct} = require('../controllers/productController')

const route = express.Router();

route.get('/',getAllProducts);
route.post('/',protect,admin,createProduct);
route.get('/:id',getProductById);
route.delete('/:id',protect,admin,deleteProduct);
route.put('/:id',protect,admin,updateProduct);

module.exports = route;
