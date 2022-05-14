const express = require('express');
const router = express.Router();

const { allProyectsController,
    findProyectController,
    createProyectController,
    updateProyectController,
    deleteProyectController } = require('../controllers/proyectsControles')


router.get('/', allProyectsController)
router.get('/:id', findProyectController)
router.post('/', createProyectController)
//El id va a entrar por el body y no por params
router.put('/', updateProyectController)
router.delete('/', deleteProyectController)



module.exports = router
