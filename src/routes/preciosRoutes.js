const express = require('express')
const router = express.Router()

const controller = require('../controllers/preciosControllers')

router.get('/', controller.getPrecios)
router.post('/', controller.createPrecio)
router.put('/:id', controller.updatePrecio)
router.delete('/:id', controller.deletePrecio)

module.exports = router