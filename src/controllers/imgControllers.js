const path = require('path');
const multer = require('multer');
const uploadImgs = require('../models/imgModel')


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './img')
      },   


    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);

        console.log("storage fileName: ", file)
    }
})
const upload = multer({storage:storage})







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


const createImgController = async (req, res) => {
    console.log(`Controller: ${req.file}`)
   

    try {
        const img = await uploadImgs.createImg(req.file)

        if (img) {
            return res.status(201).send(img)
        } else {
            return res.status(304).send('La imagen no pudo ser guardada')
        }
    } catch (error) {

        console.log(error)
        return res.status(500).send(error)
    }
}




module.exports = {
    imgsController,
    createImgController,
    upload : upload.single('images')
}