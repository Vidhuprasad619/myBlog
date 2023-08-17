


const doSignup=()=>{

    let formData={};
    formData.name=document.getElementById('name').value;
    formData.email=document.getElementById('email').value;
    formData.password=document.getElementById('password').value;
    
    fetch('/register',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    }).then(response=>response.json())
    .then((data)=>{
        window.location.href='/loginPage'
        console.log(data.signup);
    })

    nameValidation();
    emailValidation();
    passwordValidation();
    password2Validation();

    if(nameValidation() && emailValidation() && passwordValidation() && password2Validation()){
        return true;
    }else{
        return false;
    }
}


// signup validation

const nameValidation = () =>{
    var text = document.getElementById('name').value;
    var regex = /^([A-Za-z\.]+)$/;
    if(regex.test(text)){
        document.getElementById('error-name').innerHTML="";
        return true;
    }else{
        document.getElementById('error-name').innerHTML="Eneter correct name";
        return false;
    }
}

const emailValidation = () =>{
    var text = document.getElementById('email').value;
    var regex = /^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/;
    if(regex.test(text)){
        document.getElementById('error-email').innerHTML="";
        return true;
    }else{
        document.getElementById('error-email').innerHTML="Eneter correct email";
        return false;
    }
}

const passwordValidation =()=>{
    var text = document.getElementById('password').value;
    var regex = /^(.{5,})$/;
    if(regex.test(text)){
        document.getElementById('error-password').innerHTML="";
        return true; 
    }else{
        document.getElementById('error-password').innerHTML="5 or more characters required";
        return false;
    }
}

const password2Validation =()=>{
    var password1 = document.getElementById('password').value;
    var password2 = document.getElementById('password2').value;
    if(password1===password2){
        document.getElementById('error-password2').innerHTML="";
        return true;
    }else{
        document.getElementById('error-password2').innerHTML=" Passwords do not match";
        return false;
    }
}

const togglePasswordVisibility=()=> {
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

const togglePasswordVisibility2=()=> {
    let passwordInput = document.getElementById("password2");
    let passwordToggle = document.querySelector("password-toggle");
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.innerHTML = '<i class="fi fi-sr-eye-off"></i>';
    } else {
        passwordInput.type = "password";
        passwordToggle.innerHTML = '<i class="fi fi-sr-eye"></i>';
    }
}