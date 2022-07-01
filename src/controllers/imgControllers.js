const model = require('../models/imgModel')

const { uploadFile, getFileStream, deleteFile } = require('../utils/s3')

let registro
let registros


//Me trae todas las imagenes de mi DB
const imgsController = async (req, res) => {
    try {
        registros = await model.getImgs()
        return res.status(201).send(registros)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

//Me tre solo la imagen por por el path directamente de aws, no necesita ir al modelo
const imgControler = async (req, res) => {
    console.log(req.params)
    const { path } = req.params
    const readStream = getFileStream(path)
    readStream.pipe(res)
}

//Crea la imagen y la guarda en aws y en mysql
const createImgController = async (req, res) => {
    console.log("Controller: ", req.file)
    const file = req.file
    const image = await uploadFile(file)
    const path = image.Key


    try {
        registro = await model.createImg(path)

        if (registro.created) {
            return res.status(201).send(registro)
        } else {
            await deleteFile(path)
            return res.status(304).send(registro.message)
        }
    } catch (error) {
        console.log(error)
        await deleteFile(path)
        return res.status(500).send('Error ', error)
    }
}

//Elimino el path en aws y creo un path nuevo con el cual ctualizo la imagen en la base de datos

const updateImgController = async (req, res) => {
    const { path } = req.params
    const file = req.file
    // creo el nuevo path
    const image = await uploadFile(file)
    const newPath = image.Key

    try {
        registro = await model.updateImg(path, newPath)
        if (registro.update) {
            await deleteFile(path)
            return res.status(200).send(registro)
        } else {
            await deleteFile(newPath)
            return res.status(304).send(registro.message)
        }
    } catch (error) {
        console.log(error)
        await deleteFile(newPath)
        return res.status(500).send(error)
    }
}


//Elimino el archivo en mysql y en aws con el path.. no con el id de mysql
const deleteImgController = async (req, res) => {
    const { path } = req.params
    console.log(req.params)
    console.log(path)

    try {

        registro = await model.deleteImg(path)

        if (registro.deleted) {
            await deleteFile(path)
            return res.status(200).send(img)
        } else {
            return res.status(304).send(registro.message)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}



module.exports = {
    imgsController,
    imgControler,
    createImgController,
    updateImgController,
    deleteImgController
}