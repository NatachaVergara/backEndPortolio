const { allUsers, signIn, updateUser, deleteUser } = require('../models/signinModels')

const {generateCookieDaysDurationInMin} = require('../utils/cookieTime')
const {createToken} = require('../utils/token')

const signInController = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await signIn(email, password)
        if (user) {
            res.cookie("session", createToken(user),{
                maxAge: generateCookieDaysDurationInMin(3) //3 dias conectado
            })
            return res.status(200).send(user)
        } else {
            return res.status(401).send('No se encontro el usuario. Revise la información ingresada')
        }
    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}`)
    }
}





const usersControllers = async (req, res) => {
    try {
        const users = await allUsers()
        return res.send(users)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}`)
    }
}


const updateUserController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await updateUser(id)
        return res.send(user)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}`)
    }
}
const deleteUserController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await deleteUser(id)
        return res.send(user)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}`)
    }
}



module.exports = { signInController, deleteUserController, updateUserController, usersControllers }