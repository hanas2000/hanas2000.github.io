var newName = document.getElementById("inputName");
var newSurname = document.getElementById("inputSurname");
var newPassport = document.getElementById("inputPassport");
var newDriverLicence = document.getElementById("inputDriverLicence");
var newBirthday = document.getElementById("inputDateOfBirthday");
var newCity = document.getElementById("inputCity");
var newCard = document.getElementById("inputCard");
var newPhone = document.getElementById("inputPhone");
var newPassword = document.getElementById("inputPassword");
var newRepeatPassword = document.getElementById("inputRepeatPassword");

var id = localStorage.getItem('id');
var apiKey = localStorage.getItem('apiKey');
var json;

var isValid;

function ValidateName() {
    var nameformat = /^[a-zA-z]{2,20}$/;
    if (newName.value.match(nameformat) && newName.value != "") {
        return true;
    } else {
        return false;
    }
}

function ValidateSurname() {
    var surnameformat = /^[a-zA-z]{2,20}$/;
    if (newSurname.value.match(surnameformat) && newSurname.value != "") {
        return true;
    } else {
        return false;
    }
}

function ValidateCity() {
    var cityformat = /^[a-zA-z]{2,20}$/;
    if (newCity.value.match(cityformat) && newCity.value != "") {
        return true;
    } else {
        return false;
    }
}

function ValidateBirthday() {
    var birthdayformat = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
    if (newBirthday.value.match(birthdayformat) && newBirthday.value != "") {
        return true;
    } else {
        return false;
    }
}

function ValidatePhoneNumber() {
    var phoneformat = /^((\+38)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if (newPhone.value.match(phoneformat) && newPhone.value != "") {
        return true;
    } else {
        return false;
    }
}

function ValidatePassword() {
    var passformat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$/;
    if (newPassword.value.match(passformat) && newPassword.value == newRepeatPassword.value && newPassword.value != "") {
        return true;
    } else {
        return false;
    }
}

function validation() {
    if (ValidateName()) {
        newName.style.borderColor = "black";
        isValid = true;
    }
    if (ValidateSurname()) {
        newSurname.style.borderColor = "black";
        isValid = true;
    }
    if (ValidateCity()) {
        newCity.style.borderColor = "black";
        isValid = true;
    }
    if (ValidateBirthday()) {
        newBirthday.style.borderColor = "black";
        isValid = true;
    }
    if (ValidatePhoneNumber()) {
        newPhone.style.borderColor = "black";
        isValid = true;
    }
    if (ValidatePassword()) {
        newPassword.style.borderColor = "black";
        newRepeatPassword.style.borderColor = "black";
        isValid = true;
    }
    if (!ValidateName()) {
        newName.style.borderColor = "red";
        isValid = false;
    }
    if (!ValidateSurname()) {
        newSurname.style.borderColor = "red";
        isValid = false;
    }
    if (!ValidateCity()) {
        newCity.style.borderColor = "red";
        isValid = false;
    }
    if (!ValidateBirthday()) {
        newBirthday.style.borderColor = "red";
        isValid = false;
    }
    if (!ValidatePhoneNumber()) {
        newPhone.style.borderColor = "red";
        isValid = false;
    }
    if (!ValidatePassword()) {
        newPassword.style.borderColor = "red";
        newRepeatPassword.style.borderColor = "red";
        isValid = false;
    }
}

function updateUser() {
    var fields = document.getElementById("fields-empty");
    var isNotNull = apiKey != null && newCity.value != "" && newCard.value != "" && newBirthday.value != "" && newDriverLicence.value != "" && json.email != "" && newName.value != "" && newPassport.value != "" && newPassword.value != "" && newPhone.value != "" && newSurname.value != "";

    if (isNotNull) {
        validation();
        if (isValid) {
            var newUser = getNewUser();

            fields.style.display = "none";

            var request = new XMLHttpRequest();
            request.open('PUT', 'https://rentik.herokuapp.com/Rentik/user/' + id, true);
            // request.open('PUT', 'http://localhost:8080/Rentik/user/' + id, true);
            request.setRequestHeader('Content-type', 'application/json');

            request.addEventListener("readystatechange", () => {
                if (request.status === 200) {
                    json = JSON.parse(request.responseText);
                    window.location.href = "user-page.html";
                }
            });

            request.send(newUser);
        }
    } else {
        fields.style.display = "block";
    }
}

function getNewUser() {
    return JSON.stringify({
        "apiKey": apiKey,
        "city": newCity.value,
        "creditCard": newCard.value,
        "dateOfBirth": newBirthday.value,
        "driverLicence": newDriverLicence.value,
        "email": json.email,
        "name": newName.value,
        "passport": newPassport.value,
        "password": newPassword.value,
        "phoneNumber": newPhone.value,
        "surname": newSurname.value
    });
}

function onLoad() {
    if (apiKey != null) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://rentik.herokuapp.com/Rentik/user/' + id, true);
        // request.open('GET', 'http://localhost:8080/Rentik/user/' + id, true);

        request.addEventListener("readystatechange", () => {
            if (request.status === 200) {
                json = JSON.parse(request.responseText);
                if (json.name == null) {
                    edit_user();
                } else {
                    fillFields();
                }
            } else {
                logOut();
            }
        });

        request.send();
    } else {
        window.location.href = "login.html";
    }
}

function fillFields() {
    var name = document.getElementById("name");
    var passport = document.getElementById("passport");
    var driverLicence = document.getElementById("driver-licence");
    var email = document.getElementById("e-mail");
    var phoneNumber = document.getElementById("phone-number");
    var birthday = document.getElementById("date-of-birth");
    var city = document.getElementById("city");
    var creditCard = document.getElementById("creditCard");
    var car = document.getElementById("car");
    var carTitle = document.getElementById("car-title");

    if(json.car!= null){
        car.style.display = "block";
        carTitle.style.display = "block";
        car.innerHTML = json.car.name;
    }else{
        car.style.display = "none";
        carTitle.style.display = "none";
    }

    if (json.email.length > 10) {
        newEmail = json.email.substring(0, 10) + " " + json.email.substring(10);
    }
    name.innerHTML = json.name + " " + json.surname;
    passport.innerHTML = json.passport;
    driverLicence.innerHTML = json.driverLicence;
    birthday.innerHTML = json.dateOfBirth;
    city.innerHTML = json.city;
    creditCard.innerHTML = json.creditCard;
    phoneNumber.innerHTML = json.phoneNumber;
    email.innerHTML = newEmail;
}


function edit_user() {
    document.getElementById("fill").style.display = "block";

    if (json.name != null) {
        newName.value = json.name;
    }
    if (json.surname != null) {
        newSurname.value = json.surname;
    }
    if (json.passport != null) {
        newPassport.value = json.passport;
    }
    if (json.driverLicence != null) {
        newDriverLicence.value = json.driverLicence;
    }
    if (json.dateOfBirth != null) {
        newBirthday.value = json.dateOfBirth;
    }
    if (json.city != null) {
        newCity.value = json.city;
    }
    if (json.creditCard != null) {
        newCard.value = json.creditCard;
    }
    if (json.phoneNumber != null) {
        newPhone.value = json.phoneNumber;
    }
    if (json.password != null) {
        newPassword.value = json.password;
        newRepeatPassword.value = json.password;
    }
}

function closeEditUser() {
    var isNotNull = apiKey != null && newCity.value != "" && newCard.value != "" && newBirthday.value != "" && newDriverLicence.value != "" && json.email != "" && newName.value != "" && newPassport.value != "" && newPassword.value != "" && newPhone.value != "" && newSurname.value != "";

    if (isNotNull) {
        document.getElementById("fill").style.display = "none";
    }
}

function logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('apiKey');
    window.location.href = "login.html";
}


function readURL(input) {
    var formData = new FormData();
    formData.append("file", document.getElementById("photo_input").files[0]);
    var info = JSON.stringify({"apiKey": apiKey});
    var request = new XMLHttpRequest();
    console.log('https://rentik.herokuapp.com/Rentik/user/' + id + '/image?file=' + formData.toString());

    request.open('POST', 'https://rentik.herokuapp.com/Rentik/user/' + id + '/image', true);
    // request.open('POST', 'http://localhost:8080/Rentik/user/' + id + '/image?file=' + formData, true);
    request.setRequestHeader("Content-Type", "multipart/form-data");
    // request.setRequestHeader('Content-type', 'application/json');

    request.addEventListener("readystatechange", () => {

        if (request.readyState === 4 && request.status === 200) {
            var json = JSON.parse(request.responseText);
            console.log(json);
            // localStorage.setItem('id', json.id);
            // localStorage.setItem('apiKey', json.apiKey);
            // window.location.href = "main-menu.html";
        }

    });

    request.send();
}