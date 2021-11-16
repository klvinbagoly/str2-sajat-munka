let balloonsPopped = 0;
const createBalloon = (color,row) => {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon',color);
  row.appendChild(balloon);
}
const createRow = (colors) => {
  const row = document.createElement('div');
  row.classList.add('row');
  for (let i = 0; i<5; i++){
    createBalloon(colors[i],row)
  }
  document.querySelector('.container').appendChild(row)
}

const createCanvas = () => {
  const colors = ['red','blue','yellow','green','gray'];
    for (let i = 0; i < 5; i++){
      colors.sort(() => Math.random() - 0.5);
      createRow(colors)
    }
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