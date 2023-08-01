const express=require('express');
const {signupPage,loginPage,homePage,doSignUp,doLogIn,homePage2} = require('../controllers/userController');
const router=express.Router();

router.get('/',homePage);
router.get('/signup',signupPage);
router.get('/loginPage',loginPage);
router.post('/register',doSignUp);
router.post('/login',doLogIn);
router.get('/home',homePage2)

  
module.exports=router;