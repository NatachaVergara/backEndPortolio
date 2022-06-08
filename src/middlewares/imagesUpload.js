const path = require('path');
//const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, '/Images'));
      },

    filename: (req, file, cb) => {        
        let temp = file.originalname.split('.');
        const filename = temp[0] + '-' + hash.generateHash({length: 5}) + '.' + temp[1]
        callback(null, filename);

        console.log("storage fileName: ", file)
    }
})

module.exports.upload = multer({ storage: storage });