const Product=require('../../models/Product'); 
const User=require('../../models/User'); 
const Order=require('../../models/Orders');

exports.getDashboardData = async (req,res)=>{
    try{

        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();

        const revenueData = await Order.aggregate([
            {
                $group:{
                    _id:null,
                    totalRevenue:{$sum:"$totalPrice"}
                }
            }
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        const recentOrders = await Order
        .find()
        .sort({createdAt:-1})
        .limit(5)
        .populate("user","name email");

        const lowStockProducts = await Product
        .find({stock:{ $lt:5 }})
        .select("name stock")
        .limit(5);

        const pendingOrders = await Order.countDocuments({orderStatus:"Processing"});

        const today = new Date();
        today.setHours(0,0,0,0);

        const todayOrders = await Order.countDocuments({
            createdAt:{ $gte: today }
        });

        const monthlyRevenue = await Order.aggregate([
            {
                $group: {
                _id: { $month: "$createdAt" },
                revenue: { $sum: "$totalPrice" }
                }
            },
            {
                $sort: { _id: 1 }
            }
            ]);

            const recentUsers =await User
            .find()
            .sort({createdAt: -1 })
            .limit(5)
            .select("name email createdAt")

        res.json({
            totalProducts,
            totalOrders,
            totalUsers,
            totalRevenue,
            pendingOrders,
            todayOrders,
            recentOrders,
            lowStockProducts,
            monthlyRevenue,
            recentUsers
        });

    }catch(error){
        res.status(500).json({
            message:"Dashboard data error",
            error:error.message
        });
    }
}
