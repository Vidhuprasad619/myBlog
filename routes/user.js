const express=require('express');
const {signupPage,loginPage,homePage,doSignUp,doLogIn,homePage2,detailedView,logout} = require('../controllers/userController');
const router=express.Router();
const userAuth=require('../middlewares/userAuth')

router.get('/',homePage);
router.get('/signup',signupPage);
router.get('/loginPage',loginPage);
router.post('/register',doSignUp);
router.post('/login',doLogIn);
router.get('/home',userAuth,homePage2);
router.get('/detailedView',userAuth,detailedView);
router.get('/logout',logout)

  
module.exports=router;