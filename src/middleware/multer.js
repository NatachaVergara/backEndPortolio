const multer = require('multer');


const upload = multer({ dest: 'skilImg/' })

module.export = upload.single('image')
