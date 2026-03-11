const express=require('express');

const router=express.Router();

const {adminLogin}=require('../../controllers/admin/adminController');

router.post('/login',adminLogin);

module.exports=router;