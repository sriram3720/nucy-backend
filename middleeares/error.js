module.exports =(err,req,res,next) =>{
    err.statusCode = err.statusCode || 500 ;

    res.status(err.statusCode).json({
        success:err.message,
        message:err.stack
    }])
}