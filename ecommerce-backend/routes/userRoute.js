const express = require('express');
const {userRegister, userLogin}= require('../controllers/usercontroller');
const { protect } = require('../middleware/authMiddleware');

const route = express.Router();

route.post('/register',userRegister);
route.post('/login',userLogin);
route.get('/profile', protect,async(req,res)=>{
    res.status(200).json(req.user);
})

module.exports = route;

