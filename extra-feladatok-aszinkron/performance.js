import startRequest from "./http.js";
// import { paralelReq } from "./http2.js";

const data = {1:{}, 10:{}, 100:{}, 500:{}, 1000: {}}

let loadNumber = 1

// Ha azt akarjuk megmérni, mennyi idő, mire az összes adat megérkezik, és nem azt, mennyi idő elküldeni a kéréseket:

const repeat = (times) => {
  for (let i = 0; i < times; i++){
    startRequest('GET', './users1.json', 3, () => checkData())
    startRequest('GET', './users2.json', 3, () => checkData())
    startRequest('GET', './users3.json', 3, () => checkData())
  }
}

// const checkData = (maxTimes, times) => {
//   if (loadNumber >= maxTimes) {
//     data[times]['Párhuzamos'] = performance.now() - start[times]
//     loadNumber = 1
//   } else {
//     loadNumber++
//   }
// }

// let start = {}
// start[1] = performance.now()
// repeat(1)

// start[10] = performance.now()
// repeat(10)

// start[100] = performance.now()
// repeat(100)

// start[1000] = performance.now()
// repeat(1000)

const loadCheck = [3, 30, 300, 1500]
const checkData = () => {
  if (loadCheck.includes(loadNumber)) {
    data[loadNumber / 3]['Párhuzamos'] = performance.now() - start
    if (loadNumber === 1500) {
      console.table(data)
    }
  } 
  loadNumber++
}

let start = performance.now()
repeat(500)

// 500 feletti ismétlésszámnál (párhuzamos kérés esetén) feladta a böngésző: 
// net::ERR_INSUFFICIENT_RESOURCES



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
// 1: {Párhuzamos: 603.3999996185303, Callback: 1155.5999999046326}
// 10: {Párhuzamos: 618.3999996185303, Callback: 1257.5}
// 100: {Párhuzamos: 1259.5, Callback: 2097.6000003814697}
// 500: {Párhuzamos: 1672.7999997138977}
// 1000: {Callback: 8963.900000095367}

