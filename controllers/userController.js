const mongoose=require('mongoose');
const USER=require('../models/userModel').users;

const homePage=(req,res)=>{
    res.render("home.hbs");
}

const signupPage=(req,res)=>{
    res.render('signup.hbs');
}

const loginPage=(req,res)=>{
    res.render('login.hbs');
    
}

const homePage2=(req,res)=>{
    req.render('home2.hbs');
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
            res.json({login:true});
        }else{
            res.json({login:false});
        }
    })
}


module.exports={signupPage,loginPage,homePage,doSignUp,doLogIn,homePage2}