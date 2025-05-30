const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotevn = require('dotenv');
const userRoute = require('./routes/userRoute');
dotevn.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/users',userRoute);

connectDB();

app.get('/',(req,res)=>{
    res.send("API is running...");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`running at http://localhost:${process.env.PORT}`);
})