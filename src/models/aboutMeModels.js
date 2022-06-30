const { request } = require('../db/request')

let registro
let registros


//Obtengo el registro
const getAboutMe = async () => {
    registros = await request(`SELECT * FROM aboutMe`)
    return registros
}
//Creo el registro
const createAboutMe = async (path, texto, titulo) => {
    console.log('Modelo', path, texto, titulo)
    registro = await request(`INSERT INTO aboutMe (path, texto, titulo, create_date, update_date) VALUES ("${path}", "${texto}", "${titulo}"), NOW(), NOW()  )`)

    registros = await request(`SELECT * FROM aboutMe`)

    return {
        created: registro.insertId ? true : false,
        registro: [...registro]
    }
}
//Actualizo el registro
//export const updateAboutMe = async () => { }
// //Elimino el registro
// export const deleteAboutMe = async () => {}

module.exports = {
    getAboutMe,
    createAboutMe
}