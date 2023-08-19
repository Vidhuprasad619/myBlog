const jwt=require('jsonwebtoken');
const getAdminData=require('../helpers/adminHelpers');

const adminAuthentication=((req,res,next)=>{
    try{
        if(req?.cookies?.adminJwt){
            const isLoggedin=jwt.verify(req.cookies.adminJwt,process.env.JWT_KEY2);
            if(isLoggedin){
                const admin=parseJwt(req.cookies.adminJwt);
                getAdminData(admin.adminId).then(response=>{
                    res.locals.adminDetails=response[0]
                    next();
                    
                })
            }else{
                res.cookie('adminJwt',null,{
                    httpOnly:true,
                    samSite:'lax',
                    secure:false,
                    maxAge:1
                })
                req.cookies.adminJwt=null;
                res.redirect('/admin');
            }
        }else{
            res.redirect('/admin');
        }
    }catch(err){
        console.error('Authentication error:', err);
        res.render('error/error.hbs');
    }

})

module.exports=adminAuthentication;



function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}