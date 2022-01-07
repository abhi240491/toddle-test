const express = require('express');
const router = express.Router();
const {signupValidator,validatorResult} = require('../middleware/validator');
const {singupController} = require('../controller/authController');

router.post('/signup',signupValidator,validatorResult,singupController);

module.exports = router;