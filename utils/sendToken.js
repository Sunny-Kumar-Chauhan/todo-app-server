module.exports = sendToken =(res,user,satusCode,message)=>{

    const token = user.getJWTToken()
    const options={
        httpOnly:true,
        expires:new Date(Date.now() + process.env.COOKIE_EXPIRE*45*24*60*60*1000) 
    }
    const userData={
        _id:user._id,
        name:user.name,
        email:user.email,
        avatar:user.avatar,
        tasks:user.tasks
    }
    res.status(satusCode).cookie('token',token,options).json({
        success:true,
        message,
        user:userData
    })
}