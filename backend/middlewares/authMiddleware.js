const jwt=require('jsonwebtoken');

exports.authMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];

        if(!token) return res.status(401).json({message:"No Token"});

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        req.user=decoded;
        next();
    }catch(err){
        res.status(500).json({message:err.message})
    }
};