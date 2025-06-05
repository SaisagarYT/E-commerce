const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotevn = require('dotenv');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoutes');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoutes');
dotevn.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use('/api/users',userRoute);
app.use('/api/products',productRoute);
app.use('/api/orders',orderRoute);
app.use('/api/cart',cartRoute);
app.get('/',(req,res)=>{
    res.send("API is running...");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`running at http://localhost:${process.env.PORT}`);
})