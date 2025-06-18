const express = require('express');
const router = express.Router();

const {addOrderItems, getOrderById,getMyOrders, updateOrderToPaid,getAllOrders,updateOrderToDelivered} = require('../controllers/orderController')

const {protect, admin} = require('../middleware/authMiddleware');
const { route } = require('./productRoute');

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect,admin, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/').get(protect,admin,getAllOrders);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);

module.exports = router;