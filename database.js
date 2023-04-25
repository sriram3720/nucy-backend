const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:"config/config.env"});

const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(con=>console.log(`mongodb is connected to the host :${con.connection.host}`))
    .catch(err=>console.log(`mongodb connection is failed`));
}

module.exports=connectDatabase;