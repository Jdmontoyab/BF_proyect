$(document).ready(function() {
    $('#tContacts').DataTable();
});

let rows = document.getElementById("rows");
let liUser = document.getElementById("users");
let full_name = document.getElementById("full_name");
let email = document.getElementById("email");
let position = document.getElementById("position");
let listCompanies = document.getElementById("companies");
let listRegions = document.getElementById("regions");
let listCountries = document.getElementById("countries");
let listCities = document.getElementById("cities");
let btnAddContact = document.getElementById("addContact");
let interest = document.getElementById("interest");

/* let utils = new Utils(); */

window.onload = function () {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            liUser.remove();
        }
        fetch('http://localhost:5000/contacts/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox"></td>
                        <td>${e.full_name}<br>${e.email}</td>
                        <td>${e.city}</td>
                        <td>${e.company}</td>
                        <td>${e.position}</td>
                        <td>${e.fav_channel}</td>
                        <td><div class="progress">
                                <div class="progress-bar" style="width: ${e.interest}%" role="progressbar" aria-valuenow="${e.interest}" aria-valuemin="0" aria-valuemax="100">${e.interest}%</div>
                            </div>
                        </td>
                        <td><button type='button' class='btn btn-info btn-sm'><span class="material-icons">create</span></button>
                            <button type='button' class='btn btn-danger btn-sm'><span class="material-icons">delete</span></button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
            findCompanies(jwt);
            findRegions(jwt);
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../html/index.html";
    }
    btnAddContact.addEventListener('click', () => {
        addContact(jwt);
    });
};

function findCompanies(jwt) {
    fetch('http://localhost:5000/companies/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCompanies = `<option value=${e.companyId}>${e.name}</option>`
                listCompanies.insertAdjacentHTML('beforeend', templateCompanies);
            });
        });
    }).catch(error => {
        console.log(error);
    });
};

function findRegions(jwt) {
    fetch('http://localhost:5000/rcc/regions/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateRegions = `<option value=${e.id}>${e.description}</option>`
                listRegions.insertAdjacentHTML('beforeend', templateRegions);
            });
        });
        listRegions.addEventListener('change', () => {
            document.getElementById('countries').innerHTML = '';
            document.getElementById('cities').innerHTML = '';
            let option = document.createElement("option");
            option.innerHTML = "Select...";
            option.value = 0;
            listCountries.appendChild(option);
            findCountries(jwt, listRegions.value);
        });
    }).catch(error => {
        console.log(error);
    });
};

function findCountries(jwt, regionId) {
    fetch(`http://localhost:5000/rcc/countries/${regionId}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCountries = `<option value=${e.id}>${e.description}</option>`
                listCountries.insertAdjacentHTML('beforeend', templateCountries);
            });
        });
        listCountries.addEventListener('change', () => {
            document.getElementById('cities').innerHTML = '';
            let option = document.createElement("option");
            option.innerHTML = "Select...";
            option.value = 0;
            listCities.appendChild(option);
            findCities(jwt, listCountries.value);
        });
    }).catch(error => {
        console.log(error);
    });
}

function findCities(jwt, countryId) {
    fetch(`http://localhost:5000/rcc/cities/${countryId}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                /* document.getElementById('cities').innerHTML = ''; */
                let templateCities = `<option value=${e.id}>${e.description}</option>`
                listCities.insertAdjacentHTML('beforeend', templateCities);
            });
        });
        /* listCities.addEventListener('change', () => {
            document.getElementById('cities').innerHTML = '';
        }); */
    }).catch(error => {
        console.log(error);
    });
}

function addContact(jwt) {
    console.log(jwt);
    console.log(listCities.value);
    console.log(listCompanies.value);
    if (jwt != null) {
       fetch("http://localhost:5000/contacts/add", {
            method: 'POST',
            body: `{
                "full_name": "${full_name.value}",
                "email": "${email.value}",
                "cityId": ${listCities.value},
                "companyId": ${listCompanies.value},
                "position": "${position.value}",
                "fav_channel": "Whatsapp",
                "interest": "${interest.value}"
            }`,
            /* body:`{"full_name":"${full_name.value}","email":"${email.value}","cityId":${listCities.value},"companyId":${listCompanies.value},"position":"${position.value}","fav_channel":"Phone","interest":"${interest.value}"}`, */
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
            console.log(data);
            });
        } else {
            console.log("error");
            }
        }).catch(error => {
            console.log(error);
        }); 
    } 
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};