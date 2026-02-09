require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT;

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({message:"this is the home"});
});


app.listen(PORT,(err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.info("server run");
    }
})
