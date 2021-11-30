import {
  getUsers,
  fillTable,
  nonWriteable,
  startPage,
  fillRow
} from './main.js'

const patterns = {
  id : /.*/,
  name: /^[A-ZÁÉÍÓÚÖŐÜŰ][a-záéíóúöőüű\-]* ([A-Za-z]+ )*[A-ZÁÉÍÓÚÖŐÜŰ][A-Za-záéíóúöőüű'\-]*$/,
  email: /^[\w.\-]+@[\w.\-]+\.[a-z]{2,4}$/,
  address: /^\d+ ([\dA-ZÁÉÍÓÚÖŐÜŰa-záéíóúöőüű]+ )*[A-ZÁÉÍÓÚÖŐÜŰa-záéíóúöőüű]+$/
}

const editUser = function(event){
  const btn = event.currentTarget;
  const tr = btn.parentElement.parentElement;
  const inputs = tr.querySelectorAll('input');
  inputs.forEach(input => {
    if (!(input.name === 'id')) {
      input.removeAttribute('readonly');
      input.pattern = patterns[input.name].toString().slice(1,-1)
    }
  })
 changeButtons(tr)
}

const changeButtons = (tr) => {
  const editButton = tr.querySelector('.edit-button');
  editButton.title = 'Save user';
  editButton.classList.replace('edit-button', 'save-button');
  editButton.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i>';

  const deleteButton = tr.querySelector('.delete-button');
  deleteButton.title = 'Undo';
  deleteButton.classList.replace('delete-button', 'undo-button');
  deleteButton.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i>';
  changeEventListeners(editButton, deleteButton)
} 

const changeEventListeners = (editButton, deleteButton) => {
  editButton.removeEventListener('click', editUser);
  editButton.addEventListener('click',  saveUser);

  deleteButton.removeEventListener('click', deleteUser);
  deleteButton.addEventListener('click', startPage)
  

  
  document.querySelectorAll('button').forEach(button => {
    if (button !== editButton && 
      button !== deleteButton && 
      !button.classList.contains('new-user-button')){
      button.classList.replace('button', 'button-disabled');
      button.removeEventListener('click', editUser);
      button.removeEventListener('click', deleteUser);
      button.addEventListener('click', () => {
        showMessage("You can't edit multiple users at once!", 'danger', button.parentElement.parentElement)
      })
    }
  })
}

const deleteUser = event => {
  const btn = event.currentTarget;
  const tr = btn.parentElement.parentElement;
  const id = tr.querySelector("input[name='id']").value;
  if (confirm('Are you sure to delete user?')){
    fetch(`http://localhost:3000/users/${id}`, {
      method : 'DELETE',
      mode: 'cors'
    })
    showMessage('User successfully deleted', 'success', tr)
    tr.remove()
  }
}

const saveUser = event => {
  const btn = event.currentTarget;
  const tr = btn.parentElement.parentElement;
  const id = tr.querySelector("input[name='id']").value;
  const data = {};
  tr.querySelectorAll('input').forEach(input => {
    if (input.name !== 'id'){
      data[input.name] = input.value
    }
  })

  if (!validateUser(data, tr)) return;
  nonWriteable.push(id);

  fetch(`http://localhost:3000/users/${id}`, {
    method : 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    () => getUsers().then(data => {
      showMessage('User successfully modified.', 'success', tr);
      tr.querySelectorAll('button').forEach(button => {
        button.removeEventListener('click', saveUser);
        button.removeEventListener('click', startPage)
      })
      setTimeout(fillTable, 5000, data)
    })
  ).catch(err => console.log(err))
}

const validateUser = (user, tr)  => {
  if (Object.keys(user).some(key => user[key].match(patterns[key]) === null)){
    showMessage('Wrong data!', 'danger', tr);
    console.log('Wrong data')
    return false;
  } else return true
}

const showMessage = (message, type, tr) => {
  const index = Array.from(document.querySelectorAll('tr')).indexOf(tr);
  const msgRow = document.querySelector('#userTable').insertRow(index + 2);
  msgRow.classList.add(type);
  msgRow.textContent = message;
  setTimeout(() => msgRow.remove(), 5000)
}

const addNewUser = () => {
  const data = {name : document.form.name.value, 
    email: document.form.email.value,
    address : document.form.address.value
  }
  const lastRow = document.querySelector('tr:last-child');

  if (!validateUser(data, lastRow)) return;

  fetch('http://localhost:3000/users', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
  .then(data => fillRow(data, document.querySelector('#userTable')))
  .catch(console.log)

  showMessage('User successfully added.', 'success', lastRow);
}

document.querySelector('.new-user-button').addEventListener('click', addNewUser)

export {
  editUser,
  deleteUser,
  showMessage
}