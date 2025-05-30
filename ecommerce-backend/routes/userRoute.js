const express = require('express');
const {userRegister, userLogin}= require('../controllers/usercontroller')

const route = express.Router();

route.post('/register',userRegister);
route.post('/login',userLogin);

module.exports = route;

