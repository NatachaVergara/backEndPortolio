const path = require('path');
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename:  (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
})

module.exports.upload = multer({storage: storage});