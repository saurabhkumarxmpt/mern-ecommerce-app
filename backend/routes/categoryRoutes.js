const express=require('express');
const {
    createCategory,
    getAllCategory
}=require('../controllers/categoryController');

const router=express.Router();

router.post('/create',createCategory);
router.get('/',getAllCategory);



module.exports=router;