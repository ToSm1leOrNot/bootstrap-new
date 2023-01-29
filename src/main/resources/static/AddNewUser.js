const addUserForm = document.getElementById("add-user-form")

addUserForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let usernameValue = document.getElementById('username').value;
    let first_nameValue = document.getElementById('first_name').value;
    let last_nameValue = document.getElementById('last_name').value;
    let ageValue = document.getElementById('age').value;
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    let rolesValue = getRoles(Array.from(document.getElementById("newUserRoles").selectedOptions).map(role => role.value));

    fetch('http://localhost:8090/api/admin/users', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            username: usernameValue,
            first_name:first_nameValue,
            last_name: last_nameValue,
            age: ageValue,
            email: emailValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(users => {
            const usersArr = [];
            usersArr.push(users);
            showAllUsers(usersArr);
        })
        .then(() => {
            document.getElementById("nav-admin-tab").click();})
})

function getRoles(role) {
    let roles = [];
    if (role.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2});
    }
    if (role.indexOf("USER") >= 0) {
        roles.push({"id": 1});
    }
    return roles;
}