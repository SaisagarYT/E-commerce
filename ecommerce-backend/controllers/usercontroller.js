const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { response } = require('express');

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

const getUsers = async(req,res) =>{
    try{
        const user = await Users.find();
        if(!user){
            return res.status(400).json({message:"Users not exist"});
        }
        else{
            return res.status(200).json(user);
        }
    }
    catch(err){
        console.log("Error in user fetch all data",err.message);
    }
}

const deleteUser = async(req,res) =>{
    const id = req.params.id;
    const deleteUser = await Users.findOneAndDelete({_id:id});
    if(!deleteUser){
        return res.status(400).json({message:"User not exist to delete"});
    }
    else{
        return res.status(200).json(deleteUser);
    }
}

const updateUser = async(req,res) =>{
    const user = await Users.find(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin ?? user.isAdmin;
        const updateUser = await user.save();
        return res.status(200).json(updateUser);
    }
    else{
        return res.status(400).json({message:"Internal server error"});
    }
}

module.exports = {userRegister,userLogin,updateUser,deleteUser,getUsers};