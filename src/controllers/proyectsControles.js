const model = require('../models/proyectsModels')


const uploadImgs = require('../utils/s3')

const allProyectsController = async (req, res) => {
    try {
        const proyects = await model.allProyects()
        return res.status(200).send(proyects)
    } catch (error) {
        return res.status(500).send(error)
    }
};



//Me tre solo la imagen por por el path directamente de aws, no necesita ir al modelo
const proyectImgControler = async (req, res) => {
    console.log(req.params)
    const {path} = req.params
    const readStream = getFileStream(path)
    readStream.pipe(res)
    
}

// const findProyectController = async (req, res) => {
//     const { id } = req.params
//     try {
//         const proyect = await model.findProyect(id)
//         return res.send(proyect)
//     } catch (error) {
//         return res.status(500).send(error)
//     }
// };

const createProyectController = async (req, res) => {
    const { title, link, logo,  tec } = req.body
    console.log('Put controller: ')
    const file = req.file 
    const image = await uploadImgs.uploadFile(file)
    const img = image.Key
    console.log("Controller image: ", img)
    console.log('req.body', title, link, logo, tec)   

    try {
        const proyect = await model.createProyect( title, link, logo, img, tec )
        return res.status(201).send(proyect)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)

    }
};


//Controller
const updateProyectController = async (req, res) => {
    const { id } = req.params
    const { title, link, logo,  tec } = req.body
    const imgName = req.file.originalname.split('.')[0]
    
    const img = `${imgName}-${req.file.filename}`
    console.log('imagen', img)
    console.log('Put controller: ')
    console.log('req.file', req.file)
    console.log('req.body', id, title, link, logo, tec)

    // try {
    //     const proyect = await model.updateProyect( id, title, link, logo, img, tec)
    //     return res.status(200).send(proyect)
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).send(error)
    // }
};

const deleteProyectController = async (req, res) => {
    const { path } = req.params

    try {
        const img = await uploadImgs.deleteImg(path)
        const proyect = await model.deleteProyect(img)
        return res.status(200).send(proyect)
    } catch (error) {
        return res.status(500).send(error)
    }
};

module.exports = {
    allProyectsController,
    // findProyectController,
    createProyectController,
    updateProyectController,
    deleteProyectController,
    proyectImgControler
}