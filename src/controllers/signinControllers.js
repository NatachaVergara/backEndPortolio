const { allUsers, signIn, updateUser, deleteUser } = require('../models/signinModels')

const {generateCookieDaysDurationInMin} = require('../utils/cookieTime')
const {createToken} = require('../utils/token')

const signInController = async (req, res) => {
    const { email, password, type } = req.body
    
    try {
        const user = await signIn(email, password, type)
        console.log(user)
        if (user.isUser) {
            res.cookie("session", createToken(user),{
                maxAge: generateCookieDaysDurationInMin(3) //3 dias conectado
            })
            return res.status(201).send(user)
        } else {
            return res.status(401).send(user.message)
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
    const { email, password } = req.body
    try {
        const user = await updateUser(id, email, password)
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