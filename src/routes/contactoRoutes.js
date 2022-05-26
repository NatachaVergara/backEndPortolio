const express = require('express');
const router = express.Router();

const { sendMail } = require('../utils/mail')

router.get('/')
router.post('/', async (req, res) => {
    const { name, email, razon, msg } = req.body
    console.log(name, email, razon, msg)


    try {
        const sended = await (sendMail({ to: email, subject: `${name} - ${email}`, text: msg }))
        return res.send({ sended: true })

    } catch (error) {
        return res.send({ sended: false })
    }
})



module.exports = router