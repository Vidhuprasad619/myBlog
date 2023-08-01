


const doLogin=()=>{
    let loginData={};
    loginData.email=document.getElementById('email').value;
    loginData.password=documente.getElementById('password').value;


    fetch('/login',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
    }).then(response=>response.json())
    .then(data=>{
        if(data.login){
            window.location.href='/home';
            console.log(data.login)

        }else{
            document.getElementById('warning').innerHTML="Invalid credentials";
            setTimeout(()=>{
                document.getElementById('warning').innerHTML="";
            },3000)
        }
    })
}