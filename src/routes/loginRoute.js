const express = require('express');
const router = express.Router();


const { signInController, signUpControllers } = require('../controllers/loginControllers')

router.get('/', signInController) //signIn
router.post('/', signUpControllers)//signUp


//router.post(`/login`, findUserControllers)


module.exports = router