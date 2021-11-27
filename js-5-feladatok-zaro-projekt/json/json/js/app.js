const userKeys = ['id', 'name', 'address', 'email']

const getUsers = async (url) => {
  const fetchOptions = {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  }
  fetch(url, fetchOptions)
  .then(data => data.json(),
  err => console.error(err)
  ).then(data => fillDataTable(data.users))
}

getUsers('./MOCK_DATA.json')

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
      });
        if (k === 'id') {
        input.setAttribute("readonly", true)
      } 
        td.appendChild(input)
      } catch (err) {
        console.log(err)
      }
    }
    const btnGroup = tr.insertCell()
    btnGroup.appendChild(createBtnGroup())  
  }
  const thead = createAnyElement('thead');
  const the = thead.insertRow()
  for (let k of userKeys){
    const th = the.insertCell();
    th.textContent = returnHead(k)
  }
   const last = the.insertCell()
   last.textContent = 'Actions'
  console.log(thead)
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
  const btnEdit = createAnyElement('button', {class: 'btn btn-edit', onclick: 'editUser(this)'});
  btnEdit.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
  const btnDel = createAnyElement('button', {class: 'btn btn-delete', onclick: 'deleteUser(this)'});
  btnDel.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

  btnGroup.appendChild(btnEdit);
  btnGroup.appendChild(btnDel);

  return btnGroup
}

const deleteUser = (elem) => {
  let tr = elem.parentElement.parentElement.parentElement;
  let id = tr.firstElementChild.textContent;
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
    () => getUsers('./MOCK_DATA.json')
  )}
}

const newUserRow = row => {
  let tr = createAnyElement('tr');
  for (let k of userKeys){
    let td = tr.insertCell()
    let input = createAnyElement('input', {
      class: 'new-user-input',
      name : k
    })
    td.appendChild(input)
  }

  let newBtn = createAnyElement('button', {
    class: 'btn btn-new',
    onclick: 'addUser(this)'
  })
  newBtn.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';

  let td = createAnyElement('td');
  td.appendChild(newBtn)
  tr.appendChild(td);
  return tr
}

const addUser = btn => {
  const tr = btn.parentElement.parentElement;
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
    data => getUsers('./MOCK_DATA.json')
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

const editUser = btn => {
  const tr = btn.parentElement.parentElement.parentElement;
  
  const data = getRowData(tr);
   
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
    data => getUsers('./MOCK_DATA.json')
  )
}