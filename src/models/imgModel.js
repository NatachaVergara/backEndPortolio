const { request } = require('../db/request')



const getImgs = async () => {
    let registros = await request(`SELECT * FROM  skill_img`)
    return registros

}

const createImg = async (file) => {
    console.log(`Modelo: ${file}`)

    let registro = await request(`
        INSERT INTO skill_img(path , upload_date)
        VALUES ('${file}', NOW()) `)

        let registros = await request(`SELECT * FROM  skill_img`)


    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        message: 'Se ha creado el registro'
    }

}


const updateImg = async (oldPath, newPath) => {
    console.log('oldPath', oldPath, 'newPath', newPath)


    let registro = await request(`UPDATE skill_img SET  path = "${newPath}", upload_date = NOW() WHERE path = "${oldPath}"`)
    let registros = await request(`SELECT * FROM  skill_img`)

    return {
        updated: registro.affectedRows ? true : false,
        registros: [...registros],
        message:'Se ha actualizado'
    }



}


const deleteImg = async (path) => {
    let registro = await request(`DELETE FROM skill_img WHERE path = "${path}" `)
    let registros = await request(`SELECT * FROM skill_img`)

    return {
        deleted: registro.affectedRows ? true : false,
        registros: [...registros],
        message: 'Se eliminado exitosamente'
    }
}


module.exports = {
    getImgs,
    createImg,
    updateImg,
    deleteImg
}