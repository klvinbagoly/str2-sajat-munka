const allAnimals = ['🐱','🐶','🐨','🐷','🐀','🐰','🦊','🐻','🐸','🐵','🐴','🐢','🐼','🦁','🐮']

const numberOfPairs = 5;
let numberOfPairsFound = 0;
let numberOfCardsUp = 0; // Egy körben hány kártya lett felfordítva.
let firstCardUp; // Az első felfordított kártya egy menetben.

const counter = new Date(0); // Stopper
const recordTime = new Date();

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

const shuffleFisherYates = (array) => {
  array.forEach((item, i) =>  {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], item];
  }) 
  return array;
}

const createBoard = () => {
  shuffleFisherYates(allAnimals);
  const animals = Array(numberOfPairs)
  .fill(null)
  .map((item,index) => allAnimals[index]); // Kiválasztjuk az 5 állatot.
  const animalArray = shuffleFisherYates([...animals, ...animals]);
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
  if (card.lastElementChild.textContent === firstCardUp.lastElementChild.textContent){
    numberOfPairsFound += 1,
    console.log('Number of pairs found: ',numberOfPairsFound),
    card.removeEventListener('click',turnCardUp),
    firstCardUp.removeEventListener('click',turnCardUp)
  } else {
    setTimeout(() => {

      turnCardDown(card),
      turnCardDown(firstCardUp);
    },500)
  }
  if (numberOfPairs === numberOfPairsFound){
    console.log('All pairs found!')
    endGame()
  }
}


const turnCardUp = function(){ // Event.target was sometimes the card-down, sometimes the card itself, I don't understand... But "this" version is shorter anyway.
  if (this.style.transform === 'rotateY(180deg)') return;
  
  numberOfCardsUp += 1,
  this.style.transform = 'rotateY(180deg)'
  if (numberOfCardsUp === 1){
    firstCardUp = this;
  }
  if (numberOfCardsUp >= 2){
    validatePair(this);
    numberOfCardsUp = 0;
  }
}
const turnCardDown = (card) => {
  card.style.transform = 'rotateY(0deg)';
  
}
 // Eseményfigyelők
const addEventListenersToCards = () => {
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => card.addEventListener('click',turnCardUp)),
  cards.forEach(card => card.addEventListener('click',startGame))
}

const removeEventListenersFromCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.removeEventListener('click',turnCardUp))

}

// Időmérő
const showTime = () => {
  if (numberOfPairsFound === numberOfPairs) return;

  document.querySelector('.counter__span').textContent = 
  counter.getMinutes().toString().padStart(2,0) + ':' + 
  counter.getSeconds().toString().padStart(2,0);

  counter.setSeconds(counter.getSeconds() + 1);

  setTimeout(showTime,1000)
}

const showResults = () => {
  if (counter < recordTime) {
    recordTime.setTime(counter);
    document.querySelector('.results').textContent = 'Your record: ' +
    document.querySelector('.counter__span').textContent
  }
}
// Vezérlők
const startGame = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.removeEventListener('click',startGame))
  console.log('Game started.')
  numberOfPairsFound = 0;

  showTime();
}


const endGame = () => {
  removeEventListenersFromCards();
  showResults();
  console.log('First game ended.')
  // Időmérő leáll
  setTimeout(newGame,5000);
}

const newGame = () => {
  console.log('New game started.')
  clearBoard();
    createBoard();
    counter.setTime(0);
    document.querySelector('.counter__span').textContent = '00:00';
    addEventListenersToCards();
}

// ~~~~~~~~~~~~~~~~~~~ //
createBoard();

addEventListenersToCards();
