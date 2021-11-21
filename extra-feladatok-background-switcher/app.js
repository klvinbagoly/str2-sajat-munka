document.querySelectorAll('.switch').forEach(item =>
  item.addEventListener('click', function(){
    document.body.style.backgroundColor = this.style.backgroundColor
  })
  )