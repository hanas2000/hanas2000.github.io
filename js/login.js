const email = document.getElementById('email');
const password = document.getElementById('password');
const errorEmail = document.getElementsByClassName('errorEmail')[0];
const errorPassword = document.getElementsByClassName('errorPassword')[0];
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
    if (password.value.match(passformat)) {
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
        errorPassword.style.display = "none";
        password.style.borderColor = "black";
        isValid = true;
    }
    if (!ValidateEmail()) {
        errorEmail.style.display = "block";
        email.style.borderColor = "red";
        isValid = false;
    }
    if (!ValidatePassword()) {
        errorPassword.style.display = "block";
        password.style.borderColor = "red";
        isValid = false;
    }
}

function signIn() {
    validation();
    if (isValid) {
        var newUser = JSON.stringify({
            "email": email.value,
            "password": password.value
        });
        var request = new XMLHttpRequest();

        request.open('POST', 'https://rentik.herokuapp.com/Rentik/login', true);
        // request.open('POST', 'http://localhost:8080/Rentik/login', true);
        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                var json = JSON.parse(request.responseText);
                localStorage.setItem('id', json.id);
                localStorage.setItem('apiKey', json.apiKey);
                window.location.href = "main-menu.html";
            }
        });

        request.send(newUser);
    }
    return false;
}