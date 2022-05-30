const { request } = require('../db/request')

const { hashPassword } = require('../utils/password')

const signUp = async (user, password) => {
    const hasedPassword = hashPassword(password)


    const exist = await request(`SELECT * FROM users WHERE email = ${email}`)
    if (exist.length > 0) {
        return 'El usuario ya existe'
    } else {
        const data = await request(
            `INSERT INTO users(email, password, type)
                VALUES("${user}", "${hasedPassword}", "ADMIN")
            `)

        return {
            id: data.insertId,
            user
        }
    }


}


module.exports = { signUp }