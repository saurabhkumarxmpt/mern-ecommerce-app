const Order=require("../../models/Orders"); //import order schema

//create a new order
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


//get the all order for users
exports.getOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user.id})
        .sort({createdAt:-1});

        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}


//get all orders

exports.getAllOrders=async(req,res)=>{
    try{

        const orders=await Order.find()
        .populate("user","name,email")
        .populate("orderItems.product", "name price image")
        .sort({ createdAt: -1 })

        res.status(200).json({orders});
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

exports.getTodayOrders = async (req, res) => {
  try {

    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,0,0
    );

    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,59,59
    );

    const orders = await Order.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    })
      .populate("user", "name email")
      .populate("orderItems.product", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalTodayOrders: orders.length,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


exports.updateOrderStatus = async (req, res) => {

  try {

    const { orderStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
