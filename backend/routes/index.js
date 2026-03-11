const express=require('express');


//user routes
const userRoutes=require('./userRoutes');
const productRoutes=require('./productRoutes');
const categoryRoutes=require('./categoryRoutes');
const orderRoutes=require('./orderRoutes');


const router=express.Router();

router.use('/user',userRoutes);
router.use('/product',productRoutes);
router.use('/category',categoryRoutes);
router.use('/orders',orderRoutes);


module.exports=router;