const uploadImgs = require('../models/imgModel')
const path = require("path");
const {uploadFile, getFileStream} = require('../utils/s3')


const imgsController = async (req, res) => {
    console.log(req.body)
    const key = req.body
    const readStream = getFileStream()
    readStream.pipe(res)

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


const createImgController =  async  (req, res) => {    
    console.log("Controller: ", req.file)       
    const file = req.file
    const image = await uploadFile(file)    
    console.log("Controller image: ", image) 

    try {
        console.log("Controller try: ", image) 
        const img = await uploadImgs.createImg( image)

        if (img) {
            return res.status(201).send(img)
        } else {
            return res.status(304).send('La imagen no pudo ser guardada')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Error ' , error)
    }
}


module.exports = {
    imgsController,
    createImgController    
}