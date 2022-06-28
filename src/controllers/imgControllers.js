const model = require('../models/imgModel')

const { uploadFile, getFileStream, deleteFile } = require('../utils/s3')

//Me trae todas las imagenes de mi DB
const imgsController = async (req, res) => {
    try {
        const img = await model.getImgs()
        if (img) {
            return res.status(201).send(img)
        } else {
            return res.status(204).send('Imagenes no disponibles')
        }

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
        const img = await model.createImg(path)

        if (img) {
            return res.status(201).send(img)
        } else {
            return res.status(304).send('La imagen no pudo ser guardada')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error ', error)
    }
}

//Elimino el path en aws y creo un path nuevo con el cual ctualizo la imagen en la base de datos

const updateImgController = async (req, res) => {
    //Lo voy a utilizar para crear el nuevoPath
    console.log('Controler File ', req.file)
    //Lo voy a utilizar para eliminarlo de aws y encontrarlo en mi db
    console.log('Controler Params oldPath ', req.params)
    const {path} = req.params
    const file = req.file 
    // creo el nuevo path
    const image = await uploadFile(file)
    const newPath = image.Key

    try {
        const img = await model.updateImg(path, newPath)

        if (img.update) {
            await deleteFile(path)
            return res.status(200).send(img)
        } else {
            return res.status(304).send('Ha ocurrido un error')
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }




}


//Elimino el archivo en mysql y en aws con el path.. no con el id de mysql
const deleteImgController = async (req, res) => {
    const { path } = req.params
    console.log(req.params)
    console.log(path)

    try {
        await deleteFile(path)
        const img = await model.deleteImg(path)
        return res.status(200).send(img)
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