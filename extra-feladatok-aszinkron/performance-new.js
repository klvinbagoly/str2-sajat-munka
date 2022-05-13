import startRequest from "./http.js";
// import { paralelReq } from "./http2.js";

const data = {1:{}, 10:{}, 100:{}, 1000: {}}

let loadNumber = 1

// Ha azt akarjuk megmérni, mennyi idő, mire az összes adat megérkezik, és nem azt, mennyi idő elküldeni a kéréseket:

const repeat = async (times) => {
  for (let i = 0; i < times; i++){
    startRequest('GET', './users1.json', 3, () => checkData())
    startRequest('GET', './users2.json', 3, () => checkData())
    startRequest('GET', './users3.json', 3, () => checkData())
    // Ha úgy értelmezzük a feladatot, hogy az új lefutás előtt megvárja a három kérés eredményét:
    await new Promise((resolve, reject) => {
      setInterval(() => {
        if (loadNumber === i * 3 + 4) {
          resolve()
        }
      }, 1)
    })
  }
}


const loadCheck = [3, 30, 300, 3000]
const checkData = () => {
  if (loadCheck.includes(loadNumber)) {
    data[loadNumber / 3]['Párhuzamos'] = performance.now() - start
    if (loadNumber === 3000) {
      console.table(data)
    }
  } 
  loadNumber++
}

let start = performance.now()
repeat(1000)

// Így már megy az 1000 kérés is. 



//Callback

const iterations = [1000, 100, 10, 1]

const req1 = (times) => startRequest('GET', './users1.json', 3, () => req2(times))
const req2 = (times) => startRequest('GET', './users2.json', 3, () => req3(times))
const req3 = (times) => startRequest('GET', './users3.json', 3, () => restart(times))

const restart = (times) => {
  if (times >= iterations[iterations.length - 1]){
    iterations.pop()
    data[times]['Callback'] = performance.now() - startArray[times]
    if(times === 1000) console.table(data)
  }
  else {
    req1(times + 1)
  }
}
const startArray = {}
startArray[1] = performance.now()
req1(1)
startArray[10] = performance.now()
req1(1)
startArray[100] = performance.now()
req1(1)
startArray[1000] = performance.now()
req1(1)

// Eredmény:
// 1: {Párhuzamos: 12.400000095367432, Callback: 23.90000009536743}
// 10: {Callback: 158.59999990463257, Párhuzamos: 1229.6000003814697}
// 100: {Callback: 1434.0999999046326, Párhuzamos: 1804.8000001907349}
// 1000: {Callback: 10544.799999713898, Párhuzamos: 10619}

