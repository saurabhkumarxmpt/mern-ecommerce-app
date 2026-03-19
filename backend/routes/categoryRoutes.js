const express=require('express');
const {
    createCategory,
    getAllCategory,
    editCategory,
    deleteCategory
}=require('../controllers/categoryController');
const router=express.Router();


//all Categories routes
router.get('/',getAllCategory); //get all Categories
router.post('/create',createCategory); //craete a category
router.put('/update/:id',editCategory); //edit a category
router.delete('/delete/:id',deleteCategory); //delete the category

module.exports=router;