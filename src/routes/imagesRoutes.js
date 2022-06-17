const express = require('express');
const router = express.Router()
const controller = require('../controllers/imgControllers')


// const multer = require('multer');
// const upload = multer({ dest: 'skilImg/' });

const upload = require('../middleware/multer')

router.get('/images', controller.imgsController)
router.get('/images/:path', controller.imgControler)
router.post('/', upload.single('image'), controller.createImgController)
router.delete('/:path', controller.deleteImgController)

module.exports = router












