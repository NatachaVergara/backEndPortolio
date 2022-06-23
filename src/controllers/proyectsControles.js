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
    const { path } = req.params
    const readStream = uploadImgs.getFileStream(path)
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
    const { title, link, logo, tec } = req.body
    console.log('Create controller: ')
    const file = req.file
    const image = await uploadImgs.uploadFile(file)
    const img = image.Key
    console.log("Controller image: ", img)
    console.log('req.body', title, link, logo, tec)

    try {
        const proyect = await model.createProyect(title, link, logo, img, tec)
        return res.status(201).send(proyect)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)

    }
};



const updateProyectController = async (req, res) => {
    const { id } = req.params
    const { title, link, logo, tec, image, imagenPath } = req.body
    console.log('Put controller: ')
    console.log('req.body', id, title, link, logo, tec, image, imagenPath)
    console.log('req.file', req.file)

    let img = ''

    //Si del front viene un archivo que elimine la imagen existente en mi bucket y que me cree una nueva y se guearde en la variable img
    if (req.file !== undefined) {
        let file = req.file
        img = await uploadImgs.uploadFile(file)
        img = img.Key
        console.log('req.file del if', img)
        await uploadImgs.deleteFile(imagenPath)
    } else { // si no viene ningun archivo desde el front que se guarde en mi variable img, el path ya existente
        img = imagenPath
        console.log('path del else', img)
    }

    try {
        const proyect = await model.updateProyect(id, title, link, logo, img, tec)
        return res.status(200).send(proyect)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

}




const deleteProyectController = async (req, res) => {
    const { path } = req.params
    console.log('PATH Delete', path)
    
    try {
        const proyect = await model.deleteProyect(path)
        await uploadImgs.deleteImg(path)
        return res.status(200).send(proyect)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error,
            message: proyect.message
        })
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