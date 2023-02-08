import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { render } from './get-functions';

const openModal = document.querySelector('.movie-markup');

const modal = document.querySelector('[data-modal]');
const modalMarkup = document.querySelector('.modal-film');

let closeModalBtn = '';
let videoTrailerCont = '';
let openTrailerCont = '';
let instance = '';

let movieItem = null;
const API_KEY = '63240915768e2fa639cf91287e69284e';

openModal.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
  e.preventDefault();
  const movieId = e.target.closest('li').getAttribute('data-id');

  if (e.target !== e.currentTarget) {
    addMarkup(movieId);
    const btnUp = document.querySelector('.btn-up');
    btnUp.classList.add('btn-up_hide');

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

    fetchTrailer(movieItem.id)
      .then(response => {
        videoTrailerCont = document.querySelector(
          '.modal_youtube_btn_container'
        );

        const movieTrailer =
          response.results.filter(
            a =>
              a.name === 'Legacy Trailer' ||
              'Official Trailer' ||
              'Official Teaser'
          ) || response.results[0];

        videoTrailerCont.innerHTML = `<button type="button" class="open-trailer modal_film__btn">Watch trailer</button>`;
        openTrailerCont = document.querySelector('.open-trailer');
        openTrailerCont.addEventListener('click', () => {
          instance = basicLightbox.create(`
    <iframe src="https://www.youtube.com/embed/${movieTrailer[0].key}?autoplay=1" allow="autoplay" allowfullscreen="" width="560" height="315" frameborder="0"></iframe>
`);
          instance.show();
        });
      })
      .catch(err => console.log(err));

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
          'queue',
          id
        )}>${getButtonText('watched', id)}</button>
        <button class="modal_film__btn" id="add_to_queue_btn" type="button" ${getIsDisabled(
          'watched',
          id
        )}>${getButtonText('queue', id)}</button>
      </div>
      <div class="modal_youtube_btn_container modal-film__buttons"></div>
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
  if (instance) {
    instance.close();
  }

  videoTrailerCont.innerHTML = '';
}

function addBtnListeners() {
  const addToWatchedBtn = document.querySelector('#add_to_watched_btn');
  const addToQueueBtn = document.querySelector('#add_to_queue_btn');

  addToWatchedBtn.addEventListener('click', () => {
    toggleFilmToList('watched', movieItem);
    addToQueueBtn.disabled = !!getIsDisabled('watched', movieItem.id);
    addToWatchedBtn.textContent = getButtonText('watched', movieItem.id);
  });
  addToQueueBtn.addEventListener('click', () => {
    toggleFilmToList('queue', movieItem);
    addToWatchedBtn.disabled = !!getIsDisabled('queue', movieItem.id);
    addToQueueBtn.textContent = getButtonText('queue', movieItem.id);
  });
}

/*
    @param 'watched' | 'queue' listType
    @param { Film } film
*/
function toggleFilmToList(listType, film) {
  const storageKey = listType;

  const filmList = JSON.parse(localStorage.getItem(storageKey)) || [];
  const filmIndex = filmList.findIndex(filmItem => filmItem.id === film.id);

  if (filmIndex >= 0) {
    filmList.splice(filmIndex, 1);
    updateMarkup('deleted', filmList, listType, film);
  } else {
    filmList.push(film);
    updateMarkup('added', filmList, listType, film);
  }

  localStorage.setItem(storageKey, JSON.stringify(filmList));
}

function updateMarkup(action, filmList, listType, film) {
  if (!window.location.pathname.includes('/library.html')) {
    return;
  }

  if (action === 'deleted') {
    const watchedActive = document
      .querySelector('.js-watched')
      .classList.contains('btn-active-lbr');
    const queueActive = document
      .querySelector('.js-queue')
      .classList.contains('btn-active-lbr');
    const msgContainer = document.querySelector('.msg-container');

    document.querySelector(`[data-id="${film.id}"]`)?.remove();

    if (!document.querySelector('.card__item')) {
      if (watchedActive && listType === 'watched') {
        msgContainer.innerHTML =
          '<p class="msg-container__message">Watched is empty</p>';
      }
      if (queueActive && listType === 'queue') {
        msgContainer.innerHTML =
          '<p class="msg-container__message">Queue is empty</p>';
      }
    }
  }

  if (action === 'added') {
    const watchedActive = document
      .querySelector('.js-watched')
      .classList.contains('btn-active-lbr');
    const queueActive = document
      .querySelector('.js-queue')
      .classList.contains('btn-active-lbr');

    if (watchedActive && listType === 'watched') {
      render(filmList);
    }

    if (queueActive && listType === 'queue') {
      render(filmList);
    }
  }
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

function getButtonText(listType, filmId) {
  const filmList = JSON.parse(localStorage.getItem(listType));

  if (!filmList) {
    return `Add to ${listType}`;
  }

  const isInList = filmList.find(film => Number(filmId) === film.id);

  if (isInList) {
    return `Delete from ${listType}`;
  }

  return `Add to ${listType}`;
}

async function fetchTrailer(idMovie) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${API_KEY}`
  );

  return response.data;
}
