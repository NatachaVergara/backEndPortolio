const { request } = require('../db/request')




const allLinksModel = async () => {
    const data = await request(`SELECT * FROM footerLinks`)
    return {
        idData: data ? true : false,
        cantRegistros: data.length,
        data: [...data]
    }
};

const linkModel = async (id) => {
    const data = await request(`SELECT * FROM footerLinks WHERE id = ${id} `)
    return {
        isData: data[0] ? true : false,
        data: data ? data : []
    }

};

const createLinkModel = async (link, name, img) => {
    const data = await request(

        `INSERT INTO footerLinks(link, name, img)
        VALUES("${link}", "${name}", "${img}")`
    )

    return {
        id: data.insertId,
        link: { link, name },
        data,
        message: `New link created`
    }

};




const updateLinkModel = async (id, link, name, img) => {

    const linkData = await request(
        `UPDATE footerLinks SET 
        link = "${link}",
        name = "${name}",
        img = "${img}"
        WHERE id = ${id}
        `)

    const newInfo = await request(`SELECT * FROM footerLinks`)
    return {
        linkData,
        newInfo: [...newInfo],
        update: data.affectedRows ? true : false,
        message: `Your footer link has been updated`
    }
};


const deleteLinkModel = async (id) => {
    const linkDeleted = await request(`DELETE FROM footerLinks WHERE id = ${id}`)
    const newInfo = await request(`SELECT * FROM footerLinks`)

    return {
        linkDeleted,
        newInfo: [...newInfo],
        deleted: data.affectedRows ? true : false,
        message: `Your footer link has been deleted`
    }

};







module.exports = {
    allLinksModel, linkModel, createLinkModel, updateLinkModel, deleteLinkModel
}