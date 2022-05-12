const users = []

const startRequest = (method, path, i = 3) => {
  // console.log(`Request started to ${path}.`);
  const req = new XMLHttpRequest()
  req.open(method, path)
  req.onerror = (err) => {
      setTimeout(() => {
        i--
        if (i > 0) {startRequest(method, path, i)}
        else (console.log(err))
      }, 5000) 
  }
  req.addEventListener('load', () => {
    mergeUsers(req.responseText);
  })
  req.send()
}

const mergeUsers = (json) => {
  const data = JSON.parse(json).users
  users.push(data)
  // console.log(users);
}

const clg = () => {
  // console.log(users)
}

const req1 = () => startRequest('GET', './users1.json', 3)
const req2 = () => startRequest('GET', './users2.json', 3)
const req3 = () => startRequest('GET', './users3.json', 3)

req1()
req2()
req3()

export const paralelReq = () => {
  req1()
  req2()
  req3()
}