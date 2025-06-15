const express = require('express');
const {protect,admin} = require('../middleware/authMiddleware');
const {getAllProducts,getProductById,createProduct,deleteProduct,updateProduct,createManyProducts, deleteAllProducts} = require('../controllers/productController')

const route = express.Router();

route.get('/',getAllProducts);
route.post('/',protect,admin,createProduct);
route.get('/:id',getProductById);
route.delete('/:id',deleteProduct);
route.delete('/delete/all',deleteAllProducts);
route.put('/:id',protect,admin,updateProduct);
route.post('/all',createManyProducts);

module.exports = route;
