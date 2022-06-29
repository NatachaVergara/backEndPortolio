//traer las funciones del modelo del
const modelo = require('../models/sliderModels')
//traer las funciones del archivo s3.js

const s3 = require('../utils/s3')
let sliders
let slider


//obtiene todas las imagenes de la DB
const getSlidersController = async (req, res) => {
    try {

        sliders = await modelo.getSlidersModel()
        if (sliders.length > 0) {
            return res.status(200).send(sliders)
        } else {
            return res.status(204).send('Sliders no disponibles')
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }


}

//obtener una imagen de slider desde aws, no es necesario acceder a la db propia
const getSliderController = async (req, res) => {
    console.log('Params', req.params)
    const { path } = req.params
    const readStream = s3.getFileStream(path)
    readStream.pipe(res)
}

//crear la imagen en la db y en aws
const createSliderController = async (req, res) => {
    console.log('Controller: ', req.file)
    const file = req.file
    const image = await s3.uploadFile(file)
    const path = image.Key


    try {
        slider = await modelo.createSliderModel(path)
        if (slider) {
            return res.status(200).send(slider)
        } else {
            return res.status(304).send(`La imagen no pudo ser guardada`)
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send('Error ', error)
    }

}


//actualiar la imagen en la db y aws
const updateSlidercontroller = async (req, res) => {
    //El path es la imagen que quiero reempalazar
    const { path } = req.params
    //El image es la nueva imagen a guardar
    const file = req.file
    console.log(`Update params: ${req.params}`)
    console.log(`Update path:  ${path} `)
    console.log(`Update req.file: ${req.file}`)
    console.log(`Update file: ${file}`)

    try {
        //Creo la nueva imagen que quiero guardar en mi storage
        const image = await s3.uploadFile(file)
        const nuevoPath = image.Key
        //Elimino la imagen que quiero reeemplazar de mi storage
        await s3.deleteFile(path)
        //Envio al modelo, el path a reemplazar y el nuevoPath a guardar
        slider = await modelo.updateSliderModel(path, nuevoPath)

        if (slider) {
            return res.status(200).send(slider)
        } else {
            //Elimino la imagen que quiero reeemplazar de mi storage
            await s3.deleteFile(path)
            return res.status(304).send('El slider no pudo ser actualizo')

        }

    } catch (error) {
        console.log(error)
        return res.status(500).send('Error ', error)
    }

}

//eliminar la imagen de la db y aws
const deleteSlidercontroller = async (req, res) => {
    const { path } = req.params
    console.log('Delete: ', req.params)
    console.log(path)

    try {
        slider = await modelo.deleteSliderModel(path)
        await s3.deleteFile(path)
        return res.status(200).send(slider)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error ', error)
    }
}



module.exports = {
    getSlidersController,
    getSliderController,
    createSliderController,
    updateSlidercontroller,
    deleteSlidercontroller
}