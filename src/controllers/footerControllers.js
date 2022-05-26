
const { allLinksModel, linkModel, createLinkModel, updateLinkModel, deleteLinkModel } = require('../models/footerModels')


const allControllers = async (req, res) => {
    try {
        const data = await allLinksModel()
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const linkController = async (req, res) => {
    const { id } = req.params
    try {
        const data = await linkModel(id)
        return res.status(200).send(data)

    } catch (error) {
        return res.status(500).send(error)
    }


}

const createLinkController = async (req, res) => {
    const { link, name, img } = req.body
    try {
        const data = await createLinkModel(link, name, img)
        return res.status(200).send(data)

    } catch (error) {
        return res.status(500).send(error)
    }

}


const linkUpdateController = async (req, res) => {
    const { link, name } = req.body
    const { id } = req.params

    try {
        const data = await updateLinkModel(id, link, name)
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).send(error)
    }

}


const linkDeleteController = async (req, res) => {
    const { id } = req.params
    try {
        const data = await deleteLinkModel(id)
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).send(error)
    }

}



module.exports =
{
    allControllers,
    createLinkController,
    linkController,
    linkUpdateController,
    linkDeleteController,
}