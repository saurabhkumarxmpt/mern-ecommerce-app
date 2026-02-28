const User=require('../../models/User');


//get the user profile
exports.getProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select("-password");

        if(!user) return res.status(404).json({message:"user not found"});
        res.status(200).json({
            user
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


//Update the user profile
exports.updateProfile=async(req,res)=>{
    try{

        const userId=req.user.id;
        const updateUser=await User.findByIdAndUpdate(
            userId,
            req.body,
            {new:true}
        ).select("-password");  //password is not show on the frontend

        res.status(200).json({
            message:"Profile updated successfully",
            user:updateUser
        })
    }catch(err){
            res.status(500).json({message:err.message});
    }
}