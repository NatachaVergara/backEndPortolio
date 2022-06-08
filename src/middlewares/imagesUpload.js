const path = require('path');
//const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/image");
      },

    filename: (req, file, cb) => {        
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);

        console.log("storage fileName: ", file)
    }
})

module.exports.upload = multer({ storage: storage });