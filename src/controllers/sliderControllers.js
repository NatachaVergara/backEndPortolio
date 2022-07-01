//traer las funciones del modelo del
const modelo = require('../models/sliderModels')
//traer las funciones del archivo s3.js

const s3 = require('../utils/s3')


let registros


//obtiene todas las imagenes de la DB
const getSlidersController = async (req, res) => {
    try {
        registros = await modelo.getSlidersModel()
        return res.status(200).send(registros)
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
        registros = await modelo.createSliderModel(path)
        if (registros.created) {
            return res.status(201).send(registros)
        } else {
            await s3.deleteFile(path)
            return res.status(304).send(registros)
        }

    } catch (error) {
        console.log(error)
        await s3.deleteFile(path)
        return res.status(500).send('Error ', error)
    }

}


//actualizar la imagen en la db y aws
const updateSlidercontroller = async (req, res) => {
    //El path es la imagen que quiero reempalazar
    const { path } = req.params
    //Creo la nueva imagen que quiero guardar en mi storage
    const file = req.file
    const image = await s3.uploadFile(file)
    const nuevoPath = image.Key
    console.log(`Update path:  ${path} `)
    console.log(`Update file: ${file}`)

    try {
        //Envio al modelo, el path a reemplazar y el nuevoPath a guardar
        registros = await modelo.updateSliderModel(path, nuevoPath)

        if (registros.updated) {
            //Elimino la imagen que quiero reeemplazar de mi storage
            await s3.deleteFile(path)
            return res.status(200).send(registros)
        } else {
            //Elimino la imagen que se acaba de crear de mi storage
            await s3.deleteFile(nuevoPath)
            return res.status(304).send(registros)
        }

    } catch (error) {
        console.log(error)
        await s3.deleteFile(nuevoPath)
        return res.status(500).send(error)
    }

}

//eliminar la imagen de la db y aws
const deleteSlidercontroller = async (req, res) => {
    const { path } = req.params
    console.log('Delete: ', req.params)
    console.log(path)

    try {
        registros = await modelo.deleteSliderModel(path)
        if (registros.deleted) {
            await s3.deleteFile(path)
            return res.status(200).send(registros)
        } else {
            return res.status(304).send(registros)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}



module.exports = {
    getSlidersController,
    getSliderController,
    createSliderController,
    updateSlidercontroller,
    deleteSlidercontroller
}