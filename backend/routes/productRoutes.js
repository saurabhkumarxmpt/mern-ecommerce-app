const express=require('express');
const{
    createProduct,
    getProductsByCategory,
    getSingleProduct,
    getHomePageProducts,
    getProducts,
    relatedProducts,
    getAllProducts,
    updateProduct
}=require('../controllers/productController');

const upload=require('../middlewares/upload');
const {authMiddleware}=require('../middlewares/authMiddleware');
const {isAdmin} =require('../middlewares/isAdmin');
const router=express.Router();


router.post('/create',upload.array("images",5),authMiddleware,isAdmin,createProduct);
router.get('/homepageproducts',getHomePageProducts);
router.get('/',getProducts);
router.get('/allproducts',getAllProducts);
router.put('/update/:id',authMiddleware,isAdmin,upload.array("images"),updateProduct);
router.get('/category/:category',getProductsByCategory);
router.get('/:id',getSingleProduct);
router.get('/related/:id',relatedProducts);

module.exports=router;