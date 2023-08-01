const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send("this is admin page");
});

module.exports=router;