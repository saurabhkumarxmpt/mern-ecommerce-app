const User=require('../../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.registerUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;

        const userExist=await User.findOne({email});
        
        if(userExist) return res.status(400).json({message:"User already exists"});

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

exports.loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;

        //check if all fields are filled
        if(!email || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        //check user exist or not
        const user=await User.findOne({email});

        if(!user) return res.status(500).json({message:"user not found"});

        //check the password
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(401).json({message:"password dose not matched"});

        //ganrate JWT token
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        //seccess message
        res.status(201).json({
            message:"login succesful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}