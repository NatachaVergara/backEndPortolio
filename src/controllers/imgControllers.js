const uploadImgs = require('../models/imgModel')

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


const createImgController =  async  (req, res) => {
    console.log("Controller: ", req.file)   
    const file = `${req.file.path}-${req.file.originalname}`
    console.log(file)
    try {
        console.log("Controller try: ", req.file) 
        const img = await uploadImgs.createImg(file)

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