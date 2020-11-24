let jwt = sessionStorage.getItem("jwt");
let rows = document.getElementById("rows"); // Table Body
let liUser = document.getElementById("users"); // Users Button
let count = document.getElementById("count");

let multDelete = document.getElementById("multDelete");
let msgMultDelete = document.getElementById("msgMultDelete");
let deleteMultCompany = document.getElementById("deleteMultCompany");

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
                    let template = `<tr><td><input type="checkbox" onclick="getChecked(${e.companyId})"></td>
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
        }).catch(error => {
            console.log(error);
        });
    } else {
        location.href = "../html/index.html";
    }
};

let idsCompanies = [];

function getChecked(idCompany) {
    let itemSelect = document.querySelectorAll('input[type="checkbox"]:checked');
    count.innerHTML = itemSelect.length + " Select";
    if (itemSelect.length == 0 || itemSelect.length == 1) {
        multDelete.style.display = "none";
    } else {
        multDelete.style.display = "initial";
    }

    if (idsCompanies.indexOf(idCompany) == -1) {
        idsCompanies.push(idCompany);
        setIdsContacts(idsCompanies);
    } else {
        idsCompanies.splice(idsCompanies.indexOf(idCompany), 1);
        setIdsContacts(idsCompanies);
    }
}

let idsCompaniesDelete = [];

function setIdsContacts(itemSelect) {
    idsCompaniesDelete = itemSelect;
}

deleteMultCompany.addEventListener('click', () => {
    multDeleteCompanies(idsCompaniesDelete);
});

function multDeleteCompanies(companies) {
    companies.forEach((e) => {
        if (jwt != null) {
            fetch(`http://localhost:5000/companies/${e}`, {
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

// Add Company //

add.addEventListener('click', () => {
    name.value = "";
    address.value = "";
    email.value = "";
    phone.value = "";
    btnUpdateCompany.style.display = "none";
    btnAddCompany.style.display = "initial";
    findRegions(jwt);
});

btnAddCompany.addEventListener('click', () => {
    addCompany(jwt);
});

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
    findCountries(listRegions.value);
});

function findCountries(regionId) {
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
    findCities(listCountries.value);
});

function findCities(countryId) {
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
                alert("Company Create Successful");
                location.href = location.href;
            });
        } else {
            console.log("error");
            }
        }).catch(error => {
            console.log(error);
        }); 
    } 
}

// Add Company //

// Update Company //

function getCompany(companyId) {
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
    findRegions(jwt);
    setIdCompanyUpdate(companyId);
}

let idCompanyUpdate = 0;

function setIdCompanyUpdate(companyId) {
    idCompanyUpdate = companyId;
}

btnUpdateCompany.addEventListener('click', () => {
    updateCompany(jwt, idCompanyUpdate);
});

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
                alert("Company Updated Successful");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}

// Update Company //

// Delete Company //

let setIdCompanyDelete = 0;

function confirmation(companyId) {
    setIdCompanyDelete = companyId;
}

btnDeleteCompany.addEventListener('click', ()=> {
    deleteCompany(setIdCompanyDelete);
});

function deleteCompany(companyId) {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        fetch(`http://localhost:5000/companies/${companyId}`, {
            method: 'DELETE',
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("Company Deleted Successfully");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}

// Delete Company //

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};