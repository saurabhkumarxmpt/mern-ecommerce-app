const express=require('express');
const router=express.Router();

const authRoutes=require('./authRoutes');
const dashboardData=require('./dashboardRoute');

router.use('/auth',authRoutes);
router.use('/dashboard',dashboardData);


module.exports=router;