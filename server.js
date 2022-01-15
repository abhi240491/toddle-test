const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const assignRoutes = require('./routes/assignRoutes');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Authentication
app.use('/api/auth',authRoutes);
app.use('/api/assignment',assignRoutes);

//questionaire 
//(tutor create, read, update and delete questions)
//description,list of students, publishing(ongoing/scheduled) and deadline date.

//(student)
//(read,add submission*only once)
//submission- remark(text)
//submitted or not


const connectDB = require('./database/db');

connectDB();



const port = process.env.PORT || 5000;

app.listen(port, ()=> {console.log("Listening to port number 5000")});