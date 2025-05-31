const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const userRegister = async(req,res) =>{
    const {name,email,password} = req.body;

    if(name == '' || email == '' || password == ''){
        console.log("Ente the details");
    }

    try{
        const isExist = await Users.findOne({email});
        if(isExist){
            return res.status(400).json({message:"User already exist"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = await Users.create({
            name,
            email,
            password:hashedPassword
        })

        if(newUser){
            return res.status(200).json({
                newUser,
                token:generateToken(newUser._id),
            })
        }
        else{
            return res.status(400).json({message:"invalid user data"});
        }
    }
    catch(err){
        return res.status(500).json({ERROR:"Internal server error"});
    }
}

const userLogin = async(req,res) =>{
    const {email,password} = req.body;

    try{
        const user = await Users.findOne({email});

        if(user && await bcrypt.compare(password,user.password)){
            return res.json({user,token:generateToken(user._id)});
        }
        return res.status(400).json({message:"Invalid credentials"});
    }
    catch(err){
        return res.status(500).json({error:"Internal server error",err});
    }
}

module.exports = {userRegister,userLogin};