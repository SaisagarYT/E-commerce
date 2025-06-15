const mongoose = require('mongoose');
const Carts = require('../models/Cart');

const addProductToCart = async(req,res) =>{
    const {product,name,image,price,quantity} = req.body;

    try{

        const isExist = await Carts.findOne({image});
        if(isExist && isExist.image === image){
            isExist.quantity = isExist.quantity + 1;
            await isExist.save();
            return res.status(200).json({message:"quantity incremented"});
        }
        else{
            const addProduct = new Carts({
                product,
                name,
                image,
                price,
                quantity:1
            })
            await addProduct.save();
            return res.status(200).json({message:"Item added to cart"});
        }
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const getCartItems = async(req,res) =>{
    const products = await Carts.find();
    if(products){
        return res.status(200).json(products);
    }
    else{
        return res.status(400).json({error:"No items in the cart"});
    }
}

const deleteProduct = async(req,res) =>{
    try{ 
        const id = req.params.id;
        const product = await Carts.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        if(product.quantity <= 1){
            await Carts.findByIdAndDelete(id);
            return res.status(200).json({message:"Product permanetly deleted"});
        }
        else{
            product.quantity -=1;
            await product.save();
            return res.status(200).json({message:"Product is decremented "});
        }
    }
    catch(err){
        return res.status(500).json({error:err.message});
    }
}

const removeAll = async(req,res) =>{
    try{

        const products = await Carts.find({});
        if(products.length === 0){
            return res.status(400).json({message:"There is no data in the database"});
        }
        else{
            await Carts.deleteMany();
            return res.status(200).json({message:"Successfully deleted"});
        }
    }
    catch(err){
        return res.status(500).json(err.message);
    }
}

module.exports = {addProductToCart,getCartItems,deleteProduct,removeAll};

