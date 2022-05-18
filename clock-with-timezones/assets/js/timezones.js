const now = new Date()
const month = now.getMonth()
const day = now.getDay()

const timezones = {
  // Márc. 27 előtt és okt. 30 után
  "Budapest": month < 3 && month * day < 82 || month > 8 && month * 30 + day >= 300
   ? 1
   : 2,
  "London": month < 3 && month * day < 82 || month > 8 && month * 30 + day >= 300
  ? 0
  : 1,
  // Márc. 13 előtt és nov. 6. után
  "Miami": month < 3 && month * 30 + day < 74 || month > 9 && month * 30 + day > 305
   ? -5
   : -4,
  "Bangkok": 7
}

export default timezones