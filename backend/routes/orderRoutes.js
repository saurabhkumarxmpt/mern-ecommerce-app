const express=require('express');

const {
    createOrder,
    getOrders,
    getAllOrders,
    getTodayOrders,
    updateOrderStatus
    }=require("../controllers/user/orderController");
const {authMiddleware}=require("../middlewares/authMiddleware");

const router=express.Router();

router.post('/',authMiddleware,createOrder);
router.get('/my-orders',authMiddleware,getOrders);
router.get('/all-orders',getAllOrders);
router.get('/today',getTodayOrders);
router.put('/update/:id',updateOrderStatus);


module.exports=router;