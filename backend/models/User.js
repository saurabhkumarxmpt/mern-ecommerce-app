const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    cart:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ]

},{timestamps:true});

export default mongoose.model('users',userSchema);