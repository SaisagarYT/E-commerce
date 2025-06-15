const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const protect = async(req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.SECRET);

            req.user = await Users.findById(decode.id).select('-password');

            next();
        }
        catch(err){
            console.log(err);
            return res.status(400).json({message:"not authorized, token failed"});
        }
    }
    if(!token){
        return res.status(500).json({error:"There is no token"});
    }
}

const admin = async(req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        return res.status(400).json({message:"Not authorized as admin"});
    }
}

module.exports = {protect,admin};