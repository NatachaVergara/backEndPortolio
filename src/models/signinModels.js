const { request } = require('../db/request')

const { comparePassword } = require('../utils/password')


const signIn = async (email, password) => {
    const data = await request(`
    SELECT
        email,
        password,
        id,
        type,
        nombre,
        apellido
    FROM users 
    WHERE email = "${email}" `)

    if (data.length && comparePassword(password, data[0].password)) {
        delete data[0].password
        return {
            user: data[0],
            userType: data[0].type,
            isUser: true
        }
    } else {
        return {
            message: 'Usuario no encontrado. ¿El email o password son correctos?',
            isUser: false
        }
    }

}


const allUsers = async () => {
    const data = await request(`SELECT * FROM users`)
    return { data }
}


const updateUser = async (id, email, nombre, apellido) => {
console.log(id, email, nombre, apellido)
    const data = await request(
        `UPDATE users
            SET email = "${email}",            
            nombre = "${nombre}",
            apellido = "${apellido}", 
            updateDate = NOW()
            
            WHERE email = ${id}`
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
    updateUser,
    deleteUser

}