require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const colors= require('colors');
const cors=require('cors');
const connectDB = require('./config/db');

//.env config


// rest object
const app=express();

//DB CONNECTION
connectDB();

//Port
const PORT=process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


//routes
app.use('/api/v1/user',require("./routes/userRoute"));
app.use('/api/v1/todo',require("./routes/todoRoute"))
app.use('/api/v1/test',require("./routes/testRouter"));
// app.get('/test',(req,res)=>{
//     res.status(200).send('<h1> Welcome To Node Server World </h1>');
// })

//listen
app.listen(PORT,()=>{
    console.log(`Node Server Running on ${process.env.DEV_MODE} mode on Port no. : ${PORT}`.bgMagenta);
})

