const express = require('express');
const router = express.Router();

//Controler
const controller = require('../controllers/proyectsControles')
//Middleware
const upload = require('../middleware/multer')

router.get('/', controller.allProyectsController)
router.get('/:path', controller.proyectImgControler)
router.post('/', upload.single('image'), controller.createProyectController)
//router.put('/:id', upload.single('image'), controller.updateProyectController)
//router.delete('/:path', controller.deleteProyectController)



module.exports = router
