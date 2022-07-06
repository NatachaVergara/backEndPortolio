const express = require('express');
const router = express.Router();

const { sendMail } = require('../utils/mail')


router.post('/', async (req, res) => {
    const { name, email, razon, msg } = req.body
    console.log(name, email, razon, msg)
    try {
        const sended = await sendMail({ from: email, subject: `${name} - ${razon} - ${email}`, text: msg })
        return res.status(200).send({ sended })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            sended: false,
            msg: 'Por un error de conexión no se pudo enviar su mensaje'
        })
    }
})



module.exports = router