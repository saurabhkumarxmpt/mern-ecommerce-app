const express=require('express');
const {
    createCategory,
    getAllCategory,
    editCategory,
    deleteCategory
}=require('../controllers/categoryController');

const router=express.Router();

router.get('/',getAllCategory);
router.post('/create',createCategory);
router.put('/update/:id',editCategory);
router.delete('/delete/:id',deleteCategory);



module.exports=router;