const users = []

const startRequest = (method, path, i = 3, callback) => {
  // console.log(`Request started to ${path}.`);
  const req = new XMLHttpRequest()
  req.open(method, path)
  req.onreadystatechange = (err) => {
    if (req.status === 404){
      setTimeout(() => {
        i--
        if (i > 0) {startRequest(method, path, i, callback)}
        else (console.log(err))
      }, 5000) 
    }
  }
  // req.addEventListener('load', callback)
  req.addEventListener('load', () => {
    if (req.readyState === 4 && req.status === 200){
      mergeUsers(req.responseText);
      callback()
    }
  })
  req.send()
}

const mergeUsers = (json) => {
  const data = JSON.parse(json).users
  users.push(...data)
  // console.log(users);
}

const clg = () =>{}// console.log(users)

const req1 = (callback = req2) => startRequest('GET', './users1.json', 3, callback)
const req2 = (callback = req3) => startRequest('GET', './users2.json', 3, callback)
const req3 = (callback = clg) => startRequest('GET', './users3.json', 3, callback)

req1()

export default startRequest