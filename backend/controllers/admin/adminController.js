const User=require('../../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.adminLogin=async(req,res)=>{
    try{
        const{email,password}=req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"admin in not found"});
        }

        if(user.role !== "admin"){
            return res.status(403).json({message:"not an admin"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"password not match"});
        }

        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        res.json({
            token,
            user
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
}