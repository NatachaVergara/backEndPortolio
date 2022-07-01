const { request } = require('../db/request')

let registro
let registros

const getImgs = async () => {
    registros = await request(`SELECT * FROM  skill_img`)
    return registros

}

const createImg = async (file) => {
    console.log(`Modelo: ${file}`)

    registro = await request(`
        INSERT INTO skill_img(path , upload_date)
        VALUES ('${file}', NOW()) `)

    registros = await request(`SELECT * FROM  skill_img`)


    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        message: created ? 'Se ha creado el registro' : 'No se ha creado el registro'
    }

}


const updateImg = async (oldPath, newPath) => {
    console.log('oldPath', oldPath, 'newPath', newPath)


    registro = await request(`UPDATE skill_img SET  path = "${newPath}", upload_date = NOW() WHERE path = "${oldPath}"`)
    registros = await request(`SELECT * FROM  skill_img`)

    return {
        update: registro.affectedRows ? true : false,
        registros: [...registros],
        message: created ? 'Se ha actualizado' : 'No se pudo actualizar'
    }



}


const deleteImg = async (path) => {
    registro = await request(`DELETE FROM skill_img WHERE path = "${path}" `)
    registros = await request(`SELECT * FROM skill_img`)

    return {
        deleted: registro.affectedRows ? true : false,
        registros: [...registros],
        message: deleted ? 'Se eliminado exitosamente' : 'No se pudo eliminar'
    }
}


module.exports = {
    getImgs,
    createImg,
    updateImg,
    deleteImg
}