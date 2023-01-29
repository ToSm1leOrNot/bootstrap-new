const editUserForm = document.getElementById("edit-user-form")

async function editModal(id) {
    fetch('http://localhost:8090/api/admin/users/' + id)
        .then(res => {
            res.json()
                .then(async user => {
                    console.log(user);
                    document.getElementById('idEdit').value = user.id;
                    document.getElementById('usernameEdit').value = user.username;
                    document.getElementById('first_nameEdit').value = user.first_name;
                    document.getElementById('last_nameEdit').value = user.last_name;
                    document.getElementById('ageEdit').value = user.age;
                    document.getElementById('emailEdit').value = user.email;
                    document.getElementById('passwordEdit').value = user.password;
                    if (user.roles.length === 2) {
                        document.getElementById('adminFlag').setAttribute('selected', 'true');
                        document.getElementById('userFlag').setAttribute('selected', 'true');
                    } else if (user.roles.length === 1 && (user.roles[0].id === 2)) {
                        document.getElementById('adminFlag').setAttribute('selected', 'true');
                    } else if (user.roles.length === 1 && (user.roles[0].id === 1)) {
                        document.getElementById('userFlag').setAttribute('selected', 'true');
                    }
                })
        })
}

editUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let idValue = document.getElementById("idEdit").value;
    let usernameValue = document.getElementById('usernameEdit').value;
    let first_nameValue = document.getElementById('first_nameEdit').value;
    let last_nameValue = document.getElementById('last_nameEdit').value;
    let ageValue = document.getElementById('ageEdit').value;
    let emailValue = document.getElementById('emailEdit').value;
    let passwordValue = document.getElementById('passwordEdit').value;
    let rolesValue = getEditRoles(Array.from(document.getElementById("rolesEdit").selectedOptions).map(role => role.value));


    await fetch('http://localhost:8090/api/admin/users/' + idValue, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idValue,
            username: usernameValue,
            first_name: first_nameValue,
            last_name: last_nameValue,
            age: ageValue,
            email: emailValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(() => {
            document.getElementById("nav-admin-tab").click();
            showAllUsers();
            document.getElementById("closeEditModal").click();
        })
})

function getEditRoles(role) {
    let roles = [];
    if (role.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2,
            "role": 'ROLE_ADMIN'});
    }
    if (role.indexOf("USER") >= 0) {
        roles.push({"id": 1,
            "role": 'ROLE_USER'});
    }
    return roles;
}