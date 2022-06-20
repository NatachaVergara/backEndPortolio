const model = require('../models/proyectsModels')



const allProyectsController = async (req, res) => {
    try {
        const proyects = await model.allProyects()
        return res.status(200).send(proyects)
    } catch (error) {
        return res.status(500).send(error)
    }
};

const findProyectController = async (req, res) => {
    const { id } = req.params
    try {
        const proyect = await model.findProyect(id)
        return res.send(proyect)
    } catch (error) {
        return res.status(500).send(error)
    }
};

const createProyectController = async (req, res) => {
   const { title, link, logo,  tec } = req.body
    
    console.log('Put controller: ')
    console.log('req.file', req.file)
    console.log('req.body', id, title, link, logo, tec)


    try {
        const proyect = await model.createProyect({ title, link, logo, img, tec })
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
    console.log(imgName)
    const imagen = `${req.file.fieldname}-${req.file.path}`
    console.log('Put controller: ')
    console.log('req.file', req.file)
    console.log('req.body', id, title, link, logo, tec)

    // try {
    //     const proyect = await model.updateProyect({ id, title, link, logo, img, tec })
    //     return res.status(200).send(proyect)
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).send(error)
    // }
};

const deleteProyectController = async (req, res) => {
    const { id } = req.params
    try {
        const proyect = await model.deleteProyect(id)
        return res.status(200).send(proyect)
    } catch (error) {
        return res.status(500).send(error)
    }
};

module.exports = {
    allProyectsController,
    findProyectController,
    createProyectController,
    updateProyectController,
    deleteProyectController
}