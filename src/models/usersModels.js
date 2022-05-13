const { request } = require('../db/request')


const allUsers = async () => {

    const data = await request(`SELECT * FROM users`)

    return { data }

}
const findUser = async (email) => {
    const data = await request(`SELECT FROM users WHERE email = ${email}`)
    return data[0]
}



const createUser = async ({ email, password }) => {

    const data = await request(
        `INSERT INTO users(email, password)
            VALUES('${email}', '${password}');        `
    )

    return {
        id: data.insertId,
        data,
        message: `New user created`
    }
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