const express = require('express');
const router = express.Router()

const controller = require('../controllers/imgControllers')


const path = require("path");
// const fs = require('fs');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination: ", file)
    cb(null, path.join(__dirname+'public/images'))
  },
  filename: function (req, file, cb) {
    console.log("File name: ", file)
    cb(null, `${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage })
console.log(upload)
router.get('/', controller.imgsController)
router.post('/upload', upload.single('image'), controller.createImgController)











module.exports = router