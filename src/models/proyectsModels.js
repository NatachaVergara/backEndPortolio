const { request } = require('../db/request')




const allProyects = async () => {
    let registros = await request(`SELECT * FROM proyects`)
    return registros
}

// const findProyect = async (id) => {
//     registros = await request(`SELECT * FROM proyects WHERE id = ${id}`)

//     return {
//         registros: registros[0] ? true : false,
//         registros: registros ? registros : []
//     }
// }

const createProyect = async (title, link, logo, img, tec) => {
    console.log(img)
    let registro = await request(
        `INSERT INTO proyects(title, link, logo, img, tec )
        VALUES("${title}","${link}", "${logo}","${img}", "${tec}")`
    )
    let registros = await request(`SELECT * FROM proyects`)

    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        message: 'Se ha creado el registro'
    }
}

const updateProyect = async (id, title, link, logo, img, tec) => {
    console.log('update modelo', id, title, link, logo, img, tec)

    let registro = await request(
        `UPDATE proyects SET title = "${title}",
        link = "${link}",
        logo = "${logo}",
        img = "${img}",
        tec = "${tec}"
        WHERE id = ${id}    
    `)
    let registros = await request(`SELECT * FROM proyects`)

    return {
        updated: registro.affectedRows ? true : false,
        registros: [...registros],
        message: 'Se ha actualizado el registro'
    }

}

const deleteProyect = async (path) => {
    let registro = await request(` DELETE FROM proyects WHERE img = "${path}" `)
    let registros = await request(`SELECT * FROM proyects`)

    return {
        deleted: registro.affectedRows ? true : false,
        registros: [...registros],
        message: 'Se ha eliminado el registro'
    }
}

module.exports = {
    allProyects,
    // findProyect,
    createProyect,
    updateProyect,
    deleteProyect
}