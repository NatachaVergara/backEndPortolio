const modelo = require('../models/aboutMeModels')
const s3 = require('../utils/s3')


//Obtengo desde mi db la informacion aboutMe
export const getAboutMeController = async (req, res) => {}

//Obtengo la imagen directamente desde aws
export const getAboutMeImgController = async (req, res) => {}

//La tabla aboutMe va a tener 1 solo registro
export const createAboutMeController = async (req, res) => {}

//Actualizo los datos de mi registro aboutMe
export const updateAboutMeController = async (req, res) => {}

// //Elimino mi resgistro (no va a estar activo)
// export const deleteAboutMeController = async (req, res) => {}
