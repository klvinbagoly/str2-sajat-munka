const userKeys = ['id', 'name', 'address', 'email']
const nonWriteableUsers = []

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

  const newRow = newUserRow(data[0]);
  table.appendChild(newRow);
  
  for (let row of data){
    let tr = table.insertRow();
    for (let k of userKeys){
      try {
        let td = tr.insertCell();
        let input = createAnyElement('input', {
          class: 'user-input',
          value: row[k],
          name: k,
          readonly: true
      });
        td.appendChild(input)
      } catch (err) {
        console.log(err)
      }
    }
    const btnGroup = tr.insertCell()
    btnGroup.appendChild(createBtnGroup())  
    if (nonWriteableUsers.includes(row.id)){
     btnGroup.querySelectorAll('button').forEach(btn => btn.onclick = () => {
       console.log('Non-writeable user')
     })
    }
  }
  const thead = createAnyElement('thead');
  const the = thead.insertRow()
  for (let k of userKeys){
    const th = the.insertCell();
    th.textContent = returnHead(k)
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
  const btnEdit = createAnyElement('button', {class: 'btn btn-edit', onclick: 'editUser(event, this)', type: 'button'});
  btnEdit.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>'  ;
  const btnDel = createAnyElement('button', {class: 'btn btn-delete', onclick: 'deleteUser(this)', type: 'button'});
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

const newUserRow = () => {
  let tr = createAnyElement('tr');
  for (let k of userKeys){
    let td = tr.insertCell()
    let input = createAnyElement('input', {
      class: 'new-user-input',
      name : k
    })
    if (k === 'id'){
      input.setAttribute('readonly', 'true');
      input.value = 'Add user'
    }
    td.appendChild(input)
  }

  let newBtn = createAnyElement('button', {
    class: 'btn btn-new',
    onclick: 'addUser(this)'
  })
  newBtn.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';

  let td = tr.insertCell();
  td.appendChild(newBtn)
  return tr
}

const addUser = ( btn) => {
  
  const tr = btn.parentElement.parentElement;
  if (!validateUser(tr)) {
    showMessage('Invalid input!', 'danger', tr)
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

const editUser = (event,btn) => {
  event.preventDefault();
  btn.innerHTML = '<i class="fa fa-floppy-o" aria-hidden="true"></i>';
const btnUndo = btn.parentElement.lastElementChild
btnUndo.innerHTML = '<i class="fa fa-undo" aria-hidden="true"></i>';

const tr = btn.parentElement.parentElement.parentElement;
const inputs = tr.querySelectorAll('input');
console.log(inputs)
inputs.forEach(input => {
  if (input.name !== 'id'){
    input.removeAttribute('readonly')
  }
})
btn.onclick = () => {if (validateUser(tr)){
  saveUser(tr)
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

const saveUser = (tr) => {
  const data = getRowData(tr);
  showMessage('Changes saved.', 'success', tr)
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
)}

const showMessage = (message, type, row) => {
  const td = row.insertCell();
  td.classList.add(type);
  td.textContent = message;
  setTimeout(() =>{
    row.removeChild(td)
  }, 5000)
}