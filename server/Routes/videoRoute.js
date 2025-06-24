const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/VideoController');
const authMiddleware = require('../Middleware/authMiddleware');
const { storage }  = require('../Middleware/videoMiddleware');
const multer = require('multer');
const upload = multer({ storage })



router.post('/upload', authMiddleware.authMiddleware, upload.single('video'), videoController.uploadVideo);
router.get('/getVideo', authMiddleware.authMiddleware, videoController.getVideos);
router.delete('/delete/:id', authMiddleware.authMiddleware, authMiddleware.isAdmin, videoController.deleteVideo);

module.exports = router;
