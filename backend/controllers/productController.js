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
            isFeatured,
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
            isFeatured,
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
        .limit(8)
        .select("name price images category");
        
        const latest=await Product.find()
        .sort({createdAt: -1 })
        .limit(4)
        .select("name price images category");

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

 // Get Products via user search
exports.getProducts=async(req,res)=>{
    try{
        const {search,category,min,max,sort,tag}=req.query;

        let filter={};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } },
                { category: {$regex: search, $options: "i"} }
        ];
        }

        if (category) filter.category = category;
        if (tag) filter.tags = tag;

        if (min && max) {
            filter.price = { $gte: Number(min), $lte: Number(max) };
        }

        let sortOption = {};
        if (sort === "low") sortOption.price = 1;
        if (sort === "high") sortOption.price = -1;

        const products=await Product.find(filter).sort(sortOption);
        res.status(200).json({
            count:products.length,
            products
        });

    }catch(err){
        res.status(500).json({message:err.message})
    }
}