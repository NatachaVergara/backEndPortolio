const { allUsers, findUser, createUser, updateUser, deleteUser } = require('../models/loginModels')


const loginController = async (req, res) => {
    const { user, password } = req.body
    try {
        const users = await findUser(user, password)
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}`)
    }
}



const createUserControllers = async (req, res) => {
    const { user, password } = req.body
    console.log(req.body)
    try {
        const users = await createUser({user, password})
        return res.status(200).send(users)

    } catch (error) {
        return res.status(500).send(`Se produjo un error,   ${error}` )
    }
}


const allUsersControllers = async (req, res) => {
    try {
        const users = await allUsers()
        return res.send(users)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}` )
    }
}





const updateUserController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await updateUser(id)
        return res.send(user)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}` )
    }
}
const deleteUserController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await deleteUser(id)
        return res.send(user)
    } catch (error) {
        return res.status(500).send(`Se produjo un error:   ${error}` )
    }
}



module.exports = { loginController, createUserControllers, deleteUserController, updateUserController, allUsersControllers }