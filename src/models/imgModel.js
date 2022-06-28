const { request } = require('../db/request')

const getImgs = async () => {
    const imgs = await request(`SELECT * FROM  skill_img`)
    return {
        imgs,
        cantRegistros: imgs.length,
    }
}

const createImg = async (file) => {
    console.log(`Modelo: ${file}`)

    const img = await request(`
        INSERT INTO skill_img(path , upload_date)
        VALUES ('${file}', NOW()) `)

    const imagenes = await request(`SELECT * FROM  skill_img`)


    return {
        id: img.insertId ? true : false,
        imagenes: [...imagenes],
        message: `Nueva agregada satisfactoriamente`
    }

}


const updateImg = async (oldPath, newPath) => {
    console.log('old', oldPath, 'new', newPath)

    const img = await request(`UPDATE skill_img SET  path = "${newPath}", upload_date = NOW() WHERE path =" ${oldPath}"`)
    const imagenes = await request(`SELECT * FROM  skill_img`)

    return {
        update: img.affectedRows ? true : false,
        imagenes: [...imagenes],
        message: `Imagen actualizada satisfactoriamente`
    }
}


const deleteImg = async (path) => {
    const img = await request(`DELETE FROM skill_img WHERE path = "${path}" `)
    const imagenes = await request(`SELECT * FROM skill_img`)

    return {
        imagenes: [...imagenes],
        deleted: img.affectedRows ? true : false,
        message: "Imagen eliminada satisfactoriamente"
    }
}


module.exports = {
    getImgs,
    createImg,
    updateImg,
    deleteImg
}