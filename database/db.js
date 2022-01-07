const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect('mongodb+srv://abhishek:toddle-test@123@toddle.wcnp8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
            userNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection established');
    }
    catch(err){
        consoe.log("Error couldn't connect with Database",err);
    }
};

module.exports = connectDB;