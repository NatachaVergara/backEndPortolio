const { request } = require('../db/request')

const hashPassword = require('../utils/password')


const findUser = async (user, password, type) => {
    const data = await request(`
    SELECT
        email AS user,
        password
    FROM users 
    WHERE email = "${user}"
    AND type = "${type}" `)

    if (data.length) {
        return {
            user: data[0],
            isUser: true
        }
    } else {
        return {
            isUser: false
        }
    }

}


const createUser = async (user, password, type) => {
    const hasedPassword = hashPassword(password)
    const data = await request(
        `INSERT INTO users(email, password, type)
            VALUES("${user}", "${hasedPassword}", "${type}")
        `)

    return {
        id: data.insertId,
        user,
        message: `New user created`
    }
}





const allUsers = async () => {

    const data = await request(`SELECT * FROM users`)

    return { data }

}


const updateUser = async ({ id, email, password }) => {

    const data = await request(
        `UPDATE users
            SET email = ${email}
            password = ${password}
            WHERE email =${id}`
    )

    return {
        data,
        update: data.affectedRows ? true : false

    }
}

const deleteUser = async (id) => {

    const data = await request(
        `DELETE FROM users 
            WHERE id = ${id}`
    )

    return {
        id,
        deleted: data.affectedRows ? true : false
    }
}


module.exports = {
    allUsers,
    findUser,
    createUser,
    updateUser,
    deleteUser

}