const express = require('express');
const router = express.Router();


const { loginController, createUserControllers } = require('../controllers/loginControllers')

router.get('/', loginController)
router.post('/', createUserControllers)


//router.post(`/login`, findUserControllers)


module.exports = router