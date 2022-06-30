const express = require('express');
const router = express.Router();

const controller = require('../controllers/aboutMeControllers')

const upload = require('../middleware/multer')


router.get('/', controller.getAboutMeController)
// router.get('/:path', controller.getAboutMeImgController)
// router.post('/', upload.single('image'), controller.createAboutMeController)
// router.put('/:path', upload.single('image'), controller.updateAboutMeController)
// router.delete('/:path', controller.deleteAboutMeController)



module.exports = router