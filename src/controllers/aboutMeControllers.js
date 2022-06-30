const modelo = require('../models/aboutMeModels')
//const s3 = require('../utils/s3')

let registro
let registros
//Obtengo desde mi db la informacion aboutMe
export const getAboutMeController = async (req, res) => {

    try {
        registros = await modelo.getAboutMe()
        if (registros.length > 0) {
            return res.status(200).send(registros)
        } else {
            return res.status(304).send('No hay registros')
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }



}

//Obtengo la imagen directamente desde aws
//export const getAboutMeImgController = async (req, res) => {}

//La tabla aboutMe va a tener 1 solo registro
//export const createAboutMeController = async (req, res) => {}

//Actualizo los datos de mi registro aboutMe
//export const updateAboutMeController = async (req, res) => {}

// //Elimino mi resgistro (no va a estar activo)
// export const deleteAboutMeController = async (req, res) => {}
