const { request } = require('../db/request')




const getImgs = async () => {
    const imgs = await request(`SELECT * FROM  skill_img`)
    return {
        imgs,
        cantRegistros: imgs.length,
    }
}


// const getImgId = async (id) => {
//     const img = await request(`SELECT * FROM  skill_img WHERE id = ${id}`)
//     return img[0]
// }

const createImg = async (files) => {
    const img = await request(`
        INSERT INTO skill_img(path , upload_date)
        VALUES ${files.map(file => `( '${file.path}', NOW())`).toString()}
    `)

    const allImgs = await request(`SELECT * FROM  skill_img`)


    return {
        id: img.insertId ? true : false,
        allImgs: [...allImgs],
        message: `Nueva agregada satisfactoriamente`
    }

}



const deleteImg = async (id) => {
    const img = await request(`DELETE FROM skill_img WHERE id = ${id} `)
    const allImgs = await request(`SELECT * FROM skill_img`)

    return {
        id,
        allImgs: [...allImgs],
        deleted: img.affectedRows ? true : false,
        message: "Imagen eliminada satisfactoriamente"
    }



}


module.exports = {
    getImgs,
    // getImgId,
    createImg,
    deleteImg
}