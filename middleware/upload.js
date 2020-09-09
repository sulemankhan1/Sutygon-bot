

module.exports = multer = require('multer');
    // const { uploadAvatar } = require('../controllers/upload');

    const FILE_PATH = 'client/src/uploads';

    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, FILE_PATH),
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, `${Math.floor(Math.random() * 10000)}-${fileName}`); 
        },
    });
    const upload = multer({storage: storage});
