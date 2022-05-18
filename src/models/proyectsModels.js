const { request } = require('../db/request')

const allProyects = async () => {
    const data = await request(`SELECT * FROM proyects`)
    return {
        idData: data ? true : false,
        cantRegistros: data.length,
        data: [...data]
    }
}

const findProyect = async (id) => {
    const data = await request(`SELECT * FROM proyects WHERE id = ${id}`)

    return {
        isData: data[0] ? true : false,
        data: data ? data : []
    }
}

const createProyect = async ({ title, link, logo, img, tec }) => {
    const data = await request(
        `INSERT INTO proyects(title, link, logo, img, tec )
        VALUES("${title}","${link}", "${logo}","${img}", "${tec}")`
    )

    return {
        id: data.insertId,
        proyect: { title, link, logo, img, tec },
        data,
        message: `New proyect created successfully`
    }
}

const updateProyect = async ({ id, title, link, logo, img, tec }) => {
    const data = await request(
        `UPDATE proyects SET title = "${title}",
        link = "${link}",
        logo = "${logo}",
        img = "${img}",
        tec = "${tec}"
        WHERE id = ${id}    
    `)
    return {
        data,
        updateData: [...data],
        update: data.affectedRows ? true : false,
        message: `The proyect has been updated`
    }

}

const deleteProyect = async (id) => {
    const data = await request(`
    DELETE FROM proyects WHERE id = ${id}
    `)

    return {
        id,
        deleted: data.affectedRows ? true : false,
        message: "The proyect has been deleted" 
    }
}

module.exports = {
    allProyects,
    findProyect,
    createProyect,
    updateProyect,
    deleteProyect
}