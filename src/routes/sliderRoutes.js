const express = require('express')
const router = express.Router()

const controller = require('../controllers/sliderControllers')
const upload = require('../middleware/multer')

//Ruta para obtener todas las imagenes de mi DB
router.get('/sliders', controller.getSlidersController)

//Ruta para obtener 1 imagen segun su path, llama directamente al storage no pasa por mi db
router.get('/slider/:path', controller.getSliderController)

//Ruta para crear el slider en mi DB y en el storage
router.post('/sliders', upload.single('image'), controller.createSliderController)

//Ruta para actualizar la imagen en mi DB y en el storage
router.put('/slider/:path', upload.single('image'), controller.updateSlidercontroller)

//Ruta para eliminar una slider de mi DB y del storage
router.delete('/slider/:path', controller.deleteSlidercontroller)


module.exports = router