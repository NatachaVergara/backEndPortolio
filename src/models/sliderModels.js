// conecto con mysql
const { request } = require('../db/request')

let slider
let sliders



//Obtengo todas las imagenes de la DB
const getSlidersModel = async () => {
    sliders = await request(` SELECT * FROM slider`)

    if(sliders.length > 0) {
        return [...sliders]
    }else{
        return 'No hay sliders disponibles'
    }
   
}


//creo la imagen en la db
const createSliderModel = async (path) => {
    console.log('Path del modelo', path)

    slider = await request(`INSERT INTO slider (path) VALUES ('${path}')`);
    sliders = await request(` SELECT * FROM slider`)


    return {
        sliders: [...sliders],
        message: 'Nueva slider agregada satisfactoriamente'
    }
}


//actualizo la imagen en la DB
const updateSliderModel = async (path, nuevoPath) => {
    console.log('Id y Path modelo', path, nuevoPath);

    slider = await request(`UPDATE slider SET path = '${nuevoPath}' WHERE path = "${path}" `);
    sliders = await request(` SELECT * FROM slider`);

    return {
        sliders: [...sliders],
        message: 'Slider actualizada satisfactoriamente'
    }

}

//Eliminar slider de la db
const deleteSliderModel = async path => {
    console.log('Path modelo', path);

    slider = await request(`DELETE FROM slider WHERE path = '${path}'`);
    sliders = await request(` SELECT * FROM slider`);

    return {
        sliders: [...sliders],
        message: 'Slider eliminada satisfactoriamente'
    }

}

module.exports = {
    getSlidersModel,
    createSliderModel,
    updateSliderModel,
    deleteSliderModel

}