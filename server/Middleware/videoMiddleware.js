const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, cb) => cb(null, 'videos'),
    filename:(req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

// create the multer upload handler
const upload = multer({ storage });


module.exports = upload;