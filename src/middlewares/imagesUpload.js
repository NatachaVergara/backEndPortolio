const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img')
    },

    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);

        console.log("storage fileName: ", file)
    }
})

module.exports.upload = multer({ storage: storage });