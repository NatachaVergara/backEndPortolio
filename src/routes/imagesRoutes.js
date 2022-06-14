const express = require('express');
const router = express.Router()
const controller = require('../controllers/imgControllers')


const multer = require('multer');
const upload = multer({ dest: `${__dirname}/imagenes` });

router.get('/', controller.imgsController)
router.post('/', upload.single('image'), controller.createImgController)


module.exports = router



















// const storage = multer.diskStorage({

//   // destination: '',
//   destination: function (req, file, cb) {
//     console.log("Destination: ", file)
//     // cb(null, 'C:/Users/todom/OneDrive/Escritorio/portfolioFullstack/portfolio_back/public/images')
//     // cb(null, path.join(__dirname+'public/images'))

//     let imagesSkills = './public/files'
//     fs.mkdirSync(imagesSkills, { recursive: true })
//     cb(null, imagesSkills)
// },
  
//   filename: function (req, file, cb) {
//     console.log("FileName: ", file)
//     cb(null, `${Date.now()}-${file.originalname}`)
//     // cb(null, `${Date.now()}${path.extname(file.originalname)}`)
//   }
// })