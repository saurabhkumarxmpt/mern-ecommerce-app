const express=require('express');
const {
    createCategory,
    getAllCategory,
    editCategory
}=require('../controllers/categoryController');

const router=express.Router();

router.get('/',getAllCategory);
router.post('/create',createCategory);
router.put('/update/:id',editCategory);



module.exports=router;