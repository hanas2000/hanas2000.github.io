const email = document.getElementById('email');
const password = document.getElementById('password');
const errorEmail = document.getElementsByClassName('errorEmail')[0];
const errorPassword = document.getElementsByClassName('errorPassword');
var isValid = true;

function ValidateEmail() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function ValidatePassword() {
    var passformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$/;
    if (password.value.match(passformat) && password.value == repeatPassword.value) {
        return true;
    } else {
        return false;
    }
}

function validation() {
    if (ValidateEmail()) {
        errorEmail.style.display = "none";
        email.style.borderColor = "black";
        isValid = true;
    }
    if (ValidatePassword()) {
        errorPassword[0].style.display = "none";
        errorPassword[1].style.display = "none";
        password.style.borderColor = "black";
        repeatPassword.style.borderColor = "black";
        isValid = true;
    }
    if (!ValidateEmail()) {
        errorEmail.style.display = "block";
        email.style.borderColor = "red";
        isValid = false;
    }
    if (!ValidatePassword()) {
        errorPassword[0].style.display = "block";
        errorPassword[1].style.display = "block";
        password.style.borderColor = "red";
        repeatPassword.style.borderColor = "red";
        isValid = false;
    }
}

function userExists() {
    document.getElementsByClassName('exists')[0].style.display = "block";
}

function signUp() {
    validation();
    document.getElementsByClassName('exists')[0].style.display = "none";
    if (isValid) {
        var newUser = JSON.stringify({
            "email": email.value,
            "password": password.value
        });
        var request = new XMLHttpRequest();

        request.open('POST', 'https://rentik.herokuapp.com/Rentik/register', true);
        // request.open('POST', 'http://localhost:8080/Rentik/register', true);
        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener("readystatechange", () => {
            if (request.status === 200) {
                window.location.href = "login.html";
            } else {
                userExists();
            }
        });
        request.send(newUser);
    }
    return false;
}