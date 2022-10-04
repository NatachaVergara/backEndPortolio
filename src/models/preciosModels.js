const { request } = require('../db/request')






const getPrecios = async () => {
    let registros = await request(`SELECT * FROM precios`)
    return registros
}


const createPrecio = async (titulo, precio, dominio, hosting, almacenamiento, libre, telefono) => {

    let registro = await request(
        `INSERT INTO precios (titulo, precio, dominio, hosting, almacenamiento, libre, telefono)
        VALUES ( "${titulo}", ${precio}, ${dominio}, ${hosting}, "${almacenamiento}", "${libre}", ${telefono})`
    )
    let registros = await request(`SELECT * FROM precios`);


    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        msg: 'Registro creado'
    }

}


const updatePrecio = async (id, titulo, precio, dominio, hosting, almacenamiento, libre, telefono) => {
    let registro = await request(`
    UPDATE precios SET 
    titulo = "${titulo}", 
    precio = ${precio}, 
    dominio = ${dominio}, 
    hosting = ${hosting}, 
    almacenamiento = "${almacenamiento}", 
    libre = "${libre}",  
    telefono = ${telefono}
    WHERE id = ${id}
    `);
    let registros = await request(`SELECT * FROM precios`);

    return {
        updated: registro.affectedRows ? true : false,
        registros: [...registros],
        msg: 'Registro actualizado'

    }

}

const deletePrecios = async (id) => {
    let registro = await request(`DELETE FROM precios WHERE id = ${id}`);
    let registros = await request(`SELECT * FROM precios`);

    return {
        deleted: registro.affectedRows ? true : false,
        registros: [...registros],
        msg: 'Registro eliminado'
    }

}

module.exports = {
    getPrecios,
    createPrecio,
    updatePrecio,
    deletePrecios
}