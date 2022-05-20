const { allUsers, signIn, signUp, updateUser, deleteUser } = require('../models/loginModels')


const signInController = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await signIn(email, password)
        if (user.existUser) {
            res.cookie("session", user)
            return res.status(200).send(user)
        } else {
            return res.status(200).send(user)
        }
    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}`)
    }
}



const signUpControllers = async (req, res) => {
    const { user, password } = req.body
    console.log(req.body)
    try {
        const users = await signUp({ user, password })
        return res.status(200).send(users)

    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}`)
    }
}


const allUsersControllers = async (req, res) => {
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



module.exports = { signInController, signUpControllers, deleteUserController, updateUserController, allUsersControllers }