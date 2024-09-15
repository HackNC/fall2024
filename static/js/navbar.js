let nav = document.querySelector('#navbar')

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) /* nav.clientHeight */
        nav.classList.add('sticky')
    else
        nav.classList.remove('sticky')
})