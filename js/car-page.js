var apiKey = localStorage.getItem('apiKey');
var id = localStorage.getItem('id');
var criteria = null;

function onLoad() {
    if (apiKey != null) {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://rentik.herokuapp.com/Rentik/user/' + id, true);

        request.addEventListener("readystatechange", () => {
            if (request.status === 200) {
                json = JSON.parse(request.responseText);
                if (json.name == null) {
                    window.location.href = "user-page.html";
                }
            }
        });

        request.send();
    } else {
        window.location.href = "login.html";
    }
}

function searchCar() {
    var pickUpPlace = document.getElementById("pick-up-place");
    var dropOffPlace = document.getElementById("drop-off-place");
    var pickUpTime = document.getElementById("pick-up-time");
    var dropOffTime = document.getElementById("drop-off-time");
    var fields = document.getElementById("fields-empty");

    if (pickUpPlace != "" && pickUpTime != "" && dropOffTime != "" && dropOffPlace != "") {
        var birthdayformat = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
        if (!pickUpTime.value.match(birthdayformat)) {
            pickUpTime = pickUpTime.getFullYear() + '-' + (pickUpTime.getMonth()+1) + '-' + pickUpTime.getDate()
        }
        if (!dropOffTime.value.match(birthdayformat)) {
            dropOffTime = dropOffTime.getFullYear() + '-' + (dropOffTime.getMonth()+1) + '-' + dropOffTime.getDate()
        }

        fields.style.display = "none";
        criteria = JSON.stringify({
            "apiKey": apiKey,
            "dateFrom": pickUpTime.value,
            "dateTo": dropOffTime.value,
            "dropOff": dropOffPlace.value,
            "pickUp": pickUpPlace.value
        });

        var request = new XMLHttpRequest();

        request.open('POST', 'https://rentik.herokuapp.com/Rentik/user/' + id + '/rent/', true);
        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                var json = JSON.parse(request.responseText);
                console.log(json);
                for (var key in json) {
                    createDiv(json[key]);
                }
            }
        });

        request.send(criteria);
    } else {
        fields.style.display = "block";
    }
}

function createDiv(obj) {
    var mainDiv = document.getElementById("hello");

    var container = document.createElement('div');
    container.setAttribute('class', 'rent-car row');

    var imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'image col-md-6 col-xs-12');

    var img = document.createElement('img');
    img.setAttribute('src', obj.photo);
    img.setAttribute('class', 'photo');
    img.setAttribute('alt', 'car-photo');

    imgDiv.appendChild(img);

    var infoDiv = document.createElement('div');
    infoDiv.setAttribute('class', 'frame col-md-6 col-xs-12');

    var title = document.createElement('h2');
    title.setAttribute('class', 'heading-find');
    title.setAttribute('id', 'car-name' + obj.id);

    var test = document.createElement('p');
    test.setAttribute('id', 'text' + obj.id);

    var featureTitle = document.createElement('h4');
    featureTitle.setAttribute('id', 'feature' + obj.id);

    var ul = document.createElement('ul');

    var i = 1;
    for (var feature in obj.features) {
        var li = document.createElement('li');
        var p = document.createElement('p');
        p.setAttribute('id', 'p' + obj.id + "-" + i);
        li.appendChild(p);
        ul.appendChild(li);
        i++;
    }

    var button = document.createElement('button');
    button.setAttribute('class', 'btn btn-success btn-block rent');
    button.setAttribute('type', 'submit');
    button.setAttribute('onclick', 'rent(' + obj.id + ')');
    button.setAttribute('id', 'btn' + obj.id);


    infoDiv.appendChild(title);
    infoDiv.appendChild(test);
    infoDiv.appendChild(featureTitle);
    infoDiv.appendChild(ul);
    infoDiv.appendChild(button);

    container.appendChild(imgDiv);
    container.appendChild(infoDiv);

    mainDiv.appendChild(container);

    var i = 1;
    for (var feature in obj.features) {
        document.getElementById('p' + obj.id + "-" + i).innerText = obj.features[feature].name;
        i++;
    }
    document.getElementById('text' + obj.id).innerText = obj.content;
    document.getElementById('car-name' + obj.id).innerHTML = obj.name;
    document.getElementById('btn' + obj.id).innerText = "RENT CAR";
    document.getElementById('feature' + obj.id).innerHTML = 'Features:';
}

function rent(carId) {
    var pickUpPlace = document.getElementById("pick-up-place");
    var dropOffPlace = document.getElementById("drop-off-place");
    var pickUpTime = document.getElementById("pick-up-time");
    var dropOffTime = document.getElementById("drop-off-time");
    var fields = document.getElementById("fields-empty");

    if (pickUpPlace != "" && pickUpTime != "" && dropOffTime != "" && dropOffPlace != "") {
        fields.style.display = "none";
        var request = new XMLHttpRequest();

        request.open('POST', 'https://rentik.herokuapp.com/Rentik/user/' + id + '/rent/' + carId, true);
        request.setRequestHeader("Content-Type", "application/json");

        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                var json = JSON.parse(request.responseText);
                console.log(json);
                JSalert();
            }
        });

        request.send(criteria);
    } else {
        fields.style.display = "block";
    }
}

function JSalert(){
    swal("Congrats!", "You rent a car!", "success");
}

function logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('apiKey');
    window.location.href = "login.html";
}