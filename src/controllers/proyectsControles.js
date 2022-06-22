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
    console.log('Put controller: ')
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


//Controller
// const updateProyectController = async (req, res) => {
//     const { id } = req.params
//     const { title, link, logo, tec, imagen } = req.body
    

//     console.log('Put controller: ')
//     console.log('req.body', title, link, logo, tec, imagen)

//     //elimino la imagen de mi bucket solo si viene del front un archivo 
//     req.file ? await uploadImgs.deleteFile(imagen) : null
//     //creo un archivo null
//     let  file = null
//     //si viene un file del front que se cargue la info, y si no que quede vacio
//     req.file ? file = req.file : null
//     //envio el file a mi s3.js
//     const image = null
//     req.file ? image = await uploadImgs.uploadFile(file) : null
//     //creo una variable
//     let img = null
//     let key = image.Key

//     key ? img = key : img = imagen

//     console.log(img)
//     // try {
//     //     const proyect = await model.updateProyect(id, title, link, logo, img, tec)
//     //     return res.status(200).send(proyect)
//     // } catch (error) {
//     //     console.log(error)
//     //     return res.status(500).send(error)
//     // }
// };




// const deleteProyectController = async (req, res) => {
//     const { path } = req.params

//     try {
//         const img = await uploadImgs.deleteImg(path)
//         const proyect = await model.deleteProyect(img)
//         return res.status(200).send(proyect)
//     } catch (error) {
//         return res.status(500).send(error)
//     }
// };

module.exports = {
    allProyectsController,
    // findProyectController,
    createProyectController,
    // updateProyectController,
    //deleteProyectController,
    proyectImgControler
}