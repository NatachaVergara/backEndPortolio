const express = require('express');
const router = express.Router()
const controller = require('../controllers/imgControllers')


const multer = require('multer');
const upload = multer({ dest: 'skilImg/' });

router.get('/images', controller.imgsController)
router.get('/images/:key', controller.imgControler)
router.post('/', upload.single('image'), controller.createImgController)
router.delete('/:id', controller.deleteImg)

module.exports = router












