const model = require('../models/proyectsModels')


const s3 = require('../utils/s3')

let registros

const allProyectsController = async (req, res) => {
    try {
        registros = await model.allProyects()

        if (registros.length > 0) {
            return res.status(200).send(registros)
        } else {
            return res.status(204).send(registros)
        }

    } catch (error) {
        return res.status(500).send(error)
    }
};



//Me tre solo la imagen por por el path directamente de aws, no necesita ir al modelo
const proyectImgControler = async (req, res) => {
    console.log(req.params)
    const { path } = req.params
    const readStream = s3.getFileStream(path)
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
    //Creo el archivo para envialo a asw
    const file = req.file
    const image = await s3.uploadFile(file)
    //me devuelve el path en image.key y es lo que envio a aguardar a la db
    const img = image.Key
    console.log("Controller image: ", img)
    console.log('req.body', title, link, logo, tec)

    try {
        registros = await model.createProyect(title, link, logo, img, tec)

        if (registros.created) {
            return res.status(201).send(registros)
        } else {
            await s3.deleteFile(img)
            return res.status(304).send(registros)
        }

    } catch (error) {
        console.log(error)
        await s3.deleteFile(img)
        return res.status(500).send(error)

    }
};



const updateProyectController = async (req, res) => {
    const { id } = req.params
    const { title, link, logo, tec, image, oldPath } = req.body
    console.log('Put controller: ')
    console.log('req.body', id, title, link, logo, tec, image, oldPath)
    console.log('req.file', req.file)

    let img = ''
    let newPath = ''
    //Si del front viene un archivo que elimine la imagen existente en mi bucket y que me cree una nueva y se guearde en la variable img
    if (req.file !== undefined) {
        let file = req.file
        img = await s3.uploadFile(file)
        img = img.Key
        newPath = img.Key
        console.log('req.file del if', img)

    } else { // si no viene ningun archivo desde el front que se guarde en mi variable img, el path ya existente
        img = oldPath
        console.log('path del else', img)
    }

    try {
        registros = await model.updateProyect(id, title, link, logo, img, tec)

        if (registros.updated) {
            await s3.deleteFile(oldPath)
            return res.status(200).send(registros)
        } else {
            await s3.deleteFile(newPath)
            return res.status(304).send(registros)
        }

    } catch (error) {
        console.log(error)
        await s3.deleteFile(newPath)
        return res.status(500).send(error)
    }

}




const deleteProyectController = async (req, res) => {
    const { path } = req.params

    try {
        const registros = await model.deleteProyect(path)

        if (registros.deleted) {
            await s3.deleteFile(path)
            return res.status(200).send(registros)
        } else {
            return res.status(304).send(registros)
        }
    } catch (error) {
        console.log(error)
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