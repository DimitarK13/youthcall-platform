'use strict';

const hideElementsBasedOnLogin = () => {
  const loggedIn = sessionStorage.getItem('loggedIn');
  const hideElementsLogged = document.querySelectorAll('[data-hide="logged"]');
  const hideElementsNotLogged = document.querySelectorAll(
    '[data-hide="notLogged"]'
  );

  if (loggedIn) hideElementsLogged.forEach((el) => el.classList.add('hidden'));
  else hideElementsNotLogged.forEach((el) => el.classList.add('hidden'));
};

const toggleNavigation = () => {
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
};

const toggleFAQAnswers = () => {
  const faqs = document.querySelectorAll('.faq__questions-single');

  faqs.forEach((single) => {
    single.addEventListener('click', () => {
      single
        .querySelector('.faq__questions-single-answer')
        .toggleAttribute('opened');
    });
  });
};

const displayPostsStatistics = async () => {
  const activeCardCourse = document.querySelector('.active-card--course');
  const activeCardProject = document.querySelector('.active-card--project');
  const activeCardActivity = document.querySelector('.active-card--activity');
  const activeCardVolunteer = document.querySelector('.active-card--volunteer');

  if (
    !activeCardActivity ||
    !activeCardCourse ||
    !activeCardProject ||
    !activeCardVolunteer
  )
    return;

  try {
    const data = await fetch('/api/data');
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

const printPosts = async (type) => {
  try {
    const postsContainer = document.querySelector('.posts');
    const postsHeader = document.querySelector('.post-type');
    const data = await fetch(`/api/data?type=${type}`);
    const posts = await data.json();

    if (posts.data.header) {
      if (posts.data.header === 'course') postsHeader.textContent = 'Обуки';
      if (posts.data.header === 'activity')
        postsHeader.textContent = 'Активности';
      if (posts.data.header === 'project') postsHeader.textContent = 'Проекти';
      if (posts.data.header === 'volunteer')
        postsHeader.textContent = 'Волонтерства';
    }

    if (posts.data.message) {
      postsContainer.innerHTML = `<h3 class="header-m text--center margin-inline--auto">${posts.data.message}</h3>`;
      return;
    }

    posts.data.filteredPosts.forEach((post) => {
      const imageBlob = new Blob([new Uint8Array(post.image.data.data)], {
        type: post.image.contentType,
      });

      const imageUrl = URL.createObjectURL(imageBlob);

      const html = `
              <div class="posts__post post-single" id="${post._id}">
                <a href="${post.website}" target="_blank" class="post-single__account-link body-s">
                  ${post.accountName}
                </a>
                <img
                  class="post-single__image"
                  src="${imageUrl}"
                  alt="${post.name}"
                />
                <h3 class="header-m post-single__heading">${post.name}</h3>
                <p class="post-single__description">
                  ${post.description}
                </p>

                <div class="post-single__info">
                  <p class="post-single__where">
                    <span>Каде:</span> ${post.where}
                  </p>
                  <p class="post-single__when"><span>Кога:</span> ${post.when}</p>
                  <p class="post-single__who"><span>Кој:</span> ${post.who}</p>
                  <p class="post-single__deadline">
                    <span>Краен рок:</span> ${post.deadline}
                  </p>
                </div>

                <a href="${post.link}" target="_blank" class="post-single__link btn btn--primary"
                  >Пријави се</a
                >
              </div>
            `;

      postsContainer.insertAdjacentHTML('afterbegin', html);
    });
  } catch (err) {
    console.error(err);
  } finally {
    document.querySelector('.loader').style.display = 'none';
  }
};

const getPostsByUsername = async () => {
  const myPostsContainer = document.querySelector('.my-posts');
  if (!myPostsContainer) return;

  try {
    const username = sessionStorage.getItem('username');
    const data = await fetch(`/api/data?username=${username}`);
    const posts = await data.json();

    posts.data.filteredPosts.forEach((post) => {
      const imageBlob = new Blob([new Uint8Array(post.image.data.data)], {
        type: post.image.contentType,
      });

      const imageUrl = URL.createObjectURL(imageBlob);

      const html = `
                <div class="my-posts__post">
                  <img
                    class="my-posts__post-image"
                    src="${imageUrl}"
                    alt="${post.name}"
                  />
                  <div class="my-posts__post-content">
                    <h2 class="my-posts__post-heading header-m">${post.name}</h2>
                    <button class="my-posts__post-btn" data-post-id="${post._id}">
                      <span class="material-symbols-outlined"> delete </span>
                    </button>
                  </div>
                </div>
              `;

      myPostsContainer.insertAdjacentHTML('afterbegin', html);
    });
  } catch (err) {
    console.error(err);
  } finally {
    document.querySelector('.loader').style.display = 'none';
  }
};

const deletePost = async (postId) => {
  try {
    const myPostsContainer = document.querySelector('.my-posts');
    if (!myPostsContainer) return;

    const response = await fetch(`/api/data/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    myPostsContainer.insertAdjacentHTML(
      'beforebegin',
      `<p class='text--center'>${data.data}</p>`
    );

    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (err) {
    console.error(err);
  }
};

const getMyPosts = () => {
  const myPostsContainer = document.querySelector('.my-posts');
  if (!myPostsContainer) return;

  myPostsContainer.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.my-posts__post-btn');
    if (!deleteBtn) return;

    const postId = deleteBtn.dataset.postId;
    deletePost(postId);
  });
};

const login = () => {
  const form = document.querySelector('.login__form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    const errorMessage = document.querySelector('.error-message');

    const formData =
      'username=' +
      encodeURIComponent(username) +
      '&password=' +
      encodeURIComponent(password);

    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.success) return (errorMessage.textContent = data.data);

        errorMessage.textContent = '';

        sessionStorage.setItem('loggedIn', data.data.loggedIn);
        sessionStorage.setItem('username', data.data.username);
        sessionStorage.setItem('accountName', data.data.accountName);
        sessionStorage.setItem('website', data.data.website);

        window.location.replace('/');
      })
      .catch((error) => {
        console.log('Error' + error);
        errorMessage.textContent = error;
      });
  });
};

const getType = () => {
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const typeValue = url.searchParams.get('type');
  if (!typeValue) return;

  if (typeValue) {
    printPosts(typeValue);
  }
};

const uploadPost = () => {
  const form = document.querySelector('.new-post');
  const type = document.querySelector('#type');
  const name = document.querySelector('#name');
  const where = document.querySelector('#where');
  const when = document.querySelector('#when');
  const who = document.querySelector('#who');
  const deadline = document.querySelector('#deadline');
  const link = document.querySelector('#link');
  const image = document.querySelector('#image');
  const description = document.querySelector('#description');
  const username = sessionStorage.getItem('username');
  const website = sessionStorage.getItem('website');
  const accountName = sessionStorage.getItem('accountName');
  const errorMessage = document.querySelector('.error-message');

  if (!form) return;

  form.addEventListener('change', function () {
    validateFields();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const successMessage = document.querySelector('.success-message');

    if (validateFields()) {
      errorMessage.textContent = '';

      const formData = new FormData();
      formData.append('type', type.value);
      formData.append('name', name.value);
      formData.append('where', where.value);
      formData.append('when', when.value);
      formData.append('who', who.value);
      formData.append('deadline', deadline.value);
      formData.append('link', link.value);
      formData.append('image', image.files[0]); // Assuming 'image' is an input element of type file
      formData.append('description', description.value);
      formData.append('username', username);
      formData.append('website', website);
      formData.append('accountName', accountName);

      fetch('/api/data', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          errorMessage.style.display = 'none';
          successMessage.textContent = data.data;

          setTimeout(() => {
            location.replace('/my-posts.html');
          }, 2000);
        })
        .catch((error) => {
          console.log('Error' + error);
          errorMessage.textContent = error;
        });
    } else {
      errorMessage.textContent =
        'Please fill in all required fields correctly.';
    }
  });

  const validateFields = () => {
    const fields = [type, name, where, who, deadline, link, description];

    let isValid = true;

    fields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add('input-field__input--invalid');
        isValid = false;
      } else {
        field.classList.remove('input-field__input--invalid');
      }
    });

    const today = new Date().toISOString().split('T')[0];
    const tomorrowISO = new Date(Date.now() + 86400000)
      .toISOString()
      .split('T')[0];

    if (when.value < tomorrowISO || when.value === today) {
      when.classList.add('input-field__input--invalid');
      errorMessage.textContent = 'When date cannot be before today';
      isValid = false;
    } else {
      when.classList.remove('input-field__input--invalid');
    }

    if (deadline.value < tomorrowISO || deadline.value === today) {
      deadline.classList.add('input-field__input--invalid');
      errorMessage.textContent = 'Deadline cannot be before today';
      isValid = false;
    } else {
      deadline.classList.remove('input-field__input--invalid');
    }

    if (link && !isURL(link.value.trim())) {
      link.classList.add('input-field__input--invalid');
      isValid = false;
    } else {
      link.classList.remove('input-field__input--invalid');
    }

    if (!image.files || !image.files[0]) {
      image.classList.add('input-field__input--invalid');
      isValid = false;
    } else {
      const maxSize = 5 * 1024 * 1024;
      if (image.files[0].size > maxSize) {
        image.classList.add('input-field__input--invalid');
        errorMessage.textContent = 'Image cannot be bigger than 5mb';
        isValid = false;
      } else {
        image.classList.remove('input-field__input--invalid');
      }
    }

    if (
      description.value.trim().length === 0 ||
      description.value.length > 500
    ) {
      description.classList.add('input-field__input--invalid');
      errorMessage.textContent = `Description shouldn't be empty or over 500 characters`;
      isValid = false;
    } else {
      description.classList.remove('input-field__input--invalid');
    }

    return isValid;
  };

  const isURL = (str) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?([\w-]+\.)+([a-z]{2,})+(\/[\w-]+)*(\?.*)?$/;
    return pattern.test(str);
  };
};

uploadPost();
hideElementsBasedOnLogin();
toggleNavigation();
toggleFAQAnswers();
displayPostsStatistics();
login();
getMyPosts();
getType();
getPostsByUsername();
