const resultsArea = document.querySelector('.results');

const writeValue = function(){
  if (resultsArea.textContent.includes('t')) resultsArea.textContent = ''
  resultsArea.textContent = resultsArea.textContent + this.textContent
}

document.querySelectorAll('.number, .operator').forEach(item => 
  item.addEventListener('click', writeValue))

document.querySelector('.clear').addEventListener('click', () =>
resultsArea.textContent = ''
)


const parseResult = () => {
  const operation = resultsArea.textContent;
  const tester = /^-?(\d+(?:\.\d+)?)([+\-×÷]-?\d+(?:\.\d+)?)*$/;
  if (operation.match(tester) === null){
    resultsArea.textContent = 'Not valid operation.';
    return;
  }
  calculate(operation)
}

const calculate = (str = '0+0') => {
  str.match(/(?:-?\d+(?:\.\d+)?)(?:[×÷]-?\d+(?:\.\d+)?)*/g)
  .forEach(op => str = str.replace(op, multiplyAndDivide(op)));

  // 0 / 0 is NaN
  if (str.includes('Infinity') || str.includes('NaN')){
    resultsArea.textContent = "Don't divide by 0!"
  } else if (str.includes('e')){
    resultsArea.textContent = `Error: too ${str.includes('e-') ? 'small' : 'big'} number!`
  } else {
    str = addAndSubtract(str);
    resultsArea.textContent = str;
  }
}

const convertDoubleNegative = (str) => str.startsWith('--') ? Number(str.slice(2)) : Number(str)

const addAndSubtract = (str) => {
const nums = str.match(/-?-?\d+(?:\.\d+)?/g);
return nums.reduce((a,b) =>Number(a) + convertDoubleNegative(b))
}

const multiplyAndDivide = (str = '0*0') => {
  const nums = str.match(/-?\d+(?:\.\d+)?/g);
  const ops = str.match(/[×÷]/g);
  return nums.reduce((a,b,i)=> ops[i-1] === '×' ? a*b : a / b)
}



document.querySelector('.calculate').addEventListener('click', parseResult)