const Category=require('../models/Category');


//create a new category
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

//fetch all category list
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

//edit category

exports.editCategory=async(req,res)=>{
    try{
        const {id}=req.params;
        let {name,description}=req.body;

        let category=await Category.findById(id);

        if(!category) return res.status(404).json({message:"category not found"});

        category=await Category.findByIdAndUpdate(
            id,
            {
                name,
               description 
            }
        );

        res.status(200).json({message:"category updated"});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}