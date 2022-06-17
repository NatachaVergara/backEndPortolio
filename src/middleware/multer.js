const multer = require('multer');


const upload = multer({ dest: 'skilImg/' })

module.exports = upload.single('image')
