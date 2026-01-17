const mongoose=require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To MongoDB ${mongoose.connection.host}`.bgGreen.white)
    }catch(error){
        console.log(`MongoDB Error ${error}`)
    }
    
}

module.exports = connectDB;