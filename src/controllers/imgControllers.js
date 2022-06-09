const path = require('path');
const multer = require('multer');
const uploadImgs = require('../models/imgModel')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../img/'))
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
        return res.status(500).send(error)
    }
}


const createImgController = async (req, res) => {
    
    console.log(req.file)
    console.log(req.body)

    try {
        const img = await uploadImgs.createImg(req.files)

        if (img) {
            return res.status(201).send(img)
        } else {
            return res.status(304).send('La imagen no pudo ser guardada')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}




module.exports = {
    imgsController,
    createImgController,
    upload : upload.single('images')
}