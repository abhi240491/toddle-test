const express = require('express');
const router = express.Router();
const {authenticateJWT} = require('../middleware/authenticator');
const submissionController = require('../controller/submissionController');


router.get('/', submissionController.readAll);
router.put('/',authenticateJWT,submissionController.update);
//router.get('/:productId', submissionController.read);

module.exports = router;