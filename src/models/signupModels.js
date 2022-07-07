const { request } = require('../db/request')

const { hashPassword } = require('../utils/password')

const signUp = async (email, password, type, nombre, apellido) => {
    const existe = await request(`SELECT * FROM users WHERE email = '${email}'`)

    if (existe.length !== 0) {
        return 'Ese usuario ya existe'
    } else {
        const hasedPassword = hashPassword(password)
        const data = await request(
            `INSERT INTO users(email, password, type, nombre, apellido, createdDate, updateDate )
                VALUES("${email}", "${hasedPassword}", "${type}", "${nombre}", "${apellido}", NOW(), NOW())
            `)

        return {
            id: data.insertId,
            data
        }
    }


}


module.exports = { signUp }