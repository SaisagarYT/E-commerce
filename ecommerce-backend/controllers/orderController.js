const Orders = require('../models/Order');

const addOrderItems = async(req,res) =>{
    const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice
    } = req.body;

    if(!orderItems || orderItems.length === 0){
        return res.status(400).json({message:"No order items"});
    }

    const order = new Orders({
        user:req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        totalPrice
    });

    const createdOrder = await order.save();
    return res.status(200).json(createdOrder);
}

const getOrderById = async(req,res) =>{
    const id = req.params.id;

    const order = await Orders.findById({_id:id});
    if(!order){
        return res.status(404).json({message:"No roder present"});
    }
    else{
        return res.status(200).json(order);
    }
}

const updateOrderToPaid = async(req,res) =>{
    const id = req.params.id;

    const order = await Orders.findById({_id:id});
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_item,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        return res.status(200).json(updatedOrder)
    }
    else{
        return res.status(400).json({message:"Order not found"});
    }
}

const getMyOrders = async(req,res) =>{
    const orders = await Orders.find({}).populate('user','name email');
    return res.json(orders);
}

const getAllOrders = async(req,res) =>{
    const orders = await Orders.find({user:req.user.id}).populate('user','name email');
    return res.status(200).json(orders);
}

const updateOrderToDelivered = async(req,res) =>{
    const order = await Orders.findById(req.params.id);

    if(order)
    {
        order.isDelivered = true,
        order.deliveredAt = Date.now();

        const updateOrder = await order.save();
        return res.status(200).json(updateOrder);
    }
    else{
        res.status(200).json({message:"Order not found"});
    }
}

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders,
    updateOrderToDelivered
}