const express=require('express');
const{
    createProduct,
    getProductsByCategory,
    getSingleProduct,
    getHomePageProducts
}=require('../controllers/productController');

const upload=require('../middlewares/upload');

const router=express.Router();


router.post('/create',upload.array("images",5),createProduct);
router.get('/homepageproducts',getHomePageProducts)
router.get('/category/:category',getProductsByCategory);
router.get('/:id',getSingleProduct);

module.exports=router;