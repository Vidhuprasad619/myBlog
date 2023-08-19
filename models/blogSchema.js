const mongoose=require('mongoose');


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    createdByUser:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    createdByAdmin:{
        type:mongoose.Types.ObjectId,
        ref:'admins'
    },
    content:{
        type:String,
        required:true
    },
    images:[]
})

const blogs=mongoose.model('blogs',blogSchema);

module.exports=blogs;





