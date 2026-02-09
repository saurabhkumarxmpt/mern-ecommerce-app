const User=require('../../models/User');
const bcrypt=require('bcrypt');

exports.registerUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const userExist=await User.findOne({email});
        
        if(!userExist) return res.status(400).json({message:"User already exists"});

        const hashedPassword= await bcrypt.hash(password,10);

        const newUser=await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            message:"User Registered Successfully",
            user:newUser
        });
        
    }catch(err){
        res.status(500).json({message:err.message});
    }
}