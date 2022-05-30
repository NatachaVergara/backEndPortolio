const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '\Users\todom\OneDrive\Escritorio\portfolioFullstack')
    }
})