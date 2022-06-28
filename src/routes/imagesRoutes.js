const express = require('express');
const router = express.Router()

//Controler
const controller = require('../controllers/imgControllers')
//middleware
const upload = require('../middleware/multer')

router.get('/images', controller.imgsController)
router.get('/images/:path', controller.imgControler)
router.post('/', upload.single('image'), controller.createImgController)
router.put('/:path', upload.single('image'), controller.updateImgController)
router.delete('/:path', controller.deleteImgController)

module.exports = router












