const { request } = require('../db/request')



const findUser = async (email, password, type) => {
    const data = await request(`
    SELECT
        email AS user,
        password
    FROM users 
    WHERE email = "${email}"
    AND type = "${type}" `)

    if (data.length) {
        return {
            user: data[0],
            isUser: true
        }
    } else {
        return { isUser: false }
    }

}






const allUsers = async () => {

    const data = await request(`SELECT * FROM users`)

    return { data }

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