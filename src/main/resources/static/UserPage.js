const data = document.getElementById("data-user");
const url = 'http://localhost:8090/api/viewUser';
const panel = document.getElementById("users-panel");

function userAuthInfo() {
    fetch(url)
        .then((res) => res.json())
        .then((users) => {
            $('#showUsername').append(users.username);
            let roles = users.roles.map(role => role.role.substring(5).concat(" ")).toString().replaceAll(",", "");
            $('#showRoles').append(roles);

            let temp = " ";

            temp += `<tr>
            <td>${users.id}</td>
            <td>${users.username}</td>
            <td>${users.first_name}</td>
            <td>${users.last_name}</td>
            <td>${users.age}</td>
            <td>${users.email}</td>
            <td>${users.roles.map(role => " " + role.role.substring(5))}</td> 
            </tr>`;
            data.innerHTML = temp;
            panel.innerHTML = `<h5>${users.username} with roles: ${users.role.map(role => " " + role.role.substring(5))}</h5>`
        });
}

userAuthInfo()