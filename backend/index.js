require('dotenv').config();
const express=require('express');
const app=express();
const PORT=process.env.PORT;
const database=require('./config/database');
const routes=require('./routes/index');
const cors=require('cors');

app.use(express.json());
database();
app.use(cors());
app.use('/api',routes);
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
