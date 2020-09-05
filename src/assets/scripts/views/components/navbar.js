import { checkElement, checkMultiElement } from '../../utils/element-helper.js';

const setToogleNavbar = () => {
    checkElement('#nav__toogle').then(element => {
        element.addEventListener('click', (() => {
            const isActive = element.classList.contains('active');
            const navLink = document.querySelector('.nav__link');

            if (isActive) {
                element.classList.remove('active')
                navLink.style.display = 'none';
            } else {
                element.classList.add('active');
                navLink.style.display = 'flex';
            }
        }));
    })
}

const setActiveNavbar = () => {
    checkMultiElement('.nav__link a').then(elements => {
        elements.forEach((element) => {
            element.addEventListener('click', ((e) => {
                document.querySelector('.nav__link > a.active').classList.remove('active');
                e.target.classList.add('active');
            }))
        })
    })
}

const setNavbar = () => {
    setToogleNavbar();
    setActiveNavbar();
}

export default setNavbar;