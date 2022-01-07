const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Authentication
//signup
app.use('/api/auth',authRoutes);
//signin





const port = process.env.PORT || 5000;

app.listen(port, ()=> {console.log("Listening to port number 5000")});