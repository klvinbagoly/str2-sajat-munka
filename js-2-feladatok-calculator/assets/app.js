const writeValue = function(){
  const resultsArea = document.querySelector('.results');
  resultsArea.textContent = resultsArea.textContent + this.textContent
}

document.querySelectorAll('.number, .operator').forEach(item => 
  item.addEventListener('click', writeValue))

document.querySelector('.clear').addEventListener('click', () =>
document.querySelector('.results').textContent = ''
)


const parseResult = () => {
  const operation = document.querySelector('.results').textContent;
  const tester = /^-?(\d+(?:\.\d+)?)([+\-×÷]\d+(?:\.\d+)?)*$/;
  if (operation.match(tester) === null){
    document.querySelector('.results').textContent = 'Not valid operation.';
    return;
  }
  // Számlálás
}

const calculate = (operation = '0+0') => {
   
}

const add = (operation = '0+0') => {
  if (operation.indexOf('+') === -1){
    return parseFloat(operation)
  };
  const array = operation.split('+');
  return array.reduce((a,b) => parseFloat(a) + parseFloat(b))
}

const subtract = (operation) => {
  if (operation.indexOf('-') === -1){
    return add(operation);
  }
  const array = operation.split('-');
  return array.reduce((a,b) => add(a.toString()) - add(b))
}
const multiply = () => {}
const divide = () => {}



document.querySelector('.calculate').addEventListener('click', parseResult)