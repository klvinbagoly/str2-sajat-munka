import startRequest from "./http.js";
import { paralelReq } from "./http2.js";

const data = {1:{}, 10:{}, 100:{}, 1000: {}}

let start = performance.now()
paralelReq()
data[1]['Párhuzamos'] = performance.now() - start

const repeat = (times, fn) => {
  for (let i = 0; i < times; i++){
    fn
  }
}

start = performance.now()
repeat(10, paralelReq())
data[10]['Párhuzamos'] = performance.now() - start

start = performance.now()
repeat(100, paralelReq())
data[100]['Párhuzamos'] = performance.now() - start

start = performance.now()
repeat(1000, paralelReq())
data[1000]['Párhuzamos'] = performance.now() - start

console.table(data)

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

