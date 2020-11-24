let jwt = sessionStorage.getItem("jwt");
let rows = document.getElementById("rows"); // Table Body
let liUser = document.getElementById("users"); // Users Button

let username = document.getElementById("username");
let name = document.getElementById("name");
let last_name = document.getElementById("last_name");
let email = document.getElementById("email");
let role = document.getElementById("roles");
let password = document.getElementById("password");
let rpassword = document.getElementById("rpassword");

let title = document.getElementById("title");
let add = document.getElementById("add");
let btnAddUser = document.getElementById("addUser");
let btnUpdateUser = document.getElementById("updateUser");
let btnDeleteUser = document.getElementById("deleteUser");

setTimeout(() => {
    $(document).ready(function() {
        $('#tUsers').DataTable();
    });
}, 100);

window.onload = function () {
    if (jwt != null) {
        if (parseJwt(jwt).roleId == 2) {
            liUser.remove();
        }
        fetch('http://localhost:5000/users/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + jwt }
        }).then(res => {
            res.json().then(data => {
                data.forEach((e) => {
                    let template = `<tr><td><input type="checkbox"></td>
                        <td>${e.username}</td>
                        <td>${e.name}</td>
                        <td>${e.last_name}</td>
                        <td>${e.email}</td>
                        <td>${e.role}</td>
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
};

add.addEventListener('click', () => {
    username.value = "";
    name.value = "";
    last_name.value = "";
    email.value = "";
    role.value = "";
    password.value = "";
    rpassword.value = "";
    title.innerHTML = "Create User"
    btnUpdateUser.style.display = "none";
    btnAddUser.style.display = "initial";
});

btnAddUser.addEventListener('click', () => {
    addUser(jwt);
});

function addUser(jwt) {
    if (jwt != null) {
       fetch("http://localhost:5000/users/create", {
            method: 'POST',
            body: `{
                "username": "${username.value}",
                "name": "${name.value}",
                "last_name": "${last_name.value}",
                "email": "${email.value}",
                "roleId": ${role.value},
                "password": "${password.value}",
                "rpassword": "${rpassword.value}"
            }`,
            headers:{"Content-Type":"application/json"}
    }).then(res => {
        if (res.status == 200) {
            res.json().then(data => {
                alert("User Create Successful");
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

function getUser(userId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/users/${userId}`, {
             method: 'GET',
             headers: { "Authorization": "Bearer " + jwt }
     }).then(res => {
         if (res.status == 200) {
             res.json().then(data => {
                username.value = data[0].username;
                name.value = data[0].name;
                last_name.value = data[0].last_name;
                email.value = data[0].email;
                console.log(data);
             });
         } else {
             console.log("error");
             }
         }).catch(error => {
             console.log(error);
         }); 
    }
    title.innerHTML = "Update User"
    btnAddUser.style.display = "none";
    btnUpdateUser.style.display = "initial";
    setIdUserUpdate(userId);
}

idUserUpdate = 0;

function setIdUserUpdate(userId) {
    idUserUpdate = userId;
}

btnUpdateUser.addEventListener('click', () => {
    updateUser(idUserUpdate);
});

function updateUser(userId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/users/${userId}`, {
             method: 'PUT',
             body: `{
                "username": "${username.value}",
                "name": "${name.value}",
                "last_name": "${last_name.value}",
                "email": "${email.value}",
                "roleId": ${role.value},
                "password": "${password.value}",
                "rpassword": "${rpassword.value}"
            }`,
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("User Updated Successful");
                location.href = location.href;
            } else {
                console.log("error");
            }
        }).catch(error => {
             console.log(error);
        }); 
    }
}

idUserDelete = 0;

function confirmation(userId) {
    idUserDelete = userId;
}

btnDeleteUser.addEventListener('click', ()=> {
    deleteUser(idUserDelete);
});

function deleteUser(userId) {
    if (jwt != null) {
        fetch(`http://localhost:5000/users/${userId}`, {
            method: 'DELETE',
            headers:{"Content-Type":"application/json"}
        }).then(res => {
            if (res.status == 200) {
                alert("User Deleted Successfully");
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