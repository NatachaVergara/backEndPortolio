const uploadImgs = require('../models/imgModel')


const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })




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
    console.log("Controller: ", req.file)
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
   

    // try {
    //     const img = await uploadImgs.createImg(req.file)

    //     if (img) {
    //         return res.status(201).send(img)
    //     } else {
    //         return res.status(304).send('La imagen no pudo ser guardada')
    //     }
    // } catch (error) {

    //     console.log(error)
    //     return res.status(500).send(error)
    // }
}


module.exports = {
    imgsController,
    createImgController,
    upload: upload.single('image')
}