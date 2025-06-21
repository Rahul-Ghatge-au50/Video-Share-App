const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;

        if(!username || !email || !password){
            return res.status(401).json({
                success:false,
                message:"Missing required fields"
            })
        };

        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success:false,
                message:"User is already registed, use another email"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            username, email, password:hashPass
        });

        await newUser.save();

        return res.status(200).json({
            success:true,
            message:'Register Successfully',
        })
    }catch(error){
        console.error('Error in registerUser', error.message);
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Email and password is missing"
            });
        };

        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            });
        };

        const isPass = await bcrypt.compare(password, user.password);
        if(!isPass){
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            });
        };

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.status(200).json({
            success:true,
            message:"Login successfully",
            token:token,
        })
    }catch(error){
        console.error('Error in Loginuser', error.message);
        return res.status(500).json({ 
            success: false,
            message: 'Internal server error' 
        });
    }
};


module.exports = { registerUser, loginUser };