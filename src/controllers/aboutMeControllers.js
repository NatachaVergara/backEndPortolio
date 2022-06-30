const modelo = require('../models/aboutMeModels')
const s3 = require('../utils/s3')

let registro
let registros
//Obtengo desde mi db la informacion aboutMe
const getAboutMeController = async (req, res) => {

    try {
        registros = await modelo.getAboutMe()
        if (registros.length > 0) {
            return res.status(200).send(registros)
        } else {
            return res.status(204).send({
                registros,
                message: 'No hay registros'
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }



}

//Obtengo la imagen directamente desde aws
// const getAboutMeImgController = async (req, res) => {




// }

//La tabla aboutMe va a tener 1 solo registro
const createAboutMeController = async (req, res) => {
    console.log(req.file)
    console.log(req.body)
    const { texto, titulo } = req.body
    const file = req.file
    const img = await s3.uploadFile(file)
    const path = img.Key

    try {
        registro = await modelo.createAboutMe(path, texto, titulo)

        if (registro.created) {
            return res.status(200).send(registro)
        } else {
            await s3.deleteFile(path)
            return res.status(204).send('No se pudo crear registro')
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

}

//Actualizo los datos de mi registro aboutMe
// const updateAboutMeController = async (req, res) => {}

// //Elimino mi resgistro (no va a estar activo)
//  const deleteAboutMeController = async (req, res) => {}

module.exports = {
    getAboutMeController,
    // getAboutMeImgController
    createAboutMeController
}