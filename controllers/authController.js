//const catchAsyncError = require('../middlewares/catchAsyncError') 
 const User = require('../models/userModel')
exports.registerUser=  async(req,res,next)=>{
      const {name,email,password,avatar}=req.body
      const user = await User.create({
        name,
        email,
        password,
        avatar
      });
      res.staus(201).json({
        success:true,
        user
      })
}