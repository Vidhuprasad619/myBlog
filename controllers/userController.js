const mongoose=require('mongoose');
const USER=require('../models/userModel').users;
const HOMEDATA=require('../pageData/homPageData').homeData;
const BLOGS=require('../models/blogSchema');
const jwt=require('jsonwebtoken');


const homePage=(req,res)=>{
    res.render("user/home.hbs",{homeData:HOMEDATA});
}

const signupPage=(req,res)=>{
    res.render('user/signup.hbs');
}

const loginPage=(req,res)=>{
    if(req.cookies.userJwt){
        res.redirect('/home');
    }else{
        res.render('user/login.hbs');
    }    
}

const detailedView=(req,res)=>{
    BLOGS.find({_id:req.query.id}).then((response)=>{
        res.render('user/detailedView.hbs',{detailedData:response[0]});
    }).catch(err => {
        console.error('Error fetching blog posts:', err);
        res.status(500).send('Internal Server Error');
    });

}

const homePage2=(req,res)=>{
    BLOGS.find().then((response)=>{
        res.render('user/home2.hbs',{home2Data:response});
    }).catch(err => {
        console.error('Error fetching blog posts:', err);
        res.status(500).send('Internal Server Error');
    });
}

const logout=(req,res)=>{
    res.cookie('userJwt',null,{
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1
    })
    req.cookies.userJwt=null;
    res.redirect('/loginPage');
}

const doSignUp=(req,res)=>{
    console.log(req.body);
    USER({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).save().then(()=>{
        res.json({signup:true})
    }).catch((err)=>{
        console.error('Error saving user:', err);
        res.json({signup: false});
    })
    

}

const doLogIn=(req,res)=>{
    USER.find({email:req.body.email,password:req.body.password}).then((response)=>{
        if(response.length > 0){
            
            const token=jwt.sign({userId:response[0]._id},"secretkey",{
                expiresIn:'2d'
            })
            res.cookie('userJwt',token,{
                httpOnly:true,
                samSite:'lax',
                secure:false,
                maxAge:24*60*60*1000
            })
            
            res.status(200).json({login:true});
        }else{
            res.json({login:false});
        }
    })
}


module.exports={signupPage,loginPage,homePage,doSignUp,doLogIn,homePage2,detailedView,logout}