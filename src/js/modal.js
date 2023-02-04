const openModal = document.querySelector('.movie-markup');

const modal = document.querySelector('[data-modal]');
const modalMarkup = document.querySelector('.modal-film');

let closeModalBtn = '';

openModal.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
  e.preventDefault();
  const movieId = e.target.closest('li').getAttribute('data-id');

  if (e.target !== e.currentTarget) {
    addMarkup(movieId);

    closeModalBtn = document.querySelector('.close-modal');
    modal.classList.remove('is-hidden');
    document.body.classList.add('overflow');
    document.addEventListener('keydown', onEscClose);

    closeModalBtn.addEventListener('click', onCloseModalClick);
    modal.addEventListener('click', onBackdropClick);
  }
}

function addMarkup(id) {
  const savedSettings = localStorage.getItem('currentPage');
  const savedGenres = localStorage.getItem('localGenres');
  try {
    const parsedSettings = JSON.parse(savedSettings);
    const parsedGenres = JSON.parse(savedGenres);

    const movieItem = parsedSettings.result.results.filter(
      a => a.id === Number(id)
    )[0];

    const genreId = [];

    parsedGenres.map(a => {
      if (movieItem.genre_ids.includes(a.id)) {
        genreId.push(a.name);
      }
    });

    const imageSrc = !movieItem.poster_path
      ? 'https://www.theoxygenstore.com/images/source/No-image.jpg'
      : `https://image.tmdb.org/t/p/w500${movieItem.poster_path}`;

    modalMarkup.innerHTML = `<div class="modal-film__content">
      <button class="close-modal" type="button">
        <svg class="close__icon" width="14" height="14">
          <use href="./images/home/close.svg#close-icon"></use>
        </svg>
      </button>
      <img
        class="modal-film__poster"
       
        src="${imageSrc}"
        alt=${movieItem.title}
        width="240"
        height="357"
      />
      <h2 class="title-film">${movieItem.title}</h2>
      <ul class="modal-film__list">
        <li class="modal-film__item">
          <span class="item__label">Vote / Votes</span>
          <span class="item__content"
            ><span class="item__content--rating">${
              movieItem.vote_average
            }</span> /<span
              class="item__content--votes"
              >${movieItem.vote_count}</span
            >
          </span>
        </li>
        <li class="modal-film__item">
          <span class="item__label">Popularity</span>
          <span class="item__content">${movieItem.popularity}</span>
        </li>
        <li class="modal-film__item">
          <span class="item__label">Original Title</span>
          <span class="item__content">${movieItem.original_title}</span>
        </li>
        <li class="modal-film__item">
          <span class="item__label">Genre</span>
          <span class="item__content">${genreId.join(', ')}</span>
        </li>
      </ul>
      <div class="modal-film__about">
        <h3 class="about__title">ABOUT</h3>
        <p class="about__text">
          ${movieItem.overview}
        </p>
      </div>
      <div class="modal-film__buttons">
        <button class="modal_film__btn" type="button">add to Watched</button>
        <button class="modal_film__btn" type="button">add to queue</button>
      </div>
    </div>`;
  } catch (err) {
    console.log(err);
  }
}

function onCloseModalClick(e) {
  closeModal();
}

function onEscClose(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.classList.remove('overflow');
  modal.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscClose);
  closeModalBtn.removeEventListener('click', onCloseModalClick);
}
