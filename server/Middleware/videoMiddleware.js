// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination:(req, file, cb) => cb(null, 'videos'),
//     filename:(req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// // create the multer upload handler
// const upload = multer({ storage });


// module.exports = upload;

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder:'vide0share-app',
        resource_type:'video',
        allowed__formats:['mp4', 'mov', 'avi']
    }
})

module.exports = {
    cloudinary, storage
}