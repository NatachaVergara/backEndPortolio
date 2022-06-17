const multer = require('multer');


export const upload = multer({ dest: 'skilImg/' }).single('image');

