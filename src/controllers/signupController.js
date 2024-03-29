const { signUp } = require('../models/signupModels')


const signUpControllers = async (req, res) => {
    const { email, password, type, nombre, apellido } = req.body
    console.log(req.body)
    try {
        const users = await signUp(email, password, type, nombre, apellido)
        if(users.id){
            return res.status(201).send(users)
        }else{
            return res.status(304)
        }

    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}`)
    }
}
module.exports = { signUpControllers }