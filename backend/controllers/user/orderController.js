const Order=require("../../models/Orders");

exports.createOrder=async(req,res)=>{
    try{
        const {orderItems,shippingAddress,totalPrice}=req.body;

        if(orderItems.length === 0){
            return res.status(400).json({message:"No order items"});
        }

        const order= new Order({
            user:req.user.id,
            orderItems,
            shippingAddress,
            totalPrice
        });

        const createOrder=await order.save();
        
        res.status(201).json(createOrder);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.getOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user.id})
        .sort({createdAt:-1});

        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}