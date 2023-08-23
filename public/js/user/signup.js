


const doSignup = () => {
    if (nameValidation() && emailValidation() && passwordValidation() && password2Validation()) {
        let formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        fetch('/register', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then((data) => {
            window.location.href = '/loginPage';
        });
    } else {
        return false;
    }
}


// signup validation

const nameValidation = () =>{
    var text = document.getElementById('name').value.trim();
    var regex = /^[A-Za-z][A-Za-z\s\.]*[A-Za-z]$/;
    if (regex.test(text)) {
        document.getElementById('error-name').innerHTML = "";
        return true;
    } else if (text === "") {
        document.getElementById('error-name').innerHTML = "Name cannot be empty";
        return false;
    } else {
        document.getElementById('error-name').innerHTML = "Enter correct name";
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

const passwordValidation = () => {
    var text = document.getElementById('password').value;
    var hasLetter = /[A-Za-z]/.test(text);
    var hasDigit = /\d/.test(text);
    var hasSpecialChar = /[@$!%*#?&]/.test(text);
    var hasNoWhiteSpace = /^\S+$/.test(text); // Check for no white spaces
    var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (regex.test(text) && hasNoWhiteSpace) {
        document.getElementById('error-password').innerHTML = "";
        return true;
    } else {
        var errorMessage = "Password must meet the following requirements:";
        if (!hasLetter) {
            errorMessage += " at least one letter,";
        }
        if (!hasDigit) {
            errorMessage += " at least one digit,";
        }
        if (!hasSpecialChar) {
            errorMessage += " at least one special character (@$!%*#?&),";
        }
        if (!hasNoWhiteSpace) {
            errorMessage += " no white spaces,";
        }
        if (text.length < 8) {
            errorMessage += " minimum length of 8 characters,";
        }
        errorMessage = errorMessage.replace(/,$/, "");
        document.getElementById('error-password').innerHTML = errorMessage;
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