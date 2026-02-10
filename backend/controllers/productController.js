const Product=require('../models/Product');


exports.createProduct=async(req,res)=>{
    try{
        const{
            name,
            description,
            price,
            category,
            images,
            stock,
            tags
        }=req.body;

        if(!name || !description || !price || !category){
            return res.status(400).json({
                message:"All required fields must be filled"
            });
        };

        const product=await Product.create({
            name,
            description,
            price,
            category,
            images,
            stock,
            tags
        });

        res.status(201).json({
            message:"Product Created Successfully",
            product
        });

    }catch(err){
        res.status(500).json({message:err.message});
    }
}