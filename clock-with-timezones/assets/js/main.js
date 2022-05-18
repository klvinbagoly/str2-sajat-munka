import timezones from "./timezones.js";

const clocks = Array.from(document.querySelectorAll('.clock'))
const times = {}

const createNumbers = (clock) => {
  const center = clock.querySelector('.clock-center')
  
  for (let i = 1; i < 13; i++){
    const number = document.createElement('span')
    number.classList.add('number')
    number.textContent = i
    const angle = Math.PI * i / 6
    const x = 80 * Math.sin(angle) - 6
    const y = -80 * Math.cos(angle) - 6
    center.appendChild(number)
    number.style.transform = `translate(${x}px, ${y}px)`
  }
}

const getTimes = () => {
  const now = new Date()
  // Get UTC date
  now.setMinutes(now.getTimezoneOffset())
  const UTCHour = now.getHours()
  for (let place in timezones) {
    times[place] = new Date()
    times[place].setHours(UTCHour + timezones[place])
  }
}

const setCaption = (clock) => {
  const caption = clock.querySelector('.clock-caption')
  let text = clock.classList[1]
  text = text[0].toUpperCase() + text.slice(1)
  const date = times[text]
  caption.innerHTML = `${text}<br><div class="time">${date.toTimeString().slice(0, 8)}</div>`
}

const setClock = (clock) => {
  const hour = clock.querySelector('.hour-container')
  const minute = clock.querySelector('.minute-container')
  const second = clock.querySelector('.second-container')

  const text = clock.classList[1]
  const upperText = text[0].toUpperCase() + text.slice(1)
  const date = times[upperText]
  
  hour.style.transform = `rotate(${(date.getHours() % 12) * 30 + (date.getMinutes()) * 0.5 + 180}deg)`
  minute.style.transform = `rotate(${date.getMinutes() * 6 + 180}deg)`
  second.style.transform = `rotate(${date.getSeconds() * 6 + 180}deg)`
}

window.onload = () => {
  getTimes()
  clocks.forEach(createNumbers)
  clocks.forEach(setCaption)
  clocks.forEach(setClock)
  setInterval(() => {
    getTimes()
    clocks.forEach(setClock)
    clocks.forEach(setCaption)
  }, 1000)
}


