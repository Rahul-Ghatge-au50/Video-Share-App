const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/VideoController');
const authMiddleware = require('../Middleware/authMiddleware');
const { storage }  = require('../Middleware/videoMiddleware');
const multer = require('multer');
const upload = multer({ storage })



router.post('/upload', authMiddleware, upload.single('video'), videoController.uploadVideo);
router.get('/getVideo', authMiddleware, videoController.getVideos);

module.exports = router;
