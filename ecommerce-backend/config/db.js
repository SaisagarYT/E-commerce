const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const connectDB = async() =>{
    try{

        const connection = await mongoose.connect(process.env.MONGODB_STRING)
        console.log("Conected to database",connection.connection.host);
    }
    catch(err){
        console.log("There is an error",err)
    }

}

module.exports = connectDB;