const Product=require('../models/Product');

//create a new product
exports.createProduct=async(req,res)=>{
    try{

        const images=req.files.map((file) =>  file.path);

        const{
            name,
            description,
            price,
            category,
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


//find products by category
exports.getProductsByCategory=async(req,res)=>{
    try{
        const {category}=req.params;
        
        const products=await Product.findOne({category})
        .limit(20)
        .select("name price images");

        res.status(200).json(products);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


//get products for homepage
exports.getHomePageProducts=async(req,res)=>{
    try{
        const featured =await Product.find({isFeatured: true})
        .limit(6)
        .select("name price images");
        
        const latest=await Product.find()
        .sort({createdAt: -1 })
        .limit(6)
        .select("name price images");

        res.status(200).json({
            featured,
            latest
        });
     }catch(err){
        res.status(500).json({message:err.message});
     }

}


exports.getSingleProduct=async(req,res)=>{
    try{

        const {id}=req.params;

        const product=await Product.findById(id);

        if(!product){
            return res.status(404).json({
                message:"product not found"
            })
        }

        res.status(200).json(product);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}