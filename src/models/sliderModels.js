// conecto con mysql
const { request } = require('../db/request')

let registro
let registros



//Obtengo todas las imagenes de la DB
const getSlidersModel = async () => {
    registros = await request(` SELECT * FROM slider`)
   return registros
   
}


//creo la imagen en la db
const createSliderModel = async (path) => {
    console.log('Path del modelo', path)

    registro = await request(`INSERT INTO slider (path) VALUES ('${path}')`);
    registros = await request(` SELECT * FROM slider`)


    return {
        created: registro.insertId ? true : false,
        registros: [...sliders],
        message: 'Nueva slider agregada satisfactoriamente'
    }
}


//actualizo la imagen en la DB
const updateSliderModel = async (path, nuevoPath) => {
    console.log('Id y Path modelo', path, nuevoPath);

    registro = await request(`UPDATE slider SET path = '${nuevoPath}' WHERE path = "${path}" `);
    registros = await request(` SELECT * FROM slider`);

    return {
        updated: registro.affectedRows ? true : false,
        registros: [...registros],
        message: 'Slider actualizada satisfactoriamente'
    }

}

//Eliminar slider de la db
const deleteSliderModel = async path => {
    console.log('Path modelo', path);

    registro = await request(`DELETE FROM slider WHERE path = '${path}'`);
    registros = await request(` SELECT * FROM slider`);

    return {
        deleted: registro.affectedRows ? true : false,
        registros: [...registros],
        message: 'Slider eliminada satisfactoriamente'
    }

}

module.exports = {
    getSlidersModel,
    createSliderModel,
    updateSliderModel,
    deleteSliderModel

}