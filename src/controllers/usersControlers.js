const {
    allUsers,
    findUser,
    createUser,
    updateUser,
    deleteUser } = require('../models/usersModels')

const allUsersControllers = async (req,res) => {
    try {
        const users = await allUsers()
        return res.send(users)
    } catch (error) {
        console.log(error)
    }
}

const findUserControllers = async (req,res) => {
    const {email} = req.params
    try {
        const user = await findUser(email)
        return res.send(user)
    } catch (error) {
        console.log(error)
    }
}


const createUserControllers = async (req,res) => {
    const {email, password} = req.params
    try {
        const users = await createUser(email, password)
        return res.send(users)
    } catch (error) {
        console.log(error)
    }
}


const updateUserController = async (req,res) => {
    const {id} = req.params
    try {
        const user = await updateUser(id)
        return res.send(user)
    } catch (error) {
        
    }
}
const deleteUserController = async (req,res) => {
    const {id} = req.params
    try {
        const user = await deleteUser(id)
        return res.send(user)
    } catch (error) {
        
    }
}



module.exports = {
    allUsersControllers,
    findUserControllers,
    createUserControllers,
    updateUserController,
    deleteUserController
}