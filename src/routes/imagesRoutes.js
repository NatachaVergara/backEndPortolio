const express = require('express');
const router = express.Router()
const controller = require('../controllers/imgControllers')

const {upload} = require('../utils/s3')



router.get('/images', controller.imgsController)
router.get('/images/:key', controller.imgControler)
router.post('/', upload.single('image'), controller.createImgController)
router.delete('/:key', controller.deleteImgController)

module.exports = router












