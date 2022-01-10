const express = require('express');
const router = express.Router();
const {authenticateJWT} = require('../middleware/authenticator');
const assignment = require('../controller/assignmentController');

router.post('/',authenticateJWT,assignment.create);
router.get('/', assignment.readAll);
router.put('/:assignmentId',authenticateJWT,assignment.update);
router.delete('/:assignmentId',authenticateJWT, assignment.delete); 

module.exports = router;