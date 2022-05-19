const express = require('express');
const router = express.Router();


const { loginController } = require('../controllers/loginControllers')

router.get('/', loginController)

//router.post(`/login`, findUserControllers)


module.exports = router