const Video = require("../Models/Video");

const uploadVideo = async (req, res) => {
    try{
        const {title, description} = req.body;
        const filePath = req.file.path;
        const newVideo = new Video({
            title, description, filePath, uploader:req.user.id 
        });

        await newVideo.save();
        return res.status(200).json({
            success:true,
            message:"Video uploaded"
        })
    }catch(error){
        console.error('Error in upload video', error.message);
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};


const getVideos = async (req, res) => {
    try{
        const data = await Video.find().populate('uploader', 'username').sort({_id:-1});

        return res.status(200).json({
            success:true,
            data
        })
    }catch(error){
        console.error('Error in get videos', error.message);
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
}

module.exports = { uploadVideo , getVideos }