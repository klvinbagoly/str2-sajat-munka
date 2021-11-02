let stop = false;
function openModal (){
    const modal = document.querySelector('.modal');
    modal.setAttribute('class','modal-visible');
    document.body.setAttribute('style', 'background-color: rgba(11, 11, 11, 0.8);');
    setTimeout(() =>
    window.addEventListener('click', ()=>{closeModal(false)}), 100
    ) 
}

function closeModal (inside = false){
    if (inside){
        stop=true;
        setTimeout(()=>{stop=false},100)
    }
    if(stop){return}
    const modal = document.querySelector('.modal-visible');
    modal.setAttribute('class','modal');
    document.body.setAttribute('style', 'background-color:  rgba(55, 55, 55, 0.2)');
    window.removeEventListener('click', ()=>{closeModal(false)});
}