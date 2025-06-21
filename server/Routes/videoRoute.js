const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/VideoController');
const authMiddleware = require('../Middleware/authMiddleware');
const upload = require('../Middleware/videoMiddleware');


router.post('/upload', authMiddleware, upload.single('video'), videoController.uploadVideo);
router.get('/getVideo', authMiddleware, videoController.getVideos);

module.exports = router;
