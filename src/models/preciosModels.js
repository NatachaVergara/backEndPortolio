const { request } = require('../db/request')

let registro
let registros = await request(`SELECT * FROM precios`)



const getPrecios = async () => {
    registros
    return registros
}


const createPrecio = async (titulo, precio, dominio, hosting, almacenamiento, libre, telefono) => {

    registro = await request(
        `INSERT INTO precios (titulo, precio, dominio, hosting, almacenamiento, libre, telefono)
        VALUES ( "${titulo}", ${precio}, ${dominio}, ${hosting}, "${almacenamiento}", "${libre}", ${telefono})`
    )
    registros;


    return {
        created: registro.insertId ? true : false,
        registros: [...registros],
        msg: 'Registro creado'
    }

}


const updatePrecio = async (id, titulo, precio, dominio, hosting, almacenamiento, libre, telefono) => {
    registros = await request(`
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
    registros;

    return {
        updated: registro.affectedRows ? true : false,
        registros: [...registros],
        msg: 'Registro actualizado'

    }

}

const deletePrecios = async (id) => {
    registro = await request(`DELETE FROM precios WHERE id = ${id}`);
    registros;

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