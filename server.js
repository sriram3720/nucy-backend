const connectDatabase = require('./database.js');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({path:"config/config.env"});


connectDatabase();
app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port :${process.env.PORT}`)
})