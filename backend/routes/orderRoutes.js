const express=require('express');

const {createOrder,getOrders}=require("../controllers/user/orderController");
const {authMiddleware}=require("../middlewares/authMiddleware");

const router=express.Router();

router.post('/',authMiddleware,createOrder);
router.get('/my-orders',authMiddleware,getOrders);


module.exports=router;