let rows = document.getElementById("rows"); // Table Body
let liUser = document.getElementById("users"); // Users Button
let name = document.getElementById("name");
let address = document.getElementById("address");
let email = document.getElementById("email");
let city = document.getElementById("cities");
let listRegions = document.getElementById("regions");
let listCountries = document.getElementById("countries");
let listCities = document.getElementById("cities");
let title = document.getElementById("title");
let add = document.getElementById("add");
let btnAddCompany = document.getElementById("addCompany");
let btnUpdateCompany = document.getElementById("updateCompany");
let btnDeleteCompany = document.getElementById("deleteCompany");

setTimeout(() => {
    $(document).ready(function() {
        $('#tCompanies').DataTable();
    });
}, 100);

window.onload = function () {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            liUser.remove();
        }
        fetch('http://localhost:5000/companies', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox"></td>
                        <td>${e.name}</td>
                        <td>${e.address}</td>
                        <td>${e.email}</td>
                        <td>${e.phone}</td>
                        <td>${e.cityDesc}</td>
                        <td><button type='button' class='btn btn-info btn-smi' data-toggle="modal" data-target="#modalCRUD"><span class="material-icons" onclick="getCompany(${e.companyId})">create</span></button>
                            <button type='button' class='btn btn-danger btn-smd' data-toggle="modal" data-target="#modalDelete"><span class="material-icons" onclick="confirmation(${e.companyId})">delete</span></button>
                        </td></tr>`;
                    rows.insertAdjacentHTML('beforeend', template);
                });
            });
            findRegions(jwt);
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../html/index.html";
    }
    add.addEventListener('click', () => {
        name.value = "";
        address.value = "";
        email.value = "";
        phone.value = "";
        btnUpdateCompany.style.display = "none";
        btnAddCompany.style.display = "initial";
    });
    btnAddCompany.addEventListener('click', () => {
        addCompany(jwt);
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
    }).catch(error => {
        console.log(error);
    });
};

function findCountries(jwt, regionId) {
    console.log(regionId);
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
        listCountries.addEventListener('change', () => {
            document.getElementById('cities').innerHTML = '';
            let optionCities = document.createElement("option");
            optionCities.innerHTML = "Select...";
            optionCities.value = 0;
            listCities.appendChild(optionCities);
            findCities(jwt, listCountries.value);
        });
    }).catch(error => {
        console.log(error);
    });
}

function findCities(jwt, countryId) {
    console.log(countryId);
    if (countryId != 0)
    fetch(`http://localhost:5000/rcc/cities/${countryId}`, {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCities = `<option value=${e.id}>${e.description}</option>`
                listCities.insertAdjacentHTML('beforeend', templateCities);
                /* document.getElementById('cities').innerHTML = '';
                let option = document.createElement("option");
                option.innerHTML = "Select...";
                option.value = 0;
                listCities.appendChild(option); */
            });
        });
        /* listCities.addEventListener('change', () => {
            document.getElementById('cities').innerHTML = '';
        }); */
    }).catch(error => {
        console.log(error);
    });
}

function addCompany(jwt) {
    if (jwt != null) {
       fetch("http://localhost:5000/companies/create", {
            method: 'POST',
            body: `{
                "name": "${name.value}",
                "address": "${address.value}",
                "email": "${email.value}",
                "phone": "${phone.value}",
                "cityId": ${city.value}
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
                alert("Company Create Successful")
            });
        } else {
            console.log("error");
            }
        }).catch(error => {
            console.log(error);
        }); 
    } 
}

function getCompany(companyId) {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:5000/companies/${companyId}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                name.value = data[0].name;
                address.value = data[0].address;
                email.value = data[0].email;
                phone.value = data[0].phone;
             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    title.innerHTML = "Update Contact";
    btnAddCompany.style.display = "none";
    btnUpdateCompany.style.display = "initial";
    btnUpdateCompany.addEventListener('click', () => {
        updateCompany(jwt, companyId);
    });
}

function updateCompany(jwt, companyId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/companies/${companyId}`, {
            method: 'PUT',
            body: `{
                "name": "${name.value}",
                "address": "${address.value}",
                "email": "${email.value}",
                "phone": "${phone.value}",
                "cityId": ${city.value}
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("User Updated Successful")
            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}

function confirmation(companyId) {
    btnDeleteCompany.addEventListener('click', ()=> {
        deleteCompany(companyId);
    });
}

function deleteCompany(companyId) {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:5000/companies/${companyId}`, {
            method: 'DELETE',
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Company Deleted Successfully")
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