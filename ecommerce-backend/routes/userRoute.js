const express = require('express');
const {userRegister, userLogin,getUsers,updateUser,deleteUser}= require('../controllers/usercontroller');
const { protect, admin } = require('../middleware/authMiddleware');

const route = express.Router();

route.post('/register',userRegister);
route.post('/login',userLogin);
route.get('/profile', protect,async(req,res)=>{
    res.status(200).json(req.user);
})
route.get('/',protect,admin,getUsers);
route.put('/:id',protect,admin,updateUser);
route.delete('/:id',protect,admin,deleteUser);
module.exports = route;

