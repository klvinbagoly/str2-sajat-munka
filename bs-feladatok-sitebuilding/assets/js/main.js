$('[data-toggle="tooltip"]').tooltip()

const navbar = document.querySelector('.navbar')

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > window.innerHeight
    || document.documentElement.scrollTop > window.innerHeight
    ) {
    navbar.style.backgroundColor = 'white'
  } else navbar.style.backgroundColor = 'transparent'
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
