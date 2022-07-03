const { request } = require('../db/request')

let registro
let registros

const allProyects = async () => {
    registros = await request(`SELECT * FROM proyects`)
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
    registro = await request(
        `INSERT INTO proyects(title, link, logo, img, tec )
        VALUES("${title}","${link}", "${logo}","${img}", "${tec}")`
    )
    registros = await request(`SELECT * FROM proyects`)

    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        message: 'Se ha creado el registro'
    }
}

const updateProyect = async (id, title, link, logo, img, tec) => {
    console.log('update modelo', id, title, link, logo, img, tec)

    registro = await request(
        `UPDATE proyects SET title = "${title}",
        link = "${link}",
        logo = "${logo}",
        img = "${img}",
        tec = "${tec}"
        WHERE id = ${id}    
    `)
    registros = await request(`SELECT * FROM proyects`)

    return {
        updated: registro.affectedRows ? true : false,
        registros: [...registros],
        message: 'Se ha actualizado el registro'
    }

}

const deleteProyect = async (path) => {
    registro = await request(` DELETE FROM proyects WHERE img = "${path}" `)
    registros = await request(`SELECT * FROM proyects`)

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