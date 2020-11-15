let rows = document.getElementById("rows");
let liUser = document.getElementById("users");

/* let utils = new Utils(); */

window.onload = function () {
    let jwt = sessionStorage.getItem("jwt");
    //console.log("contacts " + jwt);
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            liUser.remove();
        }
        console.log("Bearer " + jwt);
        fetch('http://localhost:5000/companies/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                data.forEach((e) => {
                    let template = `<tr class="info">
                                        <td>${e.name}</td>
                                        <td>${e.cityDesc}</td>
                                        <td>${e.address}</td>
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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};