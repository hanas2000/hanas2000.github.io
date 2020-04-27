function onLoad() {
    var apiKey = localStorage.getItem('apiKey');
    if (apiKey == null) {
        var userPage = document.getElementsByClassName("user-page")[0];
        var logOut = document.getElementsByClassName("log-out")[0];
        userPage.style.display = "none";
        logOut.style.display = "none";
    }
}

function logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('apiKey');
    window.location.href = "login.html";
}