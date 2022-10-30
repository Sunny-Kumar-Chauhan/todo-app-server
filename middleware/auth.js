
const jwt = require('jsonwebtoken')
const userModel = require('../db/Usermodel')


module.exports = isAuthenticated = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        //console.log(token)

        if(!token){
           return res.status(400).json({success:false,message:"Login first"})

        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

       req.user = await userModel.findById(decoded._id)

       next();
    } catch (error) {
       return   res.status(400).json({success:false,message:error.message})
    }
}