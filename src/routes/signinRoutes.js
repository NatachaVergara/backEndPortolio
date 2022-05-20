const express = require('express');
const router = express.Router();


const { signInController, usersControllers, updateUserController, deleteUserController } = require('../controllers/signinControllers')

router.get('/', usersControllers) //get all users
router.post('/', signInController) //signIn
router.put('/', updateUserController) //update user information
router.delete('/', deleteUserController)//delete user

module.exports = router