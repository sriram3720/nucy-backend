const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        reqiured:[true,"pleae enter product name"],
        trim:true,
        maxLength:[100,"product name cannot exceed 100 characters"]
    }
})