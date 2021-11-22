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
  calculate(operation)
}

const calculate = (str = '0+0') => {
  str.match(/(?:\d+(?:\.\d+)?)(?:[×÷]\d+(?:\.\d+)?)*/g)
  .forEach(op => str = str.replace(op, multiplyAndDivide(op)));

  if (str.includes('NaN')){
    document.querySelector('.results').textContent = "Don't divide by 0!"
  } else {
    str = addAndSubtract(str);
    document.querySelector('.results').textContent = str;
  }
}

// const add = (operation = '0+0') => {
//   if (operation.indexOf('+') === -1){
//     return parseFloat(operation)
//   };
//   const array = operation.split('+');
//   return array.reduce((a,b) => parseFloat(a) + parseFloat(b))
// }

// const subtract = (operation) => {
//   if (operation.indexOf('-') === -1){
//     return add(operation);
//   }
//   const array = operation.split('-');
//   return array.reduce((a,b) => add(a.toString()) - add(b))
// }
const addAndSubtract = (str) => {
  if (str.indexOf('+') === -1 && str.slice(1).indexOf('-') === -1){
    return str;
 }
 const firstNum = parseFloat(str);
 str = str.replace(firstNum.toString(),'');
 const secondNum = parseFloat(str.slice(1));

 if (str[0] === '+'){
   str = str.replace('+','');
   str = str.replace(secondNum.toString(), (firstNum+secondNum).toString())
 } else if (str[0] === '-'){
   str = str.replace('-','');
   str = str.replace(secondNum.toString(), (firstNum-secondNum).toString())  
 } //else return 'NaN';

 if (str.indexOf('+') !== -1 || str.indexOf('-') > 0){
   str = addAndSubtract(str)
 } ;
  return str;
}

const multiplyAndDivide = (str = '0*0') => {
  if (str.indexOf('×') === -1 && str.indexOf('÷') === -1){
     return str;
  }
  const firstNum = parseFloat(str);
  str = str.replace(firstNum.toString(),'');
  const secondNum = parseFloat(str.slice(1));

  if (str[0] === '×'){
    str = str.replace('×','');
    str = str.replace(secondNum.toString(), (firstNum*secondNum).toString())
  } else if (str[0] === '÷'){
    if (secondNum === 0) {return 'NaN'};
    str = str.replace('÷','');
    str = str.replace(secondNum.toString(), (firstNum/secondNum).toString())  
  } else return 'NaN';

  if (str.indexOf('×') !== -1 || str.indexOf('÷') !== -1){
    str = multiplyAndDivide(str)
  } ;
   return str;
}


document.querySelector('.calculate').addEventListener('click', parseResult)