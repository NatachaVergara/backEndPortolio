const express = require('express');
const router = express.Router()
const controller = require('../controllers/imgControllers')

const path = require("path");
const fs = require('fs');
const multer = require('multer');
// const upload = multer({ dest: 'public/images/' })
// fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}${path.extname(file.originalname)}` )
    }
  })
  
  const upload = multer({ storage: storage })





router.get('/', controller.imgsController)



router.post('/', upload.single('image'), controller.createImgController )


module.exports = router