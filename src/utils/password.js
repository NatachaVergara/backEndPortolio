const bcrypt = require('bcrypt');


const hashPassword = (password) => {
    return bcrypt.hashSync(password, 18)
}


const comparePassword = (passwordToCompare, hashedPassword) => {
    return bcrypt.compareSync(passwordToCompare, hashedPassword)
}


module.exports = {
    hashPassword,
    comparePassword
}