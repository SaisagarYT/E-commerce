const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id},process.env.SECRET,{expiresIn:'10d'});
};

module.exports = generateToken;