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

const activeCardCourse = document.querySelector('.active-card--course');
const activeCardProject = document.querySelector('.active-card--project');
const activeCardActivity = document.querySelector('.active-card--activity');
const activeCardVolunteer = document.querySelector('.active-card--volunteer');

const getPosts = async () => {
  try {
    const data = await fetch('http://localhost:7777/api/data');
    const posts = await data.json();

    const activityPosts = posts.data.filter((post) => post.type === 'activity');
    const coursePosts = posts.data.filter((post) => post.type === 'course');
    const projectPosts = posts.data.filter((post) => post.type === 'project');
    const volunteerPosts = posts.data.filter(
      (post) => post.type === 'volunteer'
    );

    activeCardCourse.textContent = coursePosts.length;
    activeCardProject.textContent = projectPosts.length;
    activeCardActivity.textContent = activityPosts.length;
    activeCardVolunteer.textContent = volunteerPosts.length;
  } catch (err) {
    console.error(err);
  }
};

getPosts();
