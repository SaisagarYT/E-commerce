const Products = require('../models/Products');

const getAllProducts = async(req,res) =>{
    const products = await Products.find({});
    if(!products){
        return res.status(400).json({message:"There are no products"});
    }
    return res.status(200).json(products);
}

const getProductById = async(req,res) =>{
    const id = req.params.id;

    const product = await Products.findById({_id:id})
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    return res.status(200).json(product);
}

const createProduct = async(req,res) =>{
    const {user,name,image,brand,category,description,price,countInStock,rating,numReviews} = req.body;

    const product = new Products({
        user,name,image,brand,category,description,price,countInStock,rating,numReviews
    })

    const createdProduct = await product.save();
    return res.status(200).json(createdProduct);
}

const createManyProducts = async(req,res) =>{
    try{
        const products = req.body;
    
        const insertedProduct = Products.insertMany(products);
        return res.status(200).json({message:"Inserted successfully"});
    }
    catch(err){
        return res.status(400).json(err.message);
    }
}

const deleteProduct = async(req,res) =>{
    const id = req.params.id;
    try{

        const product = await Products.findOneAndDelete({_id:id});
    
        if(!product){
            return res.status(400).json({message:"Product not found"});
        }
        else{
            return res.status(200).json(product);
        }
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

const updateProduct = async(req,res) =>{
     const { name, price, description, image, brand, category, countInStock } = req.body;

     const product = await Products.findById(req.params.id);

     if(product){
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        return res.status(200).json(updatedProduct);
     }
     else{
        return res.status(400).json({message:"Product not found"});
     }
}

const deleteAllProducts = async(req,res) =>{
    const isExist = await Products.find();
    if(!isExist){
        return res.status(400).json({Messate:"There are no products exist!"});
    }
    else{
        await Products.deleteMany();
        return res.status(200).json({message:"All records are deleted"});
    }
}
module.exports = {getAllProducts,getProductById,createProduct,deleteProduct,updateProduct,createManyProducts,deleteAllProducts};