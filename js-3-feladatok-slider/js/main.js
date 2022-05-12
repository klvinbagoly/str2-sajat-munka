import { imageData } from "./images.js";

const imgContainer = document.querySelector('.img-container')
const allPictures = []

let rowNumber = 0

const generatePictures = () => {
  imageData.forEach((img, i) => {
    const picture = document.createElement('img')
    picture.src = img.url
    picture.style.left = `${-100 + i * 100}vw`
    imgContainer.appendChild(picture)
    allPictures.push(picture)
  })
}

generatePictures()