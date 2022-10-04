const { request } = require('../db/request')





//Obtengo el registro
const getAboutMe = async () => {
    registros = await request(`SELECT * FROM aboutme`)
    return registros
}
//Creo el registro
const createAboutMe = async (path, texto, titulo) => {
    console.log('Modelo', path, texto, titulo)
    let registro = await request(`INSERT INTO aboutme (path, texto, titulo, create_date, update_date) VALUES ("${path}", "${texto}", "${titulo}", NOW(), NOW())`)

    let registros = await request(`SELECT * FROM aboutMe`)

    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        message: 'Se ha creado el registro' 
    }
}
//Actualizo el registro
const updateAboutMe = async (oldPath, newPath, texto, titulo) => {
    console.log('Modelo Update: ', oldPath, newPath, texto, titulo)

    let registro = await request(`
    UPDATE aboutme SET 
    path = "${newPath}",
    texto = "${texto}",
    titulo = "${titulo}",
    update_date = NOW()
    WHERE path = "${oldPath}"    
    `)
    let registros = await request(`SELECT * FROM aboutMe`)

    return {
        updated: registro.affectedRows ? true : false,
        registros: [...registros],
        message:'Se ha actualizado'
    }
}
// //Elimino el registro
const deleteAboutMe = async (path) => {

    let registro = await request(`DELETE FROM aboutme WHERE path = "${path}" `)
    let registros = await request(`SELECT * FROM aboutme`)

    return {
        deleted: registro.affectedRows ? true : false,
        registros: [...registros],
        message: 'Se eliminado exitosamente'
    }

}

module.exports = {
    getAboutMe,
    createAboutMe,
    updateAboutMe,
    deleteAboutMe
}