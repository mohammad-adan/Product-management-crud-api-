const express = require('express');
const dotenv = require('dotenv');
const mySqlPool = require('./config/database');

//config

dotenv.config();

//rest object
const app = express();
//middleware
app.use(express.json());

app.use('/api/v1/product', require('./routes/productRoutes'));

//routes
app.get("/test",(req,res)=>{
    res.status(200).send('<h1>Welcome</h1>');
});


//port
const PORT = process.env.PORT || 8000;

//slect1 star hone ke liye use hota hai
mySqlPool.query("SELECT 1").then(()=>{
    console.log('MySQL db connected');

    app.listen(PORT, ()=>{
        console.log(`server running on port ${process.env.PORT}`);
    });
}).catch((error)=>{
    console.log(error);
});

//listen


