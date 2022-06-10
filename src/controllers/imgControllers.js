const path = require('path');
const uploadImgs = require('../models/imgModel')


const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })



// const folder = path.resolve(__dirname, './img')
// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//         cb(null, folder)
//       },   


//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);

//         console.log("storage fileName: ", file)
//     }
// })










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
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1]);
    console.log(req.file)

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
    upload: upload.single('images')
}