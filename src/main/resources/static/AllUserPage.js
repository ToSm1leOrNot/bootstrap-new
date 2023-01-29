const allUsersTable = document.getElementById("all-users-table");

async function showAllUsers() {
    fetch("http://localhost:8090/api/admin/users")
        .then((res) => res.json())
        .then(
            (users) => {
                if (users.length > 0) {
                    let temp = "";

                    users.forEach((user) => {
                        temp += `<tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.map(role => " " + role.role.substring(5).concat(" ")).toString().replaceAll(",", "")}</td> 
                        <td>
                             <button class="btn btn-primary" type="button"
                             data-bs-toggle="modal" data-bs-target="#modalEdit"
                             onclick="editModal(${user.id})">Edit</button></td>
                             <td>
                             <button class="btn btn-danger" type="button"
                             data-bs-toggle="modal" data-bs-target="#modalDelete"
                             onclick="deleteModal(${user.id})">Delete</button></td>
                        </tr>`;
                    })
                    allUsersTable.innerHTML = temp;
                }
            }
        )
}

showAllUsers()