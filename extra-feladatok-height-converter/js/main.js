const readFeet = () => document.querySelector('#feet').value;

const readInches = () => document.querySelector('#inches').value;

const convert = () => 30.48 * readFeet() + 2.54 * (readInches() || 0);

const alertMessage = (text) => 
document.querySelector('.result').textContent = `Enter between 0 and 100 ${text}.`;

const verifyInputs = () => {
  if (readFeet() < 0 || readFeet() > 100 || !readFeet()) {
    alertMessage('feet');
    return false;
  }
  if (readInches() < 0 || readInches() > 100) {
    alertMessage('inches');
    return false;
  } else return true;
}

const writeResult = (event) => {
  event.preventDefault();
  if (!verifyInputs()) return;
  document.querySelector('.result').textContent = `Result: ${convert()} cm.`;
  document.querySelector('#feet').value = '';
        document.querySelector('#inches').value = '';
}

document.querySelector('.submit-button').addEventListener('click', writeResult)

