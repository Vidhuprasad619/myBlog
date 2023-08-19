const express=require('express');
const router=express.Router();
const {loginPage,doLogIn,uploadPage,createBlog,logout}= require('../controllers/adminController');
const adminAuth=require('../middlewares/adminAuth');

router.get('/',loginPage);
router.post('/login',doLogIn);
router.get('/uploads',adminAuth,uploadPage);
router.post('/createBlog',createBlog);
router.get('/logout',logout);



module.exports=router;
