const express = require('express');
const router = express.Router();


const { signInController, usersControllers, updateUserController, deleteUserController } = require('../controllers/signinControllers')

router.get('/', usersControllers) //get all users
router.post('/', signInController) //signIn
router.put('/:id', updateUserController) //update user information
router.delete('/:id', deleteUserController)//delete user

module.exports = router