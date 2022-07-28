const modelo = require('../models/preciosModels')
let registros

const getPrecios = async (req, res) => {
    try {
        registros = await modelo.getPrecios()
        return res.status(200).send(registros)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
};

const createPrecio = async (req, res) => {
    const { titulo, precio, dominio, hosting, almacenamiento, libre, telefono } = req.body
    try {
        registros = await modelo.createPrecio(titulo, precio, dominio, hosting, almacenamiento, libre, telefono)
        registros.created ? res.status(200).send(registros) : res.status(204).send(registros)

    } catch (error) {
        return res.status(500).send(error)
    }
}

const updatePrecio = async (req, res) => {
    const { titulo, precio, dominio, hosting, almacenamiento, libre, telefono } = req.body
    const { id } = req.params
    try {
        registros = await modelo.updatePrecio(id, titulo, precio, dominio, hosting, almacenamiento, libre, telefono)

        registros.updated ? res.status(200).send(registros) : res.status(204).send(registros)

    } catch (error) {
        return res.status(500).send(error)
    }

}

const deletePrecio = async (req, res) => {
    const { id } = req.params
    try {
        registros = await modelo.deletePrecios(id)

        registros.deleted ? res.status(200).send(registros) : res.status(204).send(registros)


    } catch (error) {
        return res.status(500).send(error)
    }



}

module.exports = {
    getPrecios,
    createPrecio,
    updatePrecio,
    deletePrecio
}