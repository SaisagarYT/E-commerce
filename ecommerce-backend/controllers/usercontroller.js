const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { response } = require('express');

const userRegister = async(req,res) =>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please provide name, email, and password"});
    }
    try{
        const isExist = await Users.findOne({email});
        if(isExist){
            return res.status(400).json({message:"User already exists with this email"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await Users.create({
            name,
            email,
            password:hashedPassword
        })
        if(newUser){
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin
                },
                token:generateToken(newUser._id),
            })
        }
        else{
            return res.status(400).json({message:"Invalid user data"});
        }
    }
    catch(err){
        console.error("Registration error:", err);
        return res.status(500).json({message:"Internal server error", details: err.message});
    }
}

const userLogin = async(req,res) =>{
    const {email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).json({message:"Please provide email and password"});
    }
    try{
        const user = await Users.findOne({email});
        if(user && await bcrypt.compare(password,user.password)){
            return res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin
                },
                token:generateToken(user._id)
            });
        }
        return res.status(401).json({message:"Invalid email or password"});
    }
    catch(err){
        console.error("Login error:", err);
        return res.status(500).json({message:"Internal server error", details: err.message});
    }
}

const getUsers = async(req,res) =>{
    try{
        const users = await Users.find().select('-password');
        if(!users || users.length === 0){
            return res.status(404).json({message:"No users found"});
        }
        return res.status(200).json({message:"Users fetched successfully", users});
    }
    catch(err){
        console.error("Error in user fetch all data", err.message);
        return res.status(500).json({message:"Internal server error", details: err.message});
    }
}

const deleteUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const deletedUser = await Users.findByIdAndDelete(id);
        if(!deletedUser){
            return res.status(404).json({message:"User not found to delete"});
        }
        return res.status(200).json({message:"User deleted successfully", user: deletedUser});
    }
    catch(err){
        console.error("Error deleting user", err.message);
        return res.status(500).json({message:"Internal server error", details: err.message});
    }
}

const updateUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = await Users.findById(id);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin ?? user.isAdmin;
        const updatedUser = await user.save();
        return res.status(200).json({message:"User updated successfully", user: updatedUser});
    }
    catch(err){
        console.error("Error updating user", err.message);
        return res.status(500).json({message:"Internal server error", details: err.message});
    }
}

const getOneUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = await Users.findById(id).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        return res.status(200).json({message:"User fetched successfully", user});
    }
    catch(err){
        console.error("Error fetching user", err.message);
        return res.status(500).json({message:"Internal server error", details: err.message});
    }
}

module.exports = {userRegister,userLogin,updateUser,deleteUser,getUsers,getOneUser};