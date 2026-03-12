const express=require('express');

const router=express.Router();

const {getDashboardData}=require('../../controllers/admin/dashboardData');

router.get('/',getDashboardData);

module.exports=router;