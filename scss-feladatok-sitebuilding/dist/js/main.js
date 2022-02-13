$('[data-toggle="tooltip"]').tooltip()

const navbar = document.querySelector('.nav');
const navbarLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 0
    || document.documentElement.scrollTop > 0
    ) {
    navbar.style.backgroundColor = 'white';
    navbarLinks.forEach(link =>{
      link.classList.remove('text--primary', 'text-hover--white');
      link.classList.add('text--black', 'text-hover--primary')
    })
  }else {
    navbar.style.backgroundColor = 'transparent';
    navbarLinks.forEach(link =>{
      link.classList.add('text--primary', 'text-hover--white');
      link.classList.remove('text--black', 'text-hover--primary')
    })
  } 
})

const links = ['.downloadLink', 
'.featuresLink',
'.contactLink'
]

const targets = ['#discoverTheBuzz',
'#unlimitedFeatures',
'#weLoveNewFriends']

links.forEach((link, i) => {
  document.querySelector(link).addEventListener('click', ev => {
    ev.preventDefault();
    document.querySelector(targets[i]).scrollIntoView({
      behavior: "smooth"
    })
  })
})
