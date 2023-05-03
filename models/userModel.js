const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter name']
    },
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        validate:[validator.isEmail, 'please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'please enter password'],
        maxLength:[6,'password cannot exceed 6 characters']
    },
    avatar:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    resetPasswordToken:{
       type:String
    },
    resetPasswordTokenExpire:{
        type:Date
     },
    createdAt:{
        type:Date,
        defaut:Date.now
    }
})

let model=mongoose.model('user',userSchema);
module.exports= model;