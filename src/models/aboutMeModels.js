const { request } = require('../db/request')

let registro
let registros


//Obtengo el registro
const getAboutMe = async () => {
    registros = await request(`SELECT * FROM aboutMe`)
    return { registros: [...registros] }
}
//Creo el registro
const createAboutMe = async (path, texto, titulo) => {
    console.log('Modelo', path, texto, titulo)
    registro = await request(`INSERT INTO aboutMe (path, texto, titulo, create_date, update_date) VALUES ("${path}", "${texto}", "${titulo}", NOW(), NOW())`)

    registros = await request(`SELECT * FROM aboutMe`)

    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        message: created ? 'Se ha creado el registro' : 'No se ha creado el registro'
    }
}
//Actualizo el registro
const updateAboutMe = async (oldPath, newPath, texto, titulo) => {
    console.log('Modelo Update: ', oldPath, newPath, texto, titulo)

    registro = await request(`
    UPDATE aboutMe SET 
    path = "${newPath}",
    texto = "${texto}",
    titulo = "${titulo}",
    update_date = NOW()
    WHERE path = "${oldPath}"    
    `)
    registros = await request(`SELECT * FROM aboutMe`)

    return {
        update: registro.affectedRows ? true : false,
        registros: [...registros],
        message: created ? 'Se ha actualizado' : 'No se pudo actualizar'
    }
}
// //Elimino el registro
const deleteAboutMe = async (path) => {

    registro = await request(`DELETE FROM aboutMe WHERE path = "${path}" `)
    registros = await request(`SELECT * FROM aboutMe`)

    return {
        deleted: registro.affectedRows ? true : false,
        registros: [...registros],
        message: deleted ? 'Se eliminado exitosamente' : 'No se pudo eliminar'
    }

}

module.exports = {
    getAboutMe,
    createAboutMe,
    updateAboutMe,
    deleteAboutMe
}