const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    filePath:{type:String},
    uploader:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
},{timestamps:true});


module.exports = mongoose.model('Video', videoSchema);