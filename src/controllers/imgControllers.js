const uploadImgs = require('../models/imgModel')

const { uploadFile, getFileStream, deleteFile } = require('../utils/s3')

//Me trae todas las imagenes de mi DB
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

//Me tre solo la imagen por por el path directamente de aws, no necesita ir al modelo
const imgControler = async (req, res) => {
    console.log(req.params)
    const {path} = req.params
    const readStream = getFileStream(path)
    readStream.pipe(res)
}

//Crea la imagen y la guarda en aws y en mysql
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

//Elimino el archivo en mysql y en aws con el path.. no con el id de mysql
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