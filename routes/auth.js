
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register

const register = async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try{
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch(error){
        return res.status(500).json(error);
    }

}
//Login

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(!user) res.status(401).json("Wrong User Name!!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        
        const OrigialPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        if(OrigialPassword !== req.body.password) res.status(401).json("Wrong Crendentials!!");

        const accessToken = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin,

        }, process.env.JWT_SEC, { expiresIn: "3d"});

        const { password, ...others } = user._doc;

        return res.status(200).json({ ...others, accessToken });
    
    } catch (error) {
        return res.status(500).json(error)
        
    }
}

module.exports = {
    login,
    register,
};