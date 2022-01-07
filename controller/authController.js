//authorising signup and signin
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.singupController = async(req,res) => {
    console.log(req.body);
    const {username,email,password} = req.body;
    try{
        const user = await User.findeOne({email:email});
        if(user){
            return res.status(400).json({errorServerMsg: "Email already exists"})
        }

        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt);

        await newUser.save();

        res.json({successServerMsg: 'Registration successful, Please signin'})
    }
    catch(err){
        console.log("Error in signup controller:",err);
        res.status(500).json({errorServerMsg: 'Server Error'})
    }
}