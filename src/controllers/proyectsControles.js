const { allProyects, findProyect, createProyect, updateProyect, deleteProyect } = require('../models/proyectsModels')

const allProyectsController = async (req, res) => {
    try {
        const proyects = await allProyects()
        return res.send(proyects)
    } catch (error) {
        console.log(error)
    }
};

const findProyectController = async (req, res) => {
    const { id } = req.params
    try {
        const proyect = await findProyect(id)
        return res.send(proyect)
    } catch (error) {
        console.log(error)
    }
};

const createProyectController = async (req, res) => {
    const { title, link, logo, img, tec } = req.body
    try {
        const proyect = await createProyect({ title, link, logo, img, tec })
        return res.send(proyect)
    } catch (error) {
        console.log(error)
    }
};



const updateProyectController = async (req, res) => {
    const {id} = req.params
    const { title, link, logo, img, tec } = req.body

    try {
        const proyect = await updateProyect({ id, title, link, logo, img, tec })
        return res.send(proyect)
    } catch (error) {
        console.log(error)
    }
};

const deleteProyectController = async (req, res) => {
    const {id} = req.params
    try {
        const proyect = await deleteProyect(id)
        return res.send(proyect)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    allProyectsController,
    findProyectController,
    createProyectController,
    updateProyectController,
    deleteProyectController
}