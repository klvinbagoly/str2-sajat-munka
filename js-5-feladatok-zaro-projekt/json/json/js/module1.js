import {
  createAnyElement,
  userKeys,
  getUsers,
  nonWriteableUsers
} from './app.js'

const newUserRow = (table) => {
  let tr = table.insertRow();
  userKeys.forEach(key => {
    let td = tr.insertCell()
    let input = createAnyElement('input', {
      class: 'new-user-input',
      name : key
    })
    if (key === 'id'){
      input.setAttribute('readonly', 'true');
      input.value = 'Add user'
    }
    td.appendChild(input)
  })

  let newBtn = createAnyElement('button', {
    class: 'btn btn-new',
    onclick: 'addUser(this)',
    title: 'Add new user'
  })
  newBtn.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';

  let td = tr.insertCell();
  td.appendChild(newBtn)
}

const addUser = ( btn) => {
  
  const tr = btn.parentElement.parentElement;
  if (!validateUser(tr)) {
    return
  }
  const data = getRowData(tr);
  delete data.id;
  const fetchOptions = {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  fetch(`http://localhost:3000/users`, fetchOptions).then(
    response => response.json(),
    err => console.error(err)
  ).then(
    () => getUsers('http://localhost:3000/users')
  )
}

const getRowData = tr => {
  const inputs = tr.querySelectorAll('input');
  let data = {};
  inputs.forEach(input => {
    data[input.name] = input.value;
  })
return data;
}

const validateUser = tr => {
  const data = getRowData(tr);
  const patterns = {
    id: /.*/,
    name: /^[A-Z][a-z]* [A-Z][a-z]*$/,
    address: /^\d* ([A-Z0-9][a-z0-9 ]*)+$/,
    email:    /^[a-z0-9\-.]+@[a-z0-9\-.]+\.[a-z]{2,4}$/
  }
  if (Object.keys(data).some(key => data[key].match(patterns[key]) === null)){
    showMessage('Invalid input!', 'danger', tr)
    return false
  } else return true
}

const showMessage = (message, type, row) => {
  const td = row.insertCell();
  td.classList.add(type);
  td.textContent = message;
  setTimeout(() =>{
    row.removeChild(td)
  }, 5000)
}

const editUser = (btn) => {
  btn.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i>';
const btnUndo = btn.parentElement.lastElementChild
btnUndo.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i>';
btn.title = 'Save changes';
btnUndo.title = 'Undo';

const tr = btn.parentElement.parentElement.parentElement;
const inputs = tr.querySelectorAll('input');
console.log(inputs)
inputs.forEach(input => {
  if (input.name !== 'id'){
    input.removeAttribute('readonly')
  }
})
btn.onclick = () => {if (validateUser(tr)){
  showMessage('Changes saved.', 'success', tr);
  setTimeout(()=>saveUser(tr),5000)
  inputs.forEach(input => input.setAttribute('readonly','true'))
  tr.querySelectorAll('button').forEach(button => button.onclick=()=>{})
}}
btnUndo.onclick = () => getUsers('http://localhost:3000/users')
   document.querySelectorAll('button').forEach(button => {
     if (!tr.contains(button)){
       button.onclick = () => {
         showMessage("You can't edit multiple users at once.", 'danger', tr)
       }
     }
   })
}



const saveUser = (tr) => {
  const data = getRowData(tr);
  
  nonWriteableUsers.push(data.id)
const fetchOptions = {
  method: "PUT",
  mode: "cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
}
fetch(`http://localhost:3000/users/${data.id}`, fetchOptions).then(
  resp => resp.json(),
  err => console.error(err)
).then(
  () => getUsers('http://localhost:3000/users')
  )
}

export {
  newUserRow,
  addUser,
  getRowData,
  validateUser,
  showMessage,
  editUser,
  saveUser
}