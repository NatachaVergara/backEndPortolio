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
router.put('/:id', updateProyectController)
router.delete('/:id', deleteProyectController)



module.exports = router
