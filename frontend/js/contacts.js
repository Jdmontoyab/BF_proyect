

let jwt = sessionStorage.getItem("jwt");
let rows = document.getElementById("rows"); // Table Body
let liUser = document.getElementById("users"); // Users Button
let count = document.getElementById("count");

let multDelete = document.getElementById("multDelete");
let msgMultDelete = document.getElementById("msgMultDelete");
let deleteMultContact = document.getElementById("deleteMultContact");

let full_name = document.getElementById("full_name");
let email = document.getElementById("email");
let position = document.getElementById("position");
let listCompanies = document.getElementById("companies");
let fOptCom = document.getElementById("fOptCom")
let listRegions = document.getElementById("regions");
let listCountries = document.getElementById("countries");
let listCities = document.getElementById("cities");
let interest = document.getElementById("interest");
let fav_channel = document.getElementById("fav_channel");

let add = document.getElementById("add");
let btnAddContact = document.getElementById("addContact");
let btnUpdateContact = document.getElementById("updateContact");
let btnDeleteContact = document.getElementById("deleteContact");

setTimeout(() => {
    $(document).ready(function() {
        $('#tContacts').DataTable();
    });
}, 100);

window.onload = function () {
    if (jwt != null) {
        if (utils.parseJwt(jwt).roleId == 2) {
            liUser.remove();
        }
        fetch('http://localhost:5000/contacts/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox" data-id="${e.contactsId}" onclick="getChecked()"></td>
                        <td>${e.full_name}<br>${e.email}</td>
                        <td>${e.city}</td>
                        <td>${e.company}</td>
                        <td>${e.position}</td>
                        <td>${e.fav_channel}</td>
                        <td><div class="progress">
                                <div class="progress-bar" style="width: ${e.interest}%" role="progressbar" aria-valuenow="${e.interest}" aria-valuemin="0" aria-valuemax="100">${e.interest}%</div>
                            </div>
                        </td>
                        <td><button type='button' class='btn btn-info btn-smi' data-toggle="modal" data-target="#modalCRUD"><span class="material-icons" onclick="getContact(${e.contactsId})">create</span></button>
                            <button type='button' class='btn btn-danger btn-smd' data-toggle="modal" data-target="#modalDelete"><span class="material-icons" onclick="confirmation(${e.contactsId})">delete</span></button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
            
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../html/index.html";
    }
    findCompanies(jwt);
    findRegions(jwt);
};

let idsContacts = [];

function getChecked() {
    let itemSelect = document.querySelectorAll('input[type="checkbox"]:checked');
    count.innerHTML = itemSelect.length + " Select";
    multDelete.style.display = itemSelect.length < 2 ? "none": "initial";
}

deleteMultContact.addEventListener('click', () => {
    multDeleteContacts();
});

function multDeleteContacts() {
    let itemSelect = document.querySelectorAll('input[type="checkbox"]:checked');
    itemSelect.forEach((e) => {
        if (jwt != null) {
            fetch(`http://localhost:5000/contacts/${e.dataset.id}`, {
                method: 'DELETE',
                headers:{"Content-Type":"application/json"}
            }).then(res => {
                if (res.status == 200) {
                } else {
                    console.log("error");
                }
            }).catch(error => {
                 console.log(error);
            }); 
        }
    });
    location.href = location.href;
}

add.addEventListener('click', () => {
    full_name.value = "";
    email.value = "";
    position.value = "";
    btnUpdateContact.style.display = "none";
    btnAddContact.style.display = "initial";
});

btnAddContact.addEventListener('click', () => {
    addContact(jwt);
});

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
        
    }).catch(error => {
        console.log(error);
    });
};

listRegions.addEventListener('change', () => {
    document.getElementById('countries').innerHTML = '';
    document.getElementById('cities').innerHTML = '';
    let optionCountries = document.createElement("option");
    let optionCities = document.createElement("option");
    optionCountries.innerHTML = "Select...";
    optionCountries.value = 0;
    optionCities.innerHTML = "Select...";
    optionCities.value = 0;
    listCountries.appendChild(optionCountries);
    listCities.appendChild(optionCities);
    findCountries(jwt, listRegions.value);
});

function findCountries(jwt, regionId) {
    if (regionId != 0)
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
    }).catch(error => {
        console.log(error);
    });
}

listCountries.addEventListener('change', () => {
    document.getElementById('cities').innerHTML = '';
    let optionCities = document.createElement("option");
    optionCities.innerHTML = "Select...";
    optionCities.value = 0;
    listCities.appendChild(optionCities);
    findCities(jwt, listCountries.value);
});

function findCities(jwt, countryId) {
    if (countryId != 0)
    fetch(`http://localhost:5000/rcc/cities/${countryId}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCities = `<option value=${e.id}>${e.description}</option>`
                listCities.insertAdjacentHTML('beforeend', templateCities);
            });
        });
    }).catch(error => {
        console.log(error);
    });
}

function addContact(jwt) {
    if (jwt != null) {
       fetch("http://localhost:5000/contacts/add", {
            method: 'POST',
            body: `{
                "full_name": "${full_name.value}",
                "email": "${email.value}",
                "cityId": ${listCities.value},
                "companyId": ${listCompanies.value},
                "position": "${position.value}",
                "fav_channel": "${fav_channel.value}",
                "interest": "${interest.value}"
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
                alert("Contact Create Successful");
                location.href = location.href;
            });
        } else {
            alert("Contact already exists!!! or data inputs incorrect!!!");
            }
        }).catch(error => {
            console.log(error);
            alert("Contact already exists!!! or data inputs incorrect!!!");
        }); 
    } 
}

function getContact(contactId) {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:5000/contacts/${contactId}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                full_name.value = data[0].full_name;
                email.value = data[0].email;
                position.value = data[0].position;
                fOptCom.innerHTML = "Select...";
             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    btnAddContact.style.display = "none";
    btnUpdateContact.style.display = "initial";
    setIdContactUpdate(contactId);
}

let idContactUpdate = 0;

function setIdContactUpdate(contactId) {
    idContactUpdate = contactId;
}

btnUpdateContact.addEventListener('click', () => {
    updateContact(jwt, idContactUpdate);
});

function updateContact(jwt, contactId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/contacts/${contactId}`, {
             method: 'PUT',
             body: `{
                "full_name": "${full_name.value}",
                "email": "${email.value}",
                "cityId": ${listCities.value},
                "companyId": ${listCompanies.value},
                "position": "${position.value}",
                "fav_channel": "${fav_channel.value}",
                "interest": "${interest.value}"
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Contact Updated Successful");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}

let idContactDelete = 0;

function confirmation(contactId) {
    idContactDelete = contactId;
}

btnDeleteContact.addEventListener('click', () => {
    deleteContact(idContactDelete);
});

function deleteContact(contactId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/contacts/${contactId}`, {
            method: 'DELETE',
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Contact Deleted Successfully");
                location.href = location.href;
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