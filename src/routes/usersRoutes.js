const express = require('express');
const router = express.Router();


const { allUsersControllers,
    findUserControllers,
    createUserControllers,
    updateUserController,
    deleteUserController } = require('../controllers/usersControlers')

router.get('/', allUsersControllers)
router.post(`/login`, findUserControllers)


module.exports = router