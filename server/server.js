const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const userRoutes = require('./Routes/userRoute');
const videoRoutes = require('./Routes/videoRoute');
const PORT = process.env.PORT || 8000;
const dotenv = require('dotenv');
dotenv.config();


//Connection to DB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB")
    }catch(error){
        console.error("Error connecting MongoDB");
        process.exit(1);
    }
};

connectDB();


//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, "/videos")));

app.use('/api', userRoutes);
app.use('/api', videoRoutes);

app.listen(PORT,() => {
    console.log("App is listening on PORT ", PORT);
});