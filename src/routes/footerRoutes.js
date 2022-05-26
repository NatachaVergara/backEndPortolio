const express = require('express');
const router = express.Router()
const {allControllers, linkController, linkUpdateController, linkDeleteController} = require('../controllers/footerControllers')


router.get('/', allControllers)
router.get('/:id', linkController)
router.put('/:id', linkUpdateController)
router.delete('/:id', linkDeleteController)






module.exports = router