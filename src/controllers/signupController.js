const {signUp} = require('../models/signupModels')


const signUpControllers = async (req, res) => {
    const { email, password, type } = req.body
    console.log(req.body)
    try {
        const users = await signUp( email, password, type )
        return res.status(201).send(users)

    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}`)
    }
}
module.exports = { signUpControllers}