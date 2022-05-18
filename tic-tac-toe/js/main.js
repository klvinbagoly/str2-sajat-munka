const cells = document.querySelectorAll('.game-cell');
const message = document.querySelector(".message");
const newGameButton = document.querySelector('button.new-game');

let mark = 'X';
let rows = Array(3).fill('').map(i => Array(3).fill(''));


const putMark = function(cell, index) {
  cell.style.pointerEvents = "none";
  const img = cell.querySelector('img');
  img.src = `img/${mark}.jpg`;
  img.style.height = "80%";
  
  const row = Math.floor(index / 3);
  const col = index % 3;
  rows[row][col] = mark;
  
  if (check()) return;
  mark = mark === "X" ? "O" : "X";
  message.textContent = `The next player is: ${mark}`
}

const check = () => {
 if (rows.some(row => row.every(cell => cell === mark))) {
   win(); return true
 }
 if (rows.some((row, index) => rows.every(row => row[index] === mark))){
  win(); return true
 }
 if (rows.every((row, index) => row[index] === mark)){
  win(); return true
 }
 if (rows.every((row, index) => row[2 - index] === mark)){
  win(); return true
 }
}

const win = () => {
  cells.forEach(cell => cell.style.pointerEvents = "none");
  message.textContent = `And the winner is: Player ${mark}! Congratulations!`
}

cells.forEach((cell, index) => cell.addEventListener('click', function() {
  putMark(cell, index)
}))

newGameButton.onclick = () => {
  rows = rows.map(row => row.map(cell => ''));
  cells.forEach(cell => {
    cell.style.pointerEvents = "auto";
    const img = cell.querySelector('img');
    img.style.height = '0';
  })
  message.textContent = `The next player is: ${mark}`
}