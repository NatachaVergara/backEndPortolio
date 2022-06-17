const express = require('express');
const router = express.Router();

//Controler
const controller = require('../controllers/proyectsControles')
//Middleware
const upload = require('../middleware/multer')

router.get('/', controller.allProyectsController)
router.get('/:id', controller.findProyectController)
router.post('/', upload.single('image'), controller.createProyectController)
router.put('/:id', upload.single('image'), controller.updateProyectController)
router.delete('/:id', controller.deleteProyectController)



module.exports = router
