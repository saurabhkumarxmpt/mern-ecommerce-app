const Category=require('../models/Category');

exports.createCategory=async(req,res)=>{
    try{
        const{name, description }=req.body;

        const category=new Category({
            name,
            description
        });

        await category.save();

        res.status(201).json({
            message:"Category created successfully",
            data:category
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


exports.getAllCategory=async(req,res)=>{
    try{
        const category=await Category.find();

        res.status(200).json({
            category
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
}