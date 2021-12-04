const notePlaces = document.querySelectorAll('.note-place');
let notes = Array.from(document.querySelectorAll('.note')) ;
let flags = Array.from(document.querySelectorAll('.flag'));

let noteGroupNumber = 2;

notePlaces.forEach((place, i) => place.addEventListener('click', () => {
  if (notes[i].classList.contains('note-active')) {
    notes[i].classList.replace('note-active', 'note-none')
  } else notes[i].classList.replace('note-none', 'note-active')
  createFlags()
  //Visszaállítás
  notes = Array.from(document.querySelectorAll('.note')) ;
  flags = Array.from(document.querySelectorAll('.flag'));
} ))

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

export {
  notes,
  notePlaces
}