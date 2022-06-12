const express = require('express');
const router = express.Router()
const controller = require('../controllers/imgControllers')
const path = require("path");
// const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination: ", file)
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    console.log("File name: ", file)
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});
const upload = multer({ storage: storage })

router.post('/', upload.single('image'), controller.createImgController)




router.get('/', controller.imgsController)






module.exports = router