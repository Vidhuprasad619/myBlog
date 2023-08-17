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
    // createdBy:
    content:{
        type:String,
        required:true
    },
    images:[]
})

const blogs=mongoose.model('blogs',blogSchema);

module.exports=blogs;