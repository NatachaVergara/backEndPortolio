const express = require('express');
const router = express.Router()

const {upload} = require('../middlewares/imagesUpload')
const {createImgController} = require('../controllers/imgControllers')


router.get('/')
//router.get('/:id')

router.post('/upload', upload.array('images', 2) , createImgController )





module.exports = router