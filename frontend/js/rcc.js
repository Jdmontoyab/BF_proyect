let jwt = sessionStorage.getItem("jwt");

let rows = document.getElementById("rows"); // Table Body
let liUser = document.getElementById("users"); // Users Button
let title = document.getElementById("title");

let add = document.getElementById("add");
let btnAddRegion = document.getElementById("addRegion");
let btnAddCountry = document.getElementById("addCountry");
let btnAddCity = document.getElementById("addCity");
let createRegion = document.getElementById("createRegion");
let createCountry = document.getElementById("createCountry");
let createCity = document.getElementById("createCity");
let modalBody = document.getElementById("modalBody");
let msg = document.getElementById("msg");

let update = document.getElementById("update");
let btnUpRegion = document.getElementById("upRegion");
let btnUpCountry = document.getElementById("upCountry");
let btnUpCity = document.getElementById("upCity");
let updateRegion = document.getElementById("updateRegion");
let updateCountry = document.getElementById("updateCountry");
let updateCity = document.getElementById("updateCity");
let modalBodyUp = document.getElementById("modalBodyUp");
let msgUp = document.getElementById("msgUp");

let del = document.getElementById("delete");
let btnDeleteRegion = document.getElementById("delRegion");
let btnDeleteCountry = document.getElementById("delCountry");
let btnDeleteCity = document.getElementById("delCity");
let deleteRegion = document.getElementById("deleteRegion");
let deleteCountry = document.getElementById("deleteCountry");
let deleteCity = document.getElementById("deleteCity");
let modalBodyDel = document.getElementById("modalBodyDel");
let msgDel = document.getElementById("msgDel");
let regionDelete = document.getElementById("regionDelete");
let countryDelete = document.getElementById("countryDelete");
let cityDelete = document.getElementById("cityDelete");

setTimeout(() => {
    $(document).ready(function () {
        $('#tRCC').DataTable();
    });
}, 100);

window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            liUser.remove();
        }
        fetch('http://localhost:5000/rcc/cities', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox"></td>
                                        <td>${e.regionDesc}</td>
                                        <td>${e.countryDesc}</td>
                                        <td>${e.city}</td>
                                    </tr>`;
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

// Button Icon //

add.addEventListener('click', () => {
    modalBody.innerHTML = '';
});

update.addEventListener('click', () => {
    modalBodyUp.innerHTML = '';
});

del.addEventListener('click', () => {
    modalBodyDel.innerHTML = '';
});

// Button Icon //

// Buttons Up //

    // Add RCC //

btnAddRegion.addEventListener('click', () => {
    modalBody.innerHTML = '';
    msg.innerHTML = "New Location";
    let templateRegion = `<h3 id="msg">New Location</h3>
                            <div class="form-group">
                                <label class="control-label">Region *</label>
                                <input id="region" maxlength="100" type="text" required="required" class="form-control" placeholder="Region"/>
                            </div>`;
    modalBody.insertAdjacentHTML('beforeend', templateRegion);
    createRegion.style.display = "initial";
    createCountry.style.display = "none";
    createCity.style.display = "none";
});

btnAddCountry.addEventListener('click', () => {
    modalBody.innerHTML = '';
    msg.innerHTML = "New Location";
    let templateCountry = `<h3 id="msg">New Location</h3>
                                <div class="form-group">
                                    <label class="control-label">Country *</label>
                                    <input id="country" maxlength="100" type="text" required="required" class="form-control" placeholder="Country" />
                                </div>
                                <div class="form-group"> 
                                    <label class="control-label">Region *</label>
                                    <select id="regions" class="form-control" placeholder="Select...">
                                        <option>Select...</option>
                                    </select>
                                </div>`;
    modalBody.insertAdjacentHTML('beforeend', templateCountry);
    createRegion.style.display = "none";
    createCountry.style.display = "initial";
    createCity.style.display = "none";
    getRegions(jwt);
});

btnAddCity.addEventListener('click', () => {
    modalBody.innerHTML = '';
    msg.innerHTML = "New Location";
    let templateCity = `<h3 id="msg">New Location</h3>
                                <div class="form-group">
                                    <label class="control-label">City *</label>
                                    <input id="city" maxlength="100" type="text" required="required" class="form-control" placeholder="City" />
                                </div>
                                <div class="form-group"> 
                                    <label class="control-label">Country *</label>
                                    <select id="countries" class="form-control" placeholder="Select...">
                                        <option value="0">Select...</option>
                                    </select>
                                </div>`;
    modalBody.insertAdjacentHTML('beforeend', templateCity);
    createRegion.style.display = "none";
    createCountry.style.display = "none";
    createCity.style.display = "initial";
    getCountries(jwt);
});

    // Add RCC //

    // Update RCC //

btnUpRegion.addEventListener('click', () => {
    let jwt = sessionStorage.getItem("jwt");
    modalBodyUp.innerHTML = '';
    msgUp.innerHTML = "Update Location";
    let templateRegionUp = `<h3 id="msg">Update Location</h3>
                                <div class="form-group">
                                    <label class="control-label">Select Region to Update *</label>
                                    <select id="regions" class="form-control" placeholder="Select...">
                                        <option>Select...</option>
                                    </select>
                                </div>
                            <div class="form-group">
                                <label class="control-label">Region *</label>
                                <input id="region" maxlength="100" type="text" required="required" class="form-control" placeholder="Region"/>
                            </div>`;
    modalBodyUp.insertAdjacentHTML('beforeend', templateRegionUp);
    updateRegion.style.display = "initial";
    updateCountry.style.display = "none";
    updateCity.style.display = "none";
    getRegions(jwt);
});

btnUpCountry.addEventListener('click', () => {
    modalBodyUp.innerHTML = '';
    msgUp.innerHTML = "New Location";
    let templateCountryUp = `<h3 id="msg">New Location</h3>
                            <div class="form-group">
                                <label class="control-label">Select Country to Update *</label>
                                <select id="countries" class="form-control" placeholder="Select...">
                                    <option>Select...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="control-label">Update Country *</label>
                                <input id="country" maxlength="100" type="text" required="required" class="form-control" placeholder="Country" />
                            </div>
                            <div class="form-group"> 
                                <label class="control-label">Update Region *</label>
                                <select id="regions" class="form-control" placeholder="Select...">
                                    <option>Select...</option>
                                </select>
                            </div>`;
    modalBodyUp.insertAdjacentHTML('beforeend', templateCountryUp);
    updateRegion.style.display = "none";
    updateCountry.style.display = "initial";
    updateCity.style.display = "none";
    getCountries(jwt);
    getRegions(jwt);
});

btnUpCity.addEventListener('click', () => {
    modalBodyUp.innerHTML = '';
    msgUp.innerHTML = "New Location";
    let templateCityUp = `<h3 id="msg">New Location</h3>
                            <div class="form-group">
                                <label class="control-label">Select City to Update *</label>
                                <select id="cities" class="form-control" placeholder="Select...">
                                    <option>Select...</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="control-label">Update City *</label>
                                <input id="city" maxlength="100" type="text" required="required" class="form-control" placeholder="City" />
                            </div>
                            <div class="form-group"> 
                                <label class="control-label">Update Country *</label>
                                <select id="countries" class="form-control" placeholder="Select...">
                                    <option>Select...</option>
                                </select>
                            </div>`;
    modalBodyUp.insertAdjacentHTML('beforeend', templateCityUp);
    updateRegion.style.display = "none";
    updateCountry.style.display = "none";
    updateCity.style.display = "initial";
    getCities(jwt);
    getCountries(jwt);
});

    // Update RCC //

    // Delete RCC //

btnDeleteRegion.addEventListener('click', () => {
    modalBodyDel.innerHTML = '';
    msgDel.innerHTML = "Delete Location";
    let templateRegionDel = `<h3 id="msg">Delete Location</h3>
                            <div class="form-group">
                                <label class="control-label">Select Region to Delete *</label>
                                <select id="regions" class="form-control" placeholder="Select...">
                                    <option>Select...</option>
                                </select>
                            </div>`;
    modalBodyDel.insertAdjacentHTML('beforeend', templateRegionDel);
    deleteRegion.style.display = "initial";
    deleteCountry.style.display = "none";
    deleteCity.style.display = "none";
    getRegions();
});
    
btnDeleteCountry.addEventListener('click', () => {
    modalBodyDel.innerHTML = '';
    msgDel.innerHTML = "Delete Location";
    let templateCountryDel = `<h3 id="msg">Delete Location</h3>
                            <div class="form-group">
                                <label class="control-label">Select Country to delete *</label>
                                <select id="countries" class="form-control" placeholder="Select...">
                                    <option>Select...</option>
                                </select>
                            </div>`;
    modalBodyDel.insertAdjacentHTML('beforeend', templateCountryDel);
    deleteRegion.style.display = "none";
    deleteCountry.style.display = "initial";
    deleteCity.style.display = "none";
    getCountries();
});
    
btnDeleteCity.addEventListener('click', () => {
    modalBodyDel.innerHTML = '';
    msgDel.innerHTML = "Delete Location";
    let templateCityDel = `<h3 id="msg">Delete Location</h3>
                        <div class="form-group">
                            <label class="control-label">Select City to delete *</label>
                            <select id="cities" class="form-control" placeholder="Select...">
                                <option>Select...</option>
                            </select>
                        </div>`;
    modalBodyDel.insertAdjacentHTML('beforeend', templateCityDel);
    deleteRegion.style.display = "none";
    deleteCountry.style.display = "none";
    deleteCity.style.display = "initial";
    getCities();
});

    // Delete RCC //

// Buttons Up //

// Buttons Bottom //

    // Add RCC //

createRegion.addEventListener('click', () => {
    addRegion();
});

createCountry.addEventListener('click', () => {
    addCountry();
});

createCity.addEventListener('click', () => {
    addCity();
});

    // Add RCC //

    // Update RCC //

updateRegion.addEventListener('click', () => {
    let regionId = document.getElementById('regions');
    updRegion(regionId);
});

updateCountry.addEventListener('click', () => {
    let countryId = document.getElementById('countries');
    let regionId = document.getElementById('regions');
    console.log(countryId.value);
    console.log(regionId.value);
    updCountry(countryId, regionId);
});

updateCity.addEventListener('click', () => {
    let cityId = document.getElementById('cities');
    let countryId = document.getElementById('countries');
    updCity(cityId, countryId);
});

    // Update RCC //

    // Delete RCC //

deleteRegion.addEventListener('click', () => {
    let regionId = document.getElementById('regions');
    regionDelete.style.display = "initial";
    countryDelete.style.display = "none";
    cityDelete.style.display = "none";
    confirRegion(regionId.value);
});

let idRegionDelete = 0;

function confirRegion(regionId) {
    idRegionDelete = regionId;
    console.log(idRegionDelete);
}

regionDelete.addEventListener('click', ()=> {
    delRegion(idRegionDelete);
});

////////////////////////////////

deleteCountry.addEventListener('click', () => {
    let countryId = document.getElementById('countries');
    regionDelete.style.display = "none";
    countryDelete.style.display = "initial";
    cityDelete.style.display = "none";
    confirCountry(countryId.value);
});

let idCountryDelete = 0;

function confirCountry(CountryId) {
    idCountryDelete = CountryId;
}

countryDelete.addEventListener('click', () => {
    delCountry(idCountryDelete);
});

//////////////////////////////////////////

deleteCity.addEventListener('click', () => {
    let cityId = document.getElementById('cities');
    regionDelete.style.display = "none";
    countryDelete.style.display = "none";
    cityDelete.style.display = "initial";
    confirCity(cityId.value);
});

let idCityDelete = 0;

function confirCity(CityId) {
    idCityDelete = CityId;
}

cityDelete.addEventListener('click', () => {
    delCity(idCityDelete);
});

    // Delete RCC //

// Buttons Bottom //

// Get RCC //

function getRegions() {
    let listRegions = document.getElementById("regions");
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

function getCountries() {
    let listCountries = document.getElementById("countries");
    fetch('http://localhost:5000/rcc/countries/', {
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
};

function getCities() {
    let listCities = document.getElementById("cities");
    fetch('http://localhost:5000/rcc/cities', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + jwt }
    }).then(res => {
        res.json().then(data => {
            data.forEach((e) => {
                let templateCities = `<option value=${e.cityId}>${e.city}</option>`
                listCities.insertAdjacentHTML('beforeend', templateCities);
            });
        });
    }).catch(error => {
        console.log(error);
    });
};

// Get RCC //

function addRegion() {
    let region = document.getElementById('region');
    if (jwt != null) {
        fetch("http://localhost:5000/rcc/regions/create", {
            method: 'POST',
            body: `{"description": "${region.value}"}`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                console.log(res);
                res.json().then(data => {
                    alert("Region Create Successful");
                    location.href = location.href;
                });
            } else {
                alert("¡Region already exists!");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function addCountry() {
    let country = document.getElementById('country');
    let listRegions = document.getElementById('regions');
    if (jwt != null) {
        fetch("http://localhost:5000/rcc/countries/create", {
            method: 'POST',
            body: `{"description": "${country.value}", "regionId": ${listRegions.value}}`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                res.json().then(data => {
                    alert("Country Create Successful");
                    location.href = location.href;
                });
            } else {
                alert("¡Country already exists!");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function addCity() {
    let city = document.getElementById('city');
    let listCountries = document.getElementById('countries');
    if (jwt != null) {
        fetch("http://localhost:5000/rcc/cities/create", {
            method: 'POST',
            body: `{"description": "${city.value}", "countryId": ${listCountries.value}}`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                console.log(res);
                res.json().then(data => {
                    alert("City Create Successful");
                    location.href = location.href;
                });
            } else {
                alert("¡City already exists!");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function updRegion(regionId) {
    let region = document.getElementById('region');
    if (jwt != null) {
        fetch(`http://localhost:5000/rcc/regions/${regionId.value}`, {
            method: 'PUT',
            body: `{
                "description": "${region.value}"
            }`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Region Updated Successful");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function updCountry(countryId, regionId) {
    let country = document.getElementById('country');
    if (jwt != null) {
        fetch(`http://localhost:5000/rcc/countries/${countryId.value}`, {
            method: 'PUT',
            body: `{"description": "${country.value}", "regionId": ${regionId.value}}`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Country Updated Successful");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function updCity(cityId, countryId) {
    let city = document.getElementById('city');
    if (jwt != null) {
        fetch(`http://localhost:5000/rcc/cities/${cityId.value}`, {
            method: 'PUT',
            body: `{"description": "${city.value}", "countryId": ${countryId.value}}`,
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("City Updated Successful");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function delRegion(regionId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/rcc/regions/${regionId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Region Deleted Successfully");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function delCountry(countryId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/rcc/countries/${countryId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("Country Deleted Successfully");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
            console.log(error);
        });
    }
}

function delCity(cityId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/rcc/cities/${cityId}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if (res.status == 200) {
                alert("City Deleted Successfully");
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