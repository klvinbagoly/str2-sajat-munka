const pendingList = document.querySelector('.pending__list')
const pendingContainer = pendingList.parentElement
const completedList = document.querySelector('.completed__list')
const completedContainer = completedList.parentElement
const chill = document.querySelector('.chill')
const showBtn = document.querySelector('.show-btn')
const clearBtn = document.querySelector('.clear-btn')


let todos = []

// Display date.
const setDate = () => {
  const date = new Date()
  const dateDisplay = document.querySelector('.date')
  dateDisplay.innerHTML 
    = new Intl.DateTimeFormat(navigator.language || 'en-US', { weekday: 'long' }).format(date)
    + '<br>'
    + new Intl.DateTimeFormat(navigator.language || 'en-US').format(date)
  setInterval(setDate, 60000)
}

setDate()

// Starting the app.
const getTodos = () => {
  if (localStorage.todos) todos = JSON.parse(localStorage.getItem('todos'))
  console.log(todos);
  if (!todos){
    timeToChill()
  } else {
    // show pending items
    const pending = todos.filter(todo => todo.pending)
    if (pending.length === 0) {
      timeToChill()
    } else {
      createPendingItems(pending)
    }
    // create completed items
    const completed = todos.filter(todo => !todo.pending)
    createCompletedItems(completed)
  }
}

const createPendingItems = (todos) => {
  document.querySelector('.amount').textContent = todos.length

  let htmlText = ''
  todos.forEach(todo => {
    htmlText += `<div class="pending__list-item">
    <div>
      <input type="checkbox" name="${todo.title}" id="${todo.title}" title="Mark as completed" onchange="completeTodo(this)">
      ${todo.title}
    </div>
    <div class="hidden-button">
      <button title="Remove" onclick="removeTodo(this)" data-delete="${todo.title}"><i class="fa fa-times"></i></button>
    </div>
  </div>`
  })
  pendingList.insertAdjacentHTML('afterbegin', htmlText)
}

const createCompletedItems = (completed) => {
  document.querySelector('.percent').textContent
  =( Math.round(completed.length / todos.length * 100) || 0 )+ '%'
  
  if (completed.length === 0) return;

  let htmlText = ''
  completed.forEach(todo => {
    htmlText += `<div class="completed__list-item">
    <input type="checkbox" name="${todo.title}" id="${todo.title}" checked disabled>
    ${todo.title}
  </div>`
  })
  completedList.insertAdjacentHTML('afterbegin', htmlText)
}

// Change views.
const timeToChill = () => {
  pendingContainer.style.display = 'none'
  completedContainer.style.display = 'none'
  chill.style.display = 'block'
}

const showPending = () => {
  pendingContainer.style.display = 'block'
  // completedContainer.style.display = 'none'
  chill.style.display = 'none'
}

// Toggle button.
const toggleCompleted = () => {
  if (completedContainer.style?.display === 'none') {
    completedContainer.style.display = 'block'
    showBtn.textContent = 'Hide completed'
  } else {
    completedContainer.style.display = 'none'
    showBtn.textContent = 'Show completed'
  }
}



// DOM operations.
const createListItem = (todo) => {
  const item = document.createElement('div')
  item.classList.add('pending__list-item', 'slide-in')
  item.innerHTML = `<div>
  <input type="checkbox" name="${todo.title}" id="${todo.title}" title="Mark as completed" onchange="completeTodo(this)">
  ${todo.title}
</div>
<div class="hidden-button">
  <button title="Remove" onclick="removeTodo(this)" data-delete="${todo.title}"><i class="fa fa-times"></i></button>
</div>`
  pendingList.appendChild(item)

  setTimeout(() => {
    item.classList.remove('slide-in')
  }, 500)
}

const createCompletedItem = (todo) => {
  const item = document.createElement('div')
  item.classList.add('completed__list-item')
  item.innerHTML = `<input type="checkbox" name="${todo.title}" id="${todo.title}" checked disabled>
  ${todo.title}`
  completedList.appendChild(item)
}

const removeItem = (item) => {
  item.classList.add('slide-out')
  setTimeout(() => {
    item.remove()
    const pending = todos.filter(todo => todo.pending)
    if (pending.length === 0) timeToChill()
  }, 500);
}

// Save to storage and change captions.
const saveTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
  const pending = todos.filter(todo => todo.pending)
  document.querySelector('.amount').textContent = pending.length

  const completed = todos.filter(todo => !todo.pending)
  document.querySelector('.percent').textContent
  = (Math.round(completed.length / todos.length * 100) || 0) + '%'
}

// Add button / Enter key.
const addTodo = () => {
  const mainInput = document.querySelector('.main-input')
  const newTodo = {}
  newTodo.title = mainInput.value
  newTodo.pending = true
  mainInput.value = ''
  if (todos.some(todo => todo.title === newTodo.title && todo.pending)){
    alert('Item already exists!')
    return
  }
  if (newTodo.title === '') {
    alert('Error: empty field!')
    return
  }

  todos.push(newTodo)

  createListItem(newTodo)
  saveTodo()
  showPending()
}


// Checkbox event.
const completeTodo = (checkbox) => {
  const listItem = checkbox.parentElement.parentElement
  removeItem(listItem)
  const index = todos.findIndex(todo => todo.title === checkbox.id && todo.pending)
  todos[index].pending = false
  saveTodo()
  createCompletedItem(todos[index])
}

// Remove button.
const removeTodo = (btn) => {
  const listItem = btn.parentElement.parentElement
  removeItem(listItem)
  const index = todos.findIndex(todo => todo.title === btn.dataset.delete && todo.pending)
  todos.splice(index, 1)
  saveTodo()
}




// Clear all button.
const clearAll = () => {
  pendingList.childNodes.forEach(item => item.classList?.add('slide-out'))
  setTimeout(() => {
    todos = todos.filter(todo => !todo.pending)
    saveTodo()
    pendingList.textContent = ''
    timeToChill()
  }, 500)
}

getTodos()

document.querySelector('.main-button').addEventListener('click', addTodo)
showBtn.addEventListener('click', toggleCompleted)
clearBtn.addEventListener('click', clearAll)

document.forms[0].addEventListener('keyup', (event) => {
  if (event.code === 'Enter') addTodo()
})