let rows = document.getElementById("rows"); // Table Body
let liUser = document.getElementById("users"); // Users Button
let title = document.getElementById("title");
let msg = document.getElementById("msg");
let add = document.getElementById("add");
let btnAddRegion = document.getElementById("addRegion");
let btnAddCountry = document.getElementById("addCountry");
let btnAddCity = document.getElementById("addCity");
let createRegion = document.getElementById("createRegion");
let createCountry = document.getElementById("createCountry");
let createCity = document.getElementById("createCity");
let modalBody = document.getElementById("modalBody");

setTimeout(() => {
    $(document).ready(function() {
        $('#tRCC').DataTable();
    });
}, 100);

window.onload = function () {
    let jwt = sessionStorage.getItem("jwt");
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            liUser.remove();
        }
        fetch('http://localhost:5000/rcc', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox"></td>
                                        <td>${e.regionDesc}</td>
                                        <td>${e.countryDesc}</td>
                                        <td>${e.city}</td>
                                        <td><button type='button' class='btn btn-info btn-smi' data-toggle="modal" data-target="#modalCRUD"><span class="material-icons" onclick="getUser(${e.userId})">create</span></button>
                                            <button type='button' class='btn btn-danger btn-smd' data-toggle="modal" data-target="#modalDelete"><span class="material-icons" onclick="confirmation(${e.userId})">delete</span></button>
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
    btnAddRegion.addEventListener('click', () => {
        modalBody.innerHTML = '';
        msg.innerHTML = "New Location";
        let templateRegion = `<h3 id="msg">New Location</h3>
                                    <div class="form-group">
                                    <label class="control-label">Region *</label>
                                    <input id="region" maxlength="100" type="text" required="required" class="form-control" placeholder="Region" />
                            </div>`;
        modalBody.insertAdjacentHTML('beforeend', templateRegion);
        createRegion.style.display = "initial";
        createCountry.style.display = "none";
        createCity.style.display = "none";
    });

    btnAddCountry.addEventListener('click', () => {
        
        createRegion.style.display = "none";
        createCountry.style.display = "initial";
        createCity.style.display = "none";
    });

    btnAddCity.addEventListener('click', () => {
        
        createRegion.style.display = "none";
        createCountry.style.display = "none";
        createCity.style.display = "initial";
    });

    add.addEventListener('click', () => {
        msg.innerHTML = "Select Location to Add";
        /* name.value = "";
        address.value = "";
        email.value = "";
        phone.value = "";
        btnUpdateCompany.style.display = "none";
        btnAddCompany.style.display = "initial"; */
    });

    createRegion.addEventListener('click', () => {
        addRegion(jwt);
    });
};

function addRegion(jwt) {
    let region = document.getElementById('region');
    if (jwt != null) {
       fetch("http://localhost:5000/regions/create", {
            method: 'POST',
            body: `{"description": "${region.value}"}`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
                alert("Region Create Successful")
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