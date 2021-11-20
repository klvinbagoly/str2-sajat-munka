const getLivingCharachters = async () => {
  const response = await fetch('./json/got.json');
  const data = await response.json();
  const livingCharacters = data.filter(char => !(char.dead === true));
  return livingCharacters.slice(0,48).sort((a,b)=> Intl.Collator('en').compare(a.name, b.name))
}

// Main part
const createCharachter = (charachter) => {
  const figure = document.createElement('figure');
  figure.classList.add('main__figure');

  const image = document.createElement('img');
  image.classList.add('main__img');
  image.setAttribute('src', charachter.portrait || 'https://www.fillmurray.com/100/100');
  image.setAttribute('alt', charachter.name);

  const capture = document.createElement('figcapture');
  capture.classList.add('main__capture');
  capture.textContent = charachter.name;

  figure.appendChild(image);
  figure.appendChild(capture);
  document.querySelector('.main').appendChild(figure)
}

const createFigures = (charachterArray) => {
  charachterArray.forEach(charachter => {
    createCharachter(charachter)
  });
}

// Sidebar 
const showPicture = (char, sidebar) => {
  const picture = document.createElement('img');
  picture.classList.add('sidebar__picture');
  picture.setAttribute('src', char.picture || 'https://www.fillmurray.com/400/400');
  picture.setAttribute('alt', char.name);
  sidebar.appendChild(picture)
}

const showHouse = (char, sidebar) => {
  const house = document.createElement('img');
  house.classList.add('sidebar__house');
  house.setAttribute('src', `./assets/houses/${char.house}.png`);
  house.setAttribute('alt', char.house);
  sidebar.appendChild(house);
}
const showDescription = (char, sidebar) => {
  const header = document.createElement('h3');
  header.textContent = char.name || 'Character not found.';
  sidebar.appendChild(header);

  const bio = document.createElement('p');
  bio.innerHTML = char.bio || 'No description found.';
  sidebar.appendChild(bio);
}

const showCharachter = (char = {}) => {
  const sidebar = document.querySelector('.sidebar__description');
  sidebar.innerHTML = '';
  showPicture(char, sidebar);
  if (char.house) {showHouse(char, sidebar)};
  showDescription(char, sidebar);
}

const createEventListeners = async () => {
  const charachters = await getLivingCharachters();

  document.querySelectorAll('.main__figure')
  .forEach(figure => figure.addEventListener('click', function(){showCharachter(charachters
    .find(char => char.name === this.lastElementChild.textContent))}))
}

// Search
const searchCharachter = async (ev) => {
  ev.preventDefault();

  const charachters = await getLivingCharachters();
  const searchInput = document.querySelector('.sidebar__search').value;
  try {
    const newCharachter = charachters.find(char => char.name.match(new RegExp(`^${searchInput}$`, 'i')))
    showCharachter(newCharachter)
  } catch  {
    document.querySelector('.sidebar__description').innerHTML = 'Character not found.'
  }
}


getLivingCharachters().then(createFigures);

createEventListeners();

document.querySelector('.sidebar__form').addEventListener('submit', searchCharachter)