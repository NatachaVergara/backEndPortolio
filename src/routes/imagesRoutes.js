const express = require('express');
const router = express.Router()

const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })
fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
const controller = require('../controllers/imgControllers')



router.get('/', controller.imgsController)



router.post('/', upload.single('image'), controller.createImgController )


module.exports = router