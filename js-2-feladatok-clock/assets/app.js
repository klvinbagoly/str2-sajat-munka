const showTime = () => {
  const now = new Date();
  document.querySelector('.clock').textContent = now.toTimeString().slice(0,8);
  const id = setTimeout(() => {clearTimeout(id); showTime()},1000)
}

showTime()