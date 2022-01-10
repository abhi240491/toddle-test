const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://toddle-test:testing123@toddletest.njf6g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );
    console.log('Database Connection Success');
    }
    catch{
        console.log(err);
    }
}

module.exports = connectDB;
