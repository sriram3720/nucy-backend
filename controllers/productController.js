exports.getProducts=(req,res,next)=>{
    res.status(200).json({
        succcess:true,
        message:"This route will show all the database"
    })
}

