const Product=require('../models/Product');

//create a new product
exports.createProduct=async(req,res)=>{
    try{

        const images=req.files ? req.files.map((file) =>  file.path) : [];

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
        console.log(req.body);
        console.log(req.files);

    }catch(err){
        res.status(500).json({message:err.message});
    }
}


//find products by category
exports.getProductsByCategory=async(req,res)=>{
    try{
        const {category}=req.params;
        
        const products=await Product.findOne({category})
        .populate("category", "name")
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
        .populate("category", "name")
        .limit(8)
        .select("name price images category");
        
        const latest=await Product.find()
        .populate("category", "name")
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



//get single product by id
exports.getSingleProduct=async(req,res)=>{
    try{

        const {id}=req.params;

        const product=await Product.findById(id).populate("category", "name");

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
const Category = require("../models/Category"); // ensure import

exports.getProducts = async (req, res) => {
    try {
        const { search, category, min, max, sort, tag } = req.query;

        let filter = {};

        // 🔍 SEARCH (name + tags + category name)
        if (search) {
            // category name search
            const categories = await Category.find({
                name: { $regex: search, $options: "i" }
            });

            const categoryIds = categories.map(cat => cat._id);

            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } },
                { category: { $in: categoryIds } }
            ];
        }

        // 🎯 filter by specific category (dropdown etc.)
        if (category) {
            filter.category = category;
        }

        // 🏷️ tag filter
        if (tag) {
            filter.tags = tag;
        }

        // 💰 price filter
        if (min || max) {
            filter.price = {};
            if (min) filter.price.$gte = Number(min);
            if (max) filter.price.$lte = Number(max);
        }

        // 🔃 sorting
        let sortOption = {};
        if (sort === "low") sortOption.price = 1;
        if (sort === "high") sortOption.price = -1;

        const products = await Product.find(filter)
            .sort(sortOption)
            .populate("category", "name");

        res.status(200).json({
            count: products.length,
            products
        });

    } catch (err) {
        console.error(err); // 🔥 important for debugging
        res.status(500).json({ message: err.message });
    }
};




//get the related products of the spacific category
exports.relatedProducts=async(req,res)=>{
    
    const {id}=req.params;

    const currentProduct=await Product.findById(id);

    if(!currentProduct){
        return res.status(404).json({message:"product not found"});
    }

    const relatedProducts=await Product.find({
        _id:{$ne: id},
        category:currentProduct.category?.name,
        tags:{$in:currentProduct.tags}
    }).limit(8).populate("category", "name");

    res.json(relatedProducts);
}


exports.getAllProducts=async(req,res)=>{
    try{

        const products=await Product.find()
        .populate("category","name")
        .sort({createdAt: -1 });
        
        res.status(200).json({
            totalProducts: products.length,
            products
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.updateProduct = async (req, res) => {
  try {

    const { id } = req.params;

    let {
      name,
      description,
      price,
      category,
      isFeatured,
      stock,
      tags
    } = req.body;

    if (tags && typeof tags === "string") {
      tags = tags.split(",");
    }

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    let images = [...product.images];

    if (req.files && req.files.length > 0) {

      req.files.forEach((file) => {

        const parts = file.fieldname.split("_");

        if (parts.length > 1) {
          const index = parseInt(parts[1]);
          images[index] = file.path;
        }

      });

    }

    product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        isFeatured,
        stock,
        tags,
        images
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product
    });

  } catch (err) {

    console.error("ERROR 👉", err);
    res.status(500).json({
    success: false,
    message: err.message,
  });

  }
};



exports.deleteProduct=async(req,res)=>{
    try{
        const{id}=req.params;

        const product=await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message:"product not found"});
        }

        res.status(200).json({message:"product deleted"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}   