const express = require('express');
const router = express.Router()
const controller = require('../controllers/imgControllers')


const path = require("path");
// const fs = require('fs');

const multer = require('multer');
upload = multer({ dest: "./public/images" });

// const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   console.log("Destination: ", file)
//   //   cb(null, 'C:/Users/todom/OneDrive/Escritorio/portfolioFullstack/portfolio_back/public/images')
//   //   cb(null, 'public/images')
//   //   cb(null, path.join(__dirname+'public/images'))
//   // },
//   filename: function (req, file, cb) {  
//     console.log("FileName: ", file)
//     cb(null, `${Date.now()}-${file.originalname}`)
//       // cb(null, `${Date.now()}${path.extname(file.originalname)}`)
//   }
// })

// const upload = multer({ storage: storage })

router.get('/', controller.imgsController)
router.post('/', upload.single('image'), controller.createImgController)











module.exports = router