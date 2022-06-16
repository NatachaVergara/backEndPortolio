const uploadImgs = require('../models/imgModel')

const { uploadFile, getFileStream, deleteFile } = require('../utils/s3')


const imgsController = async (req, res) => {
    try {
        const img = await uploadImgs.getImgs()
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

const imgControler = async (req, res) => {
    console.log(req.params)
    const {key} = req.params
    const readStream = getFileStream(key)
    readStream.pipe(res)
}


const createImgController = async (req, res) => {
    console.log("Controller: ", req.file)
    const file = req.file
    const image = await uploadFile(file)
    const path = image.Key
    console.log("Controller image: ", path)
    console.log(req.body)

    try {
        const img = await uploadImgs.createImg(path)

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


const deleteImgController = async (req, res) => {
    const { path } = req.params
    console.log(req.params)
    console.log(path)

    try {
         await deleteFile(path)
         const img = await uploadImgs.deleteImg(path)
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
    deleteImgController
}