const path = require('path');
//const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, '/Images'));
      },

    filename: (req, file, cb) => {        
        cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname);

        console.log("storage fileName: ", file)
    }
})

module.exports.upload = multer({ storage: storage });