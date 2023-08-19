

const ADMIN=require('../models/adminModel').admins;
const mongoose=require('mongoose');


const getAdminData=(adminId)=>{
   return ADMIN.find({_id:adminId},{password:0});
}


module.exports=getAdminData;