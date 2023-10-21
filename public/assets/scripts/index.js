const navToggle = document.querySelector('.nav-toggle');
const navToggleIcon = navToggle.querySelector('span');
const navList = document.querySelector('.nav-list');

navToggle.addEventListener('click', () => {
  let isOpened = navList.getAttribute('aria-expanded') === 'true';

  isOpened ? openNav() : closeNav();
});

const closeNav = () => {
  navList.setAttribute('aria-expanded', 'true');
  navToggleIcon.textContent = 'close';
};

const openNav = () => {
  navList.setAttribute('aria-expanded', 'false');
  navToggleIcon.textContent = 'menu';
};

const faqs = document.querySelectorAll('.faq__questions-single');

faqs.forEach((single) => {
  single.addEventListener('click', () => {
    single
      .querySelector('.faq__questions-single-answer')
      .toggleAttribute('opened');
  });
});
