exports.isAdmin =(req,res,next)=>{
    if(req.user.role !== "admin"){
        res.status(500).json({message:"access denied"});

    }
    next();
}