let balloonsPopped = 0;
const createBalloon = (color,row) => {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon',color);
  row.appendChild(balloon);
}
const createRow = (colors) => {
  const row = document.createElement('div');
  row.classList.add('row');
  colors.forEach(color=> createBalloon(color, row))
  document.querySelector('.container').appendChild(row)
}

const shuffleFisherYates = (array) => {
  array.forEach((item, i) =>  {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], item];
  }) 
  return array;
}

const createCanvas = () => {
  const colors = ['red','blue','yellow','green','gray'];
    colors.forEach(() => createRow(shuffleFisherYates(colors)))
}

const popBalloon = function(){   // Arrow function-nél a this === Window!!!
  this.removeEventListener('mouseover', popBalloon);
  this.classList.replace('balloon', 'balloon--popped');
  this.textContent = "POP!!";
  this.style.transform = `rotate(${Math.random()*50-25}deg)`;
  setTimeout(() => {
    this.textContent = ''
  }, 300);

  balloonsPopped += 1;
  if (balloonsPopped >= 25){
    showMessage();
  }
}

const showMessage = () => {
  document.querySelector('.container').style.display = 'none';
  document.querySelector('.message').style.display = 'block';
}

createCanvas();
document.querySelectorAll('.balloon')
.forEach(balloon => balloon.addEventListener('mouseover', popBalloon))