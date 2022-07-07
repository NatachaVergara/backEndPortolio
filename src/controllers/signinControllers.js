const { allUsers, signIn, updateUser, deleteUser } = require('../models/signinModels')

const { generateCookieDaysDurationInMin } = require('../utils/cookieTime')
const { createToken } = require('../utils/token')

const signInController = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await signIn(email, password)
        console.log(user)
        if (user.isUser) {
            res.cookie("session", createToken(user), {
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
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}`)
    }
}


const updateUserController = async (req, res) => {
    const { id } = req.params
    const { email, nombre, apellido } = req.body
    console.log(id, email, nombre, apellido)

    try {
        const user = await updateUser(id, email, nombre, apellido)
        if (user.update) {
            return res.status(200).send(user)
        } else {
            return res.status(304).send(user)
        }  


    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}`)
    }
}
const deleteUserController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await deleteUser(id)
        if(user.deleted){
            return res.status(200).send(user)
        }else{
            return res.status(304).send(user)
        }

        return res.send(user)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}`)
    }
}



module.exports = { signInController, deleteUserController, updateUserController, usersControllers }