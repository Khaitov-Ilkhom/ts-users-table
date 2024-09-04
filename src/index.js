"use strict";
const form = document.querySelector("#form");
const table = document.querySelector("#table");
const inputName = document.querySelector("#input-name");
const inputAge = document.querySelector("#input-age");
const inputAddress = document.querySelector("#input-address");
let usersArray = JSON.parse(localStorage.getItem("users") || "[]");
class Users {
    constructor(name, age, address, id) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.id = id;
    }
    render() {
        table.innerHTML = "";
        usersArray.forEach((user) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td class="py-3 px-4 text-gray-700 capitalize">${user.name}</td>
        <td class="py-3 px-4 text-gray-700">${user.age}</td>
        <td class="py-3 px-4 text-gray-700 capitalize">${user.address}</td>
        <td class="py-3 px-4">
          <button class="bg-red-500 text-white font-semibold rounded-lg px-3 py-1 hover:bg-red-600 transition">Delete user</button>
        </td>
      `;
            const deleteButton = tr.querySelector("button");
            deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener("click", () => {
                this.deleteUser(user.id);
            });
            table.appendChild(tr);
        });
    }
    deleteUser(id) {
        usersArray = usersArray.filter(user => user.id !== id);
        localStorage.setItem("users", JSON.stringify(usersArray));
        this.render();
    }
}
const newUser = new Users('', 0, '', 0);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.floor(Math.random() * 300);
    let name = inputName.value;
    let age = +inputAge.value;
    let address = inputAddress.value;
    const newUser = new Users(name, age, address, id);
    usersArray.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersArray));
    newUser.render();
    form.reset();
});
newUser.render();
