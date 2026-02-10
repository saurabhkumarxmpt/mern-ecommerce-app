const mongoose=require('mongoose');

const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        images:[
            {
                type:String
            }
        ],
        stock:{
            type:Number,
            required:true,
            default:0
        },
        tags:[
            {
                type:String
            }
        ],


    },
    {timestamps:true}
);

module.exports=mongoose.model('Product',productSchema);