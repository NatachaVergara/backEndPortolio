const express = require('express');
const router = express.Router();

const {signUpControllers} = require('../controllers/signupController')

router.post('/', signUpControllers )





module.exports = router