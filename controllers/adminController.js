const mongoose=require('mongoose');
const ADMIN=require('../models/adminModel').admins;
const multer = require("multer");
const BLOGS=require('../models/blogSchema');


const loginPage=(req,res)=>{
    res.render('admin/login.hbs');
}

const doLogIn=(req,res)=>{
    ADMIN.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length > 0){
            res.status(200).json({login:true});
        }else{
            res.json({login:false});
        }
    })
}

const uploadPage=(req,res)=>{
    res.render('admin/uploads.hbs');
}

const createBlog=(req,res)=>{
    const fileStorage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"public/uploads");
        },
        filename:(req,files,cb)=>{
            cb(null,Date.now()+"-"+files.originalname);
        }
    })
    const upload=multer({storage:fileStorage}).array("image",4);
    
    upload(req,res,(err)=>{
        console.log(req.files);
        BLOGS({title:req.body.title,
            category:req.body.category,
            content:req.body.content,
            images:req.files
    }).save().then(()=>{
        res.redirect('/admin/uploads')
    }).catch((err)=>{
        console.error('Error saving blog:', err);
        res.json({upload: false});
    })
    })
}



module.exports={loginPage,doLogIn,uploadPage,createBlog};