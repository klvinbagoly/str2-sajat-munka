import { imageData } from "./images.js";

//Pictures.
const imgPrevious = document.querySelector('.img-previous')
const imgCurrent = document.querySelector('.img-current')
const imgNext = document.querySelector('.img-next')
const images = [imgCurrent, imgPrevious, imgNext]
//Caption and counter.
const caption = document.querySelector('.caption')
const counter = document.querySelector('.counter')
//Left-right buttons.
const toLeft = document.querySelector('.controls-left')
const toRight = document.querySelector('.controls-right')
// Pagers.
const pagers = []

//Current state.
let current = 0
let next = 1
let previous = imageData.length - 1

// Time parameters.
let animationTime = 2000
let delayTime = 8000

let pictureInterval
let animationInterval
let clicked = 0

const changePictures = (delay) => {
  console.log("Picture interval ", pictureInterval);

  // Update background images and animation time.
  imgPrevious.style.backgroundImage = `url("${imageData[previous].url}")`
  imgCurrent.style.backgroundImage = `url("${imageData[current].url}")`
  imgNext.style.backgroundImage = `url("${imageData[next].url}")`

  images.forEach(img => img.style.animationDuration = `${animationTime / 1000}s`)

  // Update caption and counter text.
  caption.textContent = imageData[current].title
  counter.textContent = `${current + 1} / ${imageData.length}`

  // Update pagers.
  pagers.forEach(pager => pager?.classList.remove('pager-active'))
  pagers[current]?.classList.add('pager-active')

}

const animateImages = () => {
  console.log("Animation interval ", animationInterval);
  
  // Start animation.
  images.forEach(img => {
    img.classList.add('img-slide')
  })
  setTimeout(newPicture, animationTime)
}

const newPicture = (delay) => {
  // Set new state and stop animation.
  current++
  previous++
  next++
  if (previous >= imageData.length) previous -= imageData.length;
  if (current >= imageData.length) current -= imageData.length;
  if (next >= imageData.length) next -= imageData.length;

  images.forEach(img => {
    img.classList.remove('img-slide')
  })

  // Update pictures.
  changePictures(delay)
}

const moveToLeft = () => {
  // Wait for animation ending.
  if (imgCurrent.classList.contains('img-slide') 
  || imgCurrent.classList.contains('img-slide-back')
  || imgCurrent.classList.contains('fadeout')){
    setTimeout(moveToLeft, animationTime)
    return
  }
  // Count number of clicks in one cycle.
  clicked++
  console.log(clicked);
  setTimeout(() => clicked--, delayTime)

  // Start animation and set new state.
  images.forEach(image => image.classList.add('img-slide-back'))
  current--
  previous--
  next--
  if (previous < 0) previous += imageData.length;
  if (current < 0) current += imageData.length;
  if (next < 0) next += imageData.length;

  // Stop previous intervals.
  clearInterval(pictureInterval)
  clearInterval(animationInterval)

  setTimeout(() => {
    // Stop animation and start new intervals.
    images.forEach(image => image.classList.remove('img-slide-back'))
    startSlider()
  }, animationTime)
}

const moveToRight = () => {
  // Wait for animation ending.
  if (imgCurrent.classList.contains('img-slide') 
  || imgCurrent.classList.contains('img-slide-back')
  || imgCurrent.classList.contains('fadeout')){
    setTimeout(moveToRight, animationTime)
    return
  }
  // Count number of clicks in one cycle.
  clicked++
  console.log(clicked);
  setTimeout(() => clicked--, delayTime)

  // Stop previous intervals.
  clearInterval(pictureInterval)
  clearInterval(animationInterval)

  // Start animation and new intervals.
  animateImages()
  startSlider()
}

toLeft.addEventListener('click', moveToLeft)
toRight.addEventListener('click', moveToRight)

const createPagers = () => {
  for (let i = 0; i < imageData.length; i++){
    let pager = document.createElement('div')
    pager.classList.add('pager-button')
    if (i === current) pager.classList.add('pager-active')
    document.querySelector('.pager').appendChild(pager)
    pagers.push(pager)
  }
}

createPagers()

const startSlider = () => {
  changePictures()
  // Prevent multiple paralel intervals.
   if (clicked > 1) {
     return
   }
   // Start new intervals.
  pictureInterval = setInterval(changePictures, delayTime)

  setTimeout(() => {
    animateImages()
    animationInterval = setInterval(animateImages, delayTime)

  }, delayTime - animationTime)
}

startSlider()

const paging = (index) => {
  // Wait for animation ending.
  if (imgCurrent.classList.contains('img-slide') 
  || imgCurrent.classList.contains('img-slide-back')
  || imgCurrent.classList.contains('fadeout')){
    setTimeout(paging, animationTime, index)
    return
  }
  // Count number of clicks in one cycle.
  clicked++
  console.log(clicked);
  setTimeout(() => clicked--, delayTime)

  // Stop previous intervals.
  clearInterval(pictureInterval)
  clearInterval(animationInterval)

  // Set state and new picture.
  next = index
  current = next === 0 ? imageData.length - 1 : next - 1
  previous = current === 0 ? imageData.length - 1 : current - 1
  imgNext.style.backgroundImage = `url("${imageData[next].url}")`

  // Start animation.
  imgCurrent.classList.add('fadeout')
  imgNext.classList.add('fadein')

  setTimeout(() => {
    // Set new state.
    next = next === imageData.length - 1 ? 0 : next + 1
    current = current === imageData.length - 1 ? 0 : current + 1
    previous = previous === imageData.length - 1 ? 0 : previous + 1

    // Stop animation and start new intervals.
    imgCurrent.classList.remove('fadeout')
    imgNext.classList.remove('fadein')
    startSlider()
  }, animationTime)
}

pagers.forEach((pager, i) => pager.addEventListener('click', () => paging(i)))