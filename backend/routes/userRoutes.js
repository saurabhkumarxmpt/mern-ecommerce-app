const express=require('express');

const{
    registerUser,
    loginUser
    }=require('../controllers/user/authController');

const{
    getProfile,
    updateProfile
}=require('../controllers/user/profileController');
const {authMiddleware}=require('../middlewares/authMiddleware');

const router=express.Router();

//User Auth
router.post('/register',registerUser);
router.post('/login',loginUser);


//User Profile
router.get('/profile',authMiddleware,getProfile);
router.put('/profile',authMiddleware,updateProfile);


module.exports=router;