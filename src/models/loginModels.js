const { request } = require('../db/request')

const {hashPassword, comparePassword} = require('../utils/password')


const signIn = async (user, password) => {
    const data = await request(`
    SELECT
        email AS user,
        password
    FROM users 
    WHERE email = "${user}"
    AND type = "ADMIN" `)

    if (data.length && comparePassword(password, data[0].password)) {
        delete data[0].password
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


const signUp = async ({user, password}) => {
    const hasedPassword = hashPassword(password)
    const data = await request(
        `INSERT INTO users(email, password, type)
            VALUES("${user}", "${hasedPassword}", "ADMIN")
        `)

    return {
        id: data.insertId,
        user
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
    signIn,
    signUp,
    updateUser,
    deleteUser

}