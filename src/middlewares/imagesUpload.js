const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename:  (req, file, cb) => {
        console.log("storage fileName ", file)
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
})

module.exports.upload = multer({storage: storage});