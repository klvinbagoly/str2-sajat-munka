// <ℹ️> A kommentelt részek csak a kód korábbi verzióját dokumentálják. </ℹ️>
function openModal (){
    const modal = document.querySelector('.modal');
    modal.setAttribute('class','modal-visible');
    // setTimeout(() =>
    // document.body.addEventListener('click', closeModal), 1000
    // )
    // modal.addEventListener('click', ev =>
    //     ev.stopPropagation()); HELYETT:
    //document.body.setAttribute('style', 'background-color: rgba(11, 11, 11, 0.8);');
    // const container = document.querySelector('.container');
    // window.addEventListener('click', function(ev) {
    //     if (ev.target == container ||ev.target == document.body ||ev.target == document.body.parentElement){
    //         closeModal();
    //     }}); HELYETT:
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('overlay-visible');
    overlay.addEventListener('click', closeModal);
}

// function stopClosing (ev){
//     ev.stopPropagation()
// }  => Nem kell.

// function setEventListener (){
//     let background = document.querySelector('body:not".modal"') =>Nem működik XD
//     background.addEventListener('click', closeModal)
// }   

function closeModal (){
    const modal = document.querySelector('.modal-visible');
    modal.setAttribute('class','modal');
    //document.body.setAttribute('style', 'background-color:  rgba(55, 55, 55, 0.2)');
    // document.body.removeEventListener('click', closeModal); HELYETT:
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('overlay-visible');
    overlay.removeEventListener('click', closeModal);
}