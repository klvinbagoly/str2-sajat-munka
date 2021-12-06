import measureObject from "./measure.js";
import {bpm} from "./play.js"

let notePlaces = document.querySelectorAll('.note-place');
let notes = Array.from(document.querySelectorAll('.note')) ;
let flags = Array.from(document.querySelectorAll('.flag'));

let measureGroup = 4;
let noteGroupNumber = 2;

const noteEventListeners = () => {
  notePlaces.forEach((place, i) => place.addEventListener('click', () => {
    if (notes[i].classList.contains('note-active')) {
      notes[i].classList.replace('note-active', 'note-none')
    } else notes[i].classList.replace('note-none', 'note-active')
    createFlags()
    //Visszaállítás
    notes = Array.from(document.querySelectorAll('.note')) ;
    flags = Array.from(document.querySelectorAll('.flag'));
  } ))

}


const createFlags = () => {
  const noteGroup = notes.splice(0, noteGroupNumber);
  const flagGroup = flags.splice(0, noteGroupNumber);
  if (noteGroup.every(note => note.classList.contains('note-active'))) {
    createDoubleFlag(flagGroup)
  } else createSingleFlags(flagGroup, noteGroup)
  while (notes.length > 0) createFlags();

 
  
}

const createDoubleFlag = (flagGroup) => {
  flagGroup.forEach((flag, i) => {
    if (i === flagGroup.length - 1) {
      flag.className = flag.className.replace(/(^|\s)flag-\S+/g, ' flag-none')
    } else flag.className = flag.className.replace(/(^|\s)flag-\S+/g, ' flag-bracket')
  })
}

const createSingleFlags = (flagGroup, noteGroup) => {
  flagGroup.forEach((flag, i) => flag.className = flag.className.replace(/(^|\s)flag-\S+/g, 
    noteGroup[i].classList.contains('note-active') ? ' flag-single' : ' flag-none'))
}

document.querySelector('#measure').addEventListener('change', function() {
  const measure = this.value;
  
  const row = document.querySelector('.row');
  row.innerHTML = '';
  row.insertAdjacentHTML('afterbegin', `<div class="measure-sign">${measure.replace('/', '<br>')}</div>`);

  for (let i = 0; i < measureObject[measure].length; i++) {
    row.insertAdjacentHTML('beforeend', i === 0 ? `<div class="note-place">

    <div class="flag flag-single"></div>
    <div class="note note-active">
    </div>
  </div>` : `<div class="note-place">
  <div class="flag flag-none"></div>

  <div class="note note-none">
  </div>
</div>`)
  }

  measureGroup = measureObject[measure].measureGroup;
  noteGroupNumber = measureObject[measure].noteGroupNumber;

  notes = Array.from(document.querySelectorAll('.note')) ;
  flags = Array.from(document.querySelectorAll('.flag'));
  notePlaces = document.querySelectorAll('.note-place');

  noteEventListeners()
})

noteEventListeners()

export {
  notes,
  notePlaces,
  measureGroup,
  noteGroupNumber
}