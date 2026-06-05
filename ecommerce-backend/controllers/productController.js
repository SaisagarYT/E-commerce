const Products = require('../models/Products');
const cloudinary = require('../utils/cloudinary');

const parseSizes = (value) => {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value;
    }

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}

const createProduct = async(req,res) =>{
    const body = req.body || {};
    const {name,brand,category,description,price,countInStock,rating,numReviews,productType,discountedPrice,taxIncluded,startDate,endDate,stockStatus,unlimited,featured,sizeType,sizes} = body;
    const uploadedFiles = Array.isArray(req.files) ? req.files : [];
    const userId = req.user?._id;

    if(!userId || !name || uploadedFiles.length === 0 || !brand || !category || !description || price == undefined || countInStock == undefined || rating == undefined || numReviews == undefined){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        const imageResponses = await Promise.all(
            uploadedFiles.map((file) => new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'products',
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        resolve(result);
                    },
                );

                uploadStream.end(file.buffer);
            }))
        );

        const imageUrls = imageResponses.map((response) => response.secure_url);
        const parsedSizes = parseSizes(sizes);

        const product = new Products({
            user:userId,
            name,
            image:imageUrls[0],
            images:imageUrls,
            brand,
            category,
            description,
            price,
            discountedPrice,
            countInStock,
            taxIncluded,
            startDate,
            endDate,
            stockStatus,
            unlimited: unlimited === 'true' || unlimited === true,
            featured: featured === 'true' || featured === true,
            sizeType,
            sizes: parsedSizes,
            rating,
            numReviews,
            productType,
        })
        const createdProduct = await product.save();
        return res.status(201).json({message:'Product created successfully', product: createdProduct});
    }
    catch(err){
        console.error(err)
        return res.status(500).json({ERROR:"Internal server error"});
    }

}
const getAllProducts = async(req,res) =>{
    const { sort, limit } = req.query;
    const query = Products.find({});

    if (sort === 'latest') {
        query.sort({ createdAt: -1 });
    }

    if (limit) {
        query.limit(Number(limit));
    }

    const products = await query;
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
    const { name, price, description, image, images, brand, category, countInStock, discountedPrice, taxIncluded, startDate, endDate, stockStatus, unlimited, featured, productType, sizeType, sizes } = req.body;

     const product = await Products.findById(req.params.id);

     if(product){
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
          product.images = images || product.images;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
          product.discountedPrice = discountedPrice ?? product.discountedPrice;
          product.taxIncluded = taxIncluded ?? product.taxIncluded;
          product.startDate = startDate ?? product.startDate;
          product.endDate = endDate ?? product.endDate;
          product.stockStatus = stockStatus ?? product.stockStatus;
          product.unlimited = unlimited ?? product.unlimited;
          product.featured = featured ?? product.featured;
          product.productType = productType ?? product.productType;
        product.sizeType = sizeType ?? product.sizeType;
        product.sizes = sizes ? parseSizes(sizes) : product.sizes;

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