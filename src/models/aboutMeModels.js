const { request } = require('../db/request')

let registro
let registros


//Obtengo el registro
const getAboutMe = async () => {
    registros = await request(`SELECT * FROM aboutMe`)
    return registros
}
//Creo el registro
//export const createAboutMe = async () => { }
//Actualizo el registro
//export const updateAboutMe = async () => { }
// //Elimino el registro
// export const deleteAboutMe = async () => {}

module.exports = {
    getAboutMe
}