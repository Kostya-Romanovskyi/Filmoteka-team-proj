const openModal = document.querySelector('.movie-markup');

const modal = document.querySelector('[data-modal]');
const modalMarkup = document.querySelector('.modal-film');

let closeModalBtn = '';
let movieItem = null;

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

    addBtnListeners();
  }
}

function addMarkup(id) {
  const savedSettings = localStorage.getItem('currentPage');
  const savedGenres = localStorage.getItem('localGenres');
  const watched = localStorage.getItem('watched');
  const queue = localStorage.getItem('queue');

  try {
    const parsedSettings = JSON.parse(savedSettings);
    const parsedGenres = JSON.parse(savedGenres);

    const parsedWatched = JSON.parse(watched);
    const parsedQueue = JSON.parse(queue);

    const parsedItems = [];

    if (parsedWatched && parsedQueue) {
      parsedItems.push(
        ...parsedWatched,
        ...parsedQueue,
        ...parsedSettings.result.results
      );
    } else if (parsedQueue) {
      parsedItems.push(
        ...parsedQueue,

        ...parsedSettings.result.results
      );
    } else if (parsedWatched) {
      parsedItems.push(
        ...parsedWatched,

        ...parsedSettings.result.results
      );
    } else {
      parsedItems.push(...parsedSettings.result.results);
    }

    movieItem = parsedItems.filter(a => a.id === Number(id))[0];

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
        <img class="close-icon" src="https://st2.depositphotos.com/47577860/45955/v/450/depositphotos_459558608-stock-illustration-close-delete-solid-icon-solid.jpg" width="30" height="30">
      </button>
      <img
        class="modal-film__poster"
       
        src="${imageSrc}"
        alt=${movieItem.title}
        width="240"
        height="357"
      />
      <div class="modal-wrapper">
      <h2 class="title-film">${movieItem.title}</h2>
      <ul class="modal-film__list">
        <li class="modal-film__item">
          <span class="item__label">Vote / Votes</span>
          <span class="item__content"
            ><span class="item__content--rating">${movieItem.vote_average.toFixed(
              1
            )}</span> /<span
              class="item__content--votes"
              >${movieItem.vote_count}</span
            >
          </span>
        </li>
        <li class="modal-film__item">
          <span class="item__label">Popularity</span>
          <span class="item__content">${movieItem.popularity.toFixed(1)}</span>
        </li>
        <li class="modal-film__item">
          <span class="item__label">Original Title</span>
          <span class="item__content item__content-title">${
            movieItem.original_title
          }</span>
        </li>
        <li class="modal-film__item">
          <span class="item__label">Genre</span>
          <span class="item__content-genres">${genreId.join(', ')}</span>
        </li>
      </ul>
      <div class="modal-film__about">
        <h3 class="about__title">ABOUT</h3>
        <p class="about__text">
          ${movieItem.overview}
        </p>
      </div>
      <div class="modal-film__buttons">
        <button class="modal_film__btn" id="add_to_watched_btn" type="button" ${getIsDisabled(
          'watched',
          id
        )}>add to Watched</button>
        <button class="modal_film__btn" id="add_to_queue_btn" type="button" ${getIsDisabled(
          'queue',
          id
        )}>add to queue</button>
      </div>
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

function addBtnListeners() {
  const addToWatchedBtn = document.querySelector('#add_to_watched_btn');
  const addToQueueBtn = document.querySelector('#add_to_queue_btn');

  addToWatchedBtn.addEventListener('click', () => {
    addToWatchedBtn.disabled = true;
    addFilmToList('watched', movieItem);
  });
  addToQueueBtn.addEventListener('click', () => {
    addToQueueBtn.disabled = true;
    addFilmToList('queue', movieItem);
  });
}

/*
    @param 'watched' | 'queue' listType
    @param { Film } film
*/
function addFilmToList(listType, film) {
  const storageKey = listType;

  const filmList = JSON.parse(localStorage.getItem(storageKey)) || [];

  filmList.push(film);

  localStorage.setItem(storageKey, JSON.stringify(filmList));
}

function getIsDisabled(listType, filmId) {
  const filmList = JSON.parse(localStorage.getItem(listType));

  if (!filmList) {
    return '';
  }

  const isInList = filmList.find(film => Number(filmId) === film.id);

  if (isInList) {
    return 'disabled';
  }

  return '';
}
