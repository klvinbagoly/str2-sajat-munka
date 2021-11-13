const allAnimals = ['🐱','🐶','🐨','🐷','🐀','🐰','🦊','🐻','🐸','🐵']

const numberOfPairs = 5;
let firstGameEnded = false;
let numberOfPairsFound = 0;
let numberOfCardsUp = 0; // Egy körben hány kártya lett felfordítva.
let firstCardUp; // Az első felfordított kártya egy menetben.


// Játéktér létrehozása
const createCard = (icon,row)=> {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardUp = document.createElement('div');
  cardUp.classList.add('card-up');
  const cardDown = document.createElement('div')
  cardDown.classList.add('card-down');
  cardUp.textContent = icon;

  card.appendChild(cardDown);
  card.appendChild(cardUp);
  row.appendChild(card);
}

const fillRows = (animalArray) => {
  const row1 = document.querySelector('.first-row');
  const row2 = document.querySelector('.second-row');
  animalArray.slice(0, numberOfPairs).forEach(animal => {
    createCard(animal,row1)
  });
  animalArray.slice(numberOfPairs, numberOfPairs * 2).forEach(animal => {
    createCard(animal,row2)
  });
}

const createBoard = () => {
  allAnimals.sort(()=>Math.random() - 0.5); 
  const animals = Array(numberOfPairs)
  .fill(null)
  .map((item,index) => allAnimals[index]); // Kiválasztjuk az 5 állatot.
  const animalArray = [...animals, ...animals].sort(()=>Math.random() - 0.5);
  fillRows(animalArray)
}

const clearBoard = () => {
  const row1 = document.querySelector('.first-row');
  const row2 = document.querySelector('.second-row');
  while (row1.childElementCount > 0) {
    row1.removeChild(row1.firstChild)
  }
  while (row2.childElementCount > 0) {
    row2.removeChild(row2.firstChild)
  }
}
// Játék menete
const validatePair = (card) => {
  console.log(card)
  if (card.lastElementChild.textContent === firstCardUp.lastElementChild.textContent){
    numberOfPairsFound += 1;
    card.removeEventListener('click',turnCardUp)
    firstCardUp.removeEventListener('click',turnCardUp)
  } else {
    setTimeout(() => {

      turnCardDown(card);
      turnCardDown(firstCardUp);
    },500)
  }
  if (numberOfPairs === numberOfPairsFound){
    // Játék vége
  }
}


const turnCardUp = (event) => {
  console.log(event.target);
  let card = event.target;
  if (card.className !== 'card'){
    card = card.parentElement;
  }
  numberOfCardsUp += 1;
  console.log('Number of card up: ', numberOfCardsUp, 'Card: ',card)
  card.style = 'transform: rotateY(180deg)';
  if (numberOfCardsUp === 1){
    firstCardUp = card;
    console.log(firstCardUp)
  }
  if (numberOfCardsUp >= 2){
    validatePair(card);
    numberOfCardsUp = 0;
  }
}
const turnCardDown = (card) => {
  card.style = 'transform: rotateY(0deg)';
  
}
 // Eseményfigyelők
const addEventListenersToCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.addEventListener('click',turnCardUp))
  cards.forEach(card => card.removeEventListener('click',startGame))
}

const removeEventListenersFromCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.removeEventListener('click',turnCardUp))

}
// Vezérlők
const startGame = () => {
  if (firstGameEnded){
    
    clearBoard();
    createBoard();
  }
  addEventListenersToCards();
  // Időmérő
}


const endGame = () => {
  removeEventListenersFromCards();
  firstGameEnded = true;
  // Időmérő leáll
  // Felirat
  setTimeout(startGame,5000);
}

// ~~~~~~~~~~~~~~~~~~~ //
createBoard();

const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.addEventListener('click',startGame))
  cards.forEach(card => card.addEventListener('click',turnCardUp))

