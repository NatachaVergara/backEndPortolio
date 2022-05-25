const express = require('express');
const router = express.Router();



router.get('/')
router.post('/', (req, res) => {
    const { name, email, razon, msg } = req.body
    console.log(name, email, razon, msg)

    return res.send({ sended: true })

})



module.exports = router