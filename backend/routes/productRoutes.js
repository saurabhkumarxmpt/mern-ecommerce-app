const express=require('express');
const{
    createProduct,
    getProductsByCategory,
    getSingleProduct,
    getHomePageProducts
}=require('../controllers/productController');

const router=express.Router();


router.post('/create',createProduct)
router.get('/homepageproducts',getHomePageProducts)
router.get('/category/:category',getProductsByCategory);
router.get('/:id',getSingleProduct);

module.exports=router;