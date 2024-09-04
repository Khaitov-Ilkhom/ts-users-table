const form = document.querySelector("#form") as HTMLFormElement
const table = document.querySelector("#table") as HTMLTableElement
const inputName = document.querySelector("#input-name") as HTMLInputElement
const inputAge = document.querySelector("#input-age") as HTMLInputElement
const inputAddress = document.querySelector("#input-address") as HTMLInputElement

interface IUser {
  name: string;
  age: number;
  address: string;
  id: number
}

let usersArray: IUser[] = JSON.parse(localStorage.getItem("users") || "[]");

class Users {
  name: string
  age: number
  address: string
  id: number

  constructor(name: string, age: number, address: string, id: number) {
    this.name = name
    this.age = age
    this.address = address
    this.id = id
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
      deleteButton?.addEventListener("click", () => {
        this.deleteUser(user.id);
      });
      table.appendChild(tr);
    });
  }

  deleteUser(id: number) {
    usersArray = usersArray.filter(user => user.id !== id);
    localStorage.setItem("users", JSON.stringify(usersArray));
    this.render();
  }
}

const newUser = new Users('', 0, '', 0)

form.addEventListener("submit", (e) => {
  e.preventDefault()
  let id: number = Math.floor(Math.random() * 300)
  let name: string = inputName.value
  let age: number = +inputAge.value
  let address: string = inputAddress.value

  const newUser = new Users(name, age, address, id)
  usersArray.push(newUser)
  localStorage.setItem("users", JSON.stringify(usersArray));
  newUser.render()
  form.reset()
})

newUser.render()
