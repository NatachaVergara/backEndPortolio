const uploadImgs = require('../models/imgModel')
const path = require("path");
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
    console.log("Controller: ", req.files)   
    
    const imagen =  `${Date.now()}-${req.files.originalname}`  
    try {
        console.log("Controller try: ",imagen) 
        const img = await uploadImgs.createImg( imagen)

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