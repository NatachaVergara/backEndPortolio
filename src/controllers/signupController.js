const {signUp} = require('../models/signupModels')


const signUpControllers = async (req, res) => {
    const { user, password } = req.body
    console.log(req.body)
    try {
        const users = await signUp( user, password )
        return res.status(201).send(users)

    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}`)
    }
}
module.exports = { signUpControllers}