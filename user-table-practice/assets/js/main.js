import {
  editUser,
  deleteUser,
  showMessage
} from './actions.js'


const userKeys = ['id', 'name', 'email', 'address'];
const sizes = {
  id: 1,
  name: 15,
  email: 25,
  address: 25,
  actions: 5
}
const headers = {
  id : '#',
  name: 'Name',
  email: 'Email address',
  address: 'Address'
}
const nonWriteable = [];

const getUsers = async(url = 'http://localhost:3000/users') => {
  const response = await fetch(url);
  const users = await response.json();
  return users;
}

const fillTable = data => {
  const table = document.querySelector('#userTable');
  table.innerHTML = '';
  data.forEach(user => fillRow(user, table));

  const thead = document.createElement('thead');
  const headerRow = thead.insertRow();
  userKeys.forEach(key => createCell(key, headers[key],headerRow))
  createCell('actions','Actions',headerRow)
  table.appendChild(thead);

  createEventListeners()
}

const fillRow = (user, table) => {
  const row = table.insertRow();
  userKeys.forEach(key => createCell(key, user[key], row));
  createButtons(row, nonWriteable.includes(user.id.toString()))
}

const createCell = (key,value, row) => {
  const td = row.insertCell();
  const input = document.createElement('input');
  input.setAttribute('readonly','true');
  [input.name, input.value, input.size]  = [key,value,sizes[key]];
  td.appendChild(input)
}

const createButtons = (row, isNonWriteable) => {
  const editButton = document.createElement('button');
  editButton.title = 'Edit user';
  editButton.classList.add('edit-button', isNonWriteable ? 'button-disabled' : 'button');
  editButton.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>'

  const deleteButton = document.createElement('button');
  deleteButton.title = 'Delete user';
  deleteButton.classList.add('delete-button', isNonWriteable ? 'button-disabled' : 'button');
  deleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  const td = row.insertCell();
  td.appendChild(editButton);
  td.appendChild(deleteButton)
}

const createEventListeners = () => {
  document.querySelectorAll('.edit-button').forEach(button => 
    button.addEventListener('click', 
    button.classList.contains('button-disabled') ?
    () => showMessage('Non-writeable user', 'danger' , button.parentElement.parentElement)
    : editUser));

  document.querySelectorAll('.delete-button').forEach(button => 
    button.addEventListener('click', 
    button.classList.contains('button-disabled') ?
    () => showMessage('Non-writeable user', 'danger' , button.parentElement.parentElement)
    : deleteUser));

}


const startPage = () => {
  getUsers().then(fillTable);
}

startPage(); 

export {
  getUsers,
  fillTable,
  startPage,
  nonWriteable,
  fillRow
}