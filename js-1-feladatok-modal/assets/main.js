function openModal (){
    const modal = document.querySelector('.modal');
    modal.setAttribute('class','modal-visible');
    document.body.setAttribute('style', 'background-color: rgba(11, 11, 11, 0.8);');
    setTimeout(() =>
    document.body.addEventListener('click', closeModal), 1000
    )
    modal.addEventListener('click', ev =>
        ev.stopPropagation());
}

// function stopClosing (ev){
//     ev.stopPropagation()
// }

// function setEventListener (){
//     let background = document.querySelector('body:not".modal"')
//     background.addEventListener('click', closeModal)
// }

function closeModal (){
    const modal = document.querySelector('.modal-visible');
    modal.setAttribute('class','modal');
    document.body.setAttribute('style', 'background-color:  rgba(55, 55, 55, 0.2)');
    document.body.removeEventListener('click', closeModal);
}