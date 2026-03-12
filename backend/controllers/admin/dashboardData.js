const Product=require('../../models/Product');
const User=require('../../models/User');
const Order=require('../../models/Orders');

exports.getDashboardData=async(req,res)=>{

    try{

        const totalProducts=await Product.countDocuments();
        const totalOrders=await Order.countDocuments();
        const totalUsers=await User.countDocuments();

        const revenueData =await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalRevenue:{$sum:"$totalPrice"}
                }
            }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        const recentOrders =await Order
        .find()
        .sort({createdAt: -1})
        .limit(5)
        .populate("user", "name email")

        res.json({
            totalProducts,
            totalOrders,
            totalUsers,
            totalRevenue,
            recentOrders
        });
    }catch(error){
        res.status(500).json({
            message: "Dashboard data error",
            error: error.message
        });
    }
}