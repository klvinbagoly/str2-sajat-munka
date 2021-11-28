import {
  newUserRow,
  addUser,
  showMessage,
  editUser
} from './module1.js'

const userKeys = ['id', 'name', 'address', 'email']
const nonWriteableUsers = []
const sizes = {
 id: 5,
 name: 15,
 address: 30,
 email: 25
}

const getUsers = (url) => {
  const fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  }
  fetch(url, fetchOptions)
  .then(data => data.json(),
  err => console.error(err)
  ).then(data => fillDataTable(data))
}

getUsers('http://localhost:3000/users')

const fillDataTable = (data) => {
  const table = document.querySelector('.users-table');
  table.innerHTML = '';

  newUserRow(table);

  
  for (let row of data){
    let tr = table.insertRow();
    for (let k of userKeys){
      try {
        let td = tr.insertCell();
        let input = createAnyElement('input', {
          class: 'user-input',
          value: row[k],
          name: k,
          size: sizes[k],
          readonly: true
      });
        td.appendChild(input)
      } catch (err) {
        console.log(err)
      }
    }
    const btnGroup = tr.insertCell()
    btnGroup.appendChild(createBtnGroup()) 
    if (nonWriteableUsers.includes(row.id.toString())){
      console.log(row.id)
     btnGroup.querySelectorAll('button').forEach(btn => btn.onclick = () => {
       console.log('Non-writeable user')
       showMessage('Non-writeable user', 'danger', tr)
     })
    }
  }
  const thead = createAnyElement('thead');
  const the = thead.insertRow()
  for (let k of userKeys){
    const th = the.insertCell();
    th.textContent = returnHead(k);
    th.classList.add(`${k}-th`)
  }
   const last = the.insertCell()
   last.textContent = 'Actions'
   table.appendChild(thead)
}

const returnHead = k => {
  switch (k) {
    case 'id': return '#';
    case 'name':return 'Name';
    case 'address' : return 'Address';
    case 'email' : return 'Email address';
    default: return k
  }
}

const createAnyElement = (elem, attributes = {}) => {
  const element = document.createElement(elem);
  for (let k in attributes){
    element.setAttribute(k, attributes[k])
  }
  return element
}

const createBtnGroup = () => {
  const btnGroup = createAnyElement('div', {class: 'btn-group'});
  const btnEdit = createAnyElement('button', {
    class: 'btn btn-edit', 
    onclick: 'editUser(this)',
    title: 'Edit user'});
  btnEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>'  ;
  const btnDel = createAnyElement('button', {
    class: 'btn btn-delete',
    onclick: 'deleteUser(this)',
    title: 'Delete user'});
  btnDel.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  btnGroup.appendChild(btnEdit);
  btnGroup.appendChild(btnDel);

  return btnGroup
}

const deleteUser = (elem) => {
  let tr = elem.parentElement.parentElement.parentElement;
  let id = tr.firstElementChild.firstElementChild.value;
  const fetchOptions = {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache'
  }
  if (confirm("Biztosan törli a felhasználót?")) {
  fetch(`http://localhost:3000/users/${id}`, fetchOptions).then(
    response => response.json(),
    err => console.error(err)
  ).then(
    () => getUsers('http://localhost:3000/users')
  )}
}


window.editUser = editUser;
window.deleteUser = deleteUser;
window.addUser = addUser;

export {
  createAnyElement,
  userKeys,
  getUsers,
  nonWriteableUsers,
  sizes
}