const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     console.log("destination: ", file)
    //     cb(null, path.join(__dirname, './public/images'))
    // },

    filename: (req, file, cb) => {
        console.log("storage fileName: ", file)
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
        
        console.log("storage fileName2: ", file)
        ;
    }
})

module.exports.upload = multer({ storage: storage });