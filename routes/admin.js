const express=require('express');
const router=express.Router();
const {loginPage,doLogIn,uploadPage,createBlog}= require('../controllers/adminController');

router.get('/',loginPage);
router.post('/login',doLogIn);
router.get('/uploads',uploadPage);
router.post('/createBlog',createBlog);

module.exports=router;