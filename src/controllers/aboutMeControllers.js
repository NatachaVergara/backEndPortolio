const modelo = require('../models/aboutMeModels')
const s3 = require('../utils/s3')

let registro
let registros
//Obtengo desde mi db el registro de aboutMe
const getAboutMeController = async (req, res) => {

    try {
        registros = await modelo.getAboutMe()
        return res.status(200).send(registros)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

//Obtengo la imagen directamente desde aws
const getAboutMeImgController = async (req, res) => {
    // console.log(req.params)
    const { path } = req.params
    const readStream = s3.getFileStream(path)
    readStream.pipe(res)
}

//La tabla aboutMe va a tener 1 solo registro
const createAboutMeController = async (req, res) => {
    // console.log(req.file)
    // console.log(req.body)
    const { texto, titulo } = req.body
    const file = req.file
    const img = await s3.uploadFile(file)
    const path = img.Key

    try {
        registro = await modelo.createAboutMe(path, texto, titulo)

        if (registro.created) {
            return res.status(200).send(registro)
        } else {
            await s3.deleteFile(path)
            return res.status(204).send(registro)
        }

    } catch (error) {
        console.log(error)
        await s3.deleteFile(path)
        return res.status(500).send(error)
    }
}

//Actualizo los datos de mi registro aboutMe
const updateAboutMeController = async (req, res) => {
    const { path } = req.params
    const { texto, titulo } = req.body

    //Creo un nuevo path en base al req.file que entra
    const file = req.file
    const img = await s3.uploadFile(file)
    const newPath = img.Key

    try {
        registro = await modelo.updateAboutMe(path, newPath, texto, titulo)

        if (registro.updated) {
            await s3.deleteFile(path)
            return res.status(200).send(registro)
        } else {
            await s3.deleteFile(newPath)
            return res.status(304).send(registro)
        }

    } catch (error) {
        console.log(error)
        await s3.deleteFile(newPath)
        return res.status(500).send(error)
    }
}

// //Elimino mi resgistro (no va a estar activo)
const deleteAboutMeController = async (req, res) => {
    const { path } = req.params;

    try {
        registro = await modelo.deleteAboutMe(path)

        if (registro.deleted) {
            await s3.deleteFile(path)
            return res.status(200).send(registro)
        } else {
            return res.status(304).send(registro)
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = {
    getAboutMeController,
    getAboutMeImgController,
    createAboutMeController,
    updateAboutMeController,
    deleteAboutMeController
}