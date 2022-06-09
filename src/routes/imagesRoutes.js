const express = require('express');
const router = express.Router()
// const multer  = require('multer')
// const upload = multer({ dest: '../../public/images' })
// console.log(upload)
// const prueba = require('../../public/images')
const {upload} = require('../middlewares/imagesUpload')
const {createImgController, imgsController} = require('../controllers/imgControllers')


router.get('/', imgsController)
//router.get('/:id')

router.post('/', upload.single('images'), createImgController )


module.exports = router