import {
  notes,
  notePlaces,
  measureGroup,
  noteGroupNumber
} from './main.js'

const bassDrum = document.querySelector('.bass-drum');
const tenorDrum = document.querySelector('.tenor-drum');
const snareDrum = document.querySelector('.snare-drum');

const playBtn = document.querySelector('#playButton');
const playLabel = document.querySelector('#playLabel');
const bpmInput = document.querySelector('#bpm');

let bpm = 120;
let isPlaying = false;
let currentNote = 0;

const playNote = () => {
  if (!isPlaying) return;

  // notePlaces.forEach(note => note.style.boxShadow = 'none')
  // notePlaces[currentNote].style.boxShadow = '0 0 2px grey ';

  const note = notes[currentNote];

  if (note.classList.contains('note-active')) {
    notes.forEach(note => note.style.backgroundColor = 'black');
    note.style.backgroundColor = 'red';

    // bassDrum.pause();
    // tenorDrum.pause();
    // snareDrum.pause(); 

    if (currentNote % measureGroup === 0) {
      bassDrum.load();
      bassDrum.play()
    } else if (currentNote % noteGroupNumber === 0) {
      tenorDrum.load();
      tenorDrum.play()
    } else {
      snareDrum.load();
      snareDrum.play()}
  }

  currentNote = currentNote > notes.length - 2 ? 0 : currentNote + 1;
  setTimeout(playNote, 30000 / bpm)
}

const startPlay = () => {
  currentNote = 0;
  isPlaying = true;
  
  playBtn.value = '⏸';
  playLabel.textContent = 'Stop';
  playBtn.removeEventListener('click', startPlay);
  playBtn.addEventListener('click', stopPlay);

  playNote()
}

const stopPlay = () => {
  isPlaying = false;
  
  playBtn.value = '▶';
  playLabel.textContent = 'Play';
  playBtn.removeEventListener('click', stopPlay);
  playBtn.addEventListener('click', startPlay);

  notePlaces.forEach(note => {
    note.removeAttribute('style')
  })
}

playBtn.addEventListener('click', startPlay)

bpmInput.addEventListener('change', () => {
  bpm = bpmInput.value;
  bpm = bpm < 30 ? 30 : bpm > 360 ? 360 : bpm;
  bpmInput.value = bpm;
})

export {startPlay} 