const ADMIN=require('../models/adminModel').admins;
const multer = require("multer");
const BLOGS=require('../models/blogSchema');
const jwt=require('jsonwebtoken');


const loginPage=(req,res)=>{
    res.render('admin/login.hbs');
}

const uploadPage=(req,res)=>{
    res.render('admin/uploads.hbs');
}


const doLogIn=(req,res)=>{
    try{
        ADMIN.find({email:req.body.email,password:req.body.password}).then((response)=>{
            if(response.length > 0){
                
                const token=jwt.sign({adminId:response[0]._id},process.env.JWT_KEY2,{
                    expiresIn:'2d'
                })
                res.cookie('adminJwt',token,{
                    httpOnly:true,
                    samSite:'lax',
                    secure:false,
                    maxAge:24*60*60*1000
                })
                
                res.status(200).json({login:true});
            }else{
                res.redirect('error/error.hbs');
            }
        })
    }catch(err){
        console.error('Error during login:', err);
        res.render('error/error.hbs');
    }
}



const createBlog=(req,res)=>{
    try{
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
            if (err) {
                console.error('Error uploading images:', err);
                return res.redirect('error/error.hbs');
            }
            try{
                BLOGS({title:req.body.title,
                        category:req.body.category,
                        createdByAdmin:req.query.id,
                        content:req.body.content,
                        images:req.files,
                    }).save().then(()=>{
                        res.redirect('/admin/uploads')
                    })
            }catch(err){
                console.error('Error saving blog:', err);
                res.redirect('error/error.hbs');
            }   
        });
    }catch(err){
        console.error('Error uploading images:', err);
        res.render('error/error.hbs');
    }
   
}

const logout=(req,res)=>{
    try{
        res.cookie('adminJwt',null,{
            httpOnly:true,
            samSite:'lax',
            secure:false,
            maxAge:1
        })
        req.cookies.adminJwt=null;
        res.redirect('/admin');
    }catch(err){
        console.error('Error during logout:', err);
        res.render('error/error.hbs');
    }

}



module.exports={loginPage,doLogIn,uploadPage,createBlog,logout};