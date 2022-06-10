const express = require('express');
const router = express.Router()


const controller = require('../controllers/imgControllers')



router.get('/', controller.imgsController)



router.post('/', controller.upload.single('image'), controller.createImgController )


module.exports = router