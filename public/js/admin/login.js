


const doLogin=(event)=>{
    event.preventDefault();
    let loginData={};
    loginData.email=document.getElementById('email').value;
    loginData.password=document.getElementById('password').value;


    fetch('/admin/login',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
    }).then(response=>response.json())
    .then(data=>{
        if(data.login){
            window.location.href='/admin/uploads';
            console.log(data);
        }else{
            document.getElementById('warning').innerHTML="Invalid credentials";
            setTimeout(()=>{
                document.getElementById('warning').innerHTML="";
            },3000)
        }
    })
}

function togglePasswordVisibility() {
    let passwordInput = document.getElementById("password");
    let passwordToggle = document.querySelector("password-toggle");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.innerHTML = '<i class="fi fi-sr-eye-off"></i>';
    } else {
        passwordInput.type = "password";
        passwordToggle.innerHTML = '<i class="fi fi-sr-eye"></i>';
    }
}