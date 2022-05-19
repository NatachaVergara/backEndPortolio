const { allUsers, findUser, createUser, updateUser, deleteUser } = require('../models/loginModels')


const loginController = async (req, res) => {
    const { email, password } = req.params
    try {
        const user = await findUser(email, password)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(`Se produjo un error`)
    }
}






// const allUsersControllers = async (req, res) => {
//     try {
//         const users = await allUsers()
//         return res.send(users)
//     } catch (error) {
//         console.log(error)
//     }
// }


// const createUserControllers = async (req, res) => {
//     const { email, password } = req.params
//     try {
//         const users = await createUser(email, password)
//         return res.send(users)
//     } catch (error) {
//         console.log(error)
//     }
// }


// const updateUserController = async (req, res) => {
//     const { id } = req.params
//     try {
//         const user = await updateUser(id)
//         return res.send(user)
//     } catch (error) {

//     }
// }
// const deleteUserController = async (req, res) => {
//     const { id } = req.params
//     try {
//         const user = await deleteUser(id)
//         return res.send(user)
//     } catch (error) {

//     }
// }



module.exports = { loginController }