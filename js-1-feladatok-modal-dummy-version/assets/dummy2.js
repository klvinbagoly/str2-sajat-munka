let stop = false;
function openModal (){
    const modal = document.querySelector('.modal');
    modal.setAttribute('class','modal-visible');
    document.body.setAttribute('style', 'background-color: rgba(11, 11, 11, 0.8);');
    setTimeout(() =>
    window.addEventListener('click', closeModal), 1000
    ) 
}

function closeModal (elem){
    const button = document.querySelector('.openerButton')
    const modal = document.querySelector('.modal-visible');
    if (elem === modal || elem === button){
      stop = true;
      setTimeout(()=> stop=false,1000);
    }
    if(stop) return;

    modal.setAttribute('class','modal');
    document.body.setAttribute('style', 'background-color:  rgba(55, 55, 55, 0.2)');
    window.removeEventListener('click', closeModal);
}