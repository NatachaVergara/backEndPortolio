const uploadImgs = require('../models/imgModel')

const imgsController = async (req, res) => {
    // const {files} = req.files

    try {

        const img = await uploadImgs.getImgs()

        if (img.length > 0) {
            return res.status(201).send(img)
        } else {
            return res.status(204).send('Imagenes no disponibles')
        }

    } catch (error) {
        return res.status(500).send(error)
    }


}


const createImgController = async (req, res) => {
    const { files } = req.files
    console.log(files)
    try {
        const img = await uploadImgs.createImg(files)

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
    createImgController

}