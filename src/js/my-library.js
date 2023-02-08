import { render } from './get-functions';

const btnWatched = document.querySelector('.js-watched');
const btnQueue = document.querySelector('.js-queue');
const markupContainer = document.querySelector('.movie-markup');

btnQueue.addEventListener('click', renderLocalQueueMovies);
btnWatched.addEventListener('click', renderLocalWatchedMovies);

try {
  const inWatched = JSON.parse(localStorage.getItem('watched'));
  btnWatched.classList.add('btn-active-lbr');
  render(inWatched);
  if (inWatched.length === 0) {
    markupContainer.innerHTML =
      '<p class="movie-markup__message">Watched is empty </p>';
  }
} catch (error) {
  markupContainer.innerHTML =
    '<p class="movie-markup__message">Watched is empty </p>';
}

function renderLocalWatchedMovies() {
  try {
    const inWatched = JSON.parse(localStorage.getItem('watched'));
    btnWatched.classList.add('btn-active-lbr');
    btnQueue.classList.remove('btn-active-lbr');
    render(inWatched);
    if (inWatched.length === 0) {
      markupContainer.innerHTML =
        '<p class="movie-markup__message">Watched is empty </p>';
    }
  } catch (error) {
    btnWatched.classList.add('btn-active-lbr');
    btnQueue.classList.remove('btn-active-lbr');
    markupContainer.innerHTML =
      '<p class="movie-markup__message">Watched is empty </p>';
  }
}

function renderLocalQueueMovies() {
  try {
    const inQueue = JSON.parse(localStorage.getItem('queue'));
    btnQueue.classList.add('btn-active-lbr');
    btnWatched.classList.remove('btn-active-lbr');
    render(inQueue);
    if (inQueue.length === 0) {
      markupContainer.innerHTML =
        '<p class="movie-markup__message">Queue is empty</p>';
    }
  } catch (error) {
    btnQueue.classList.add('btn-active-lbr');
    btnWatched.classList.remove('btn-active-lbr');
    markupContainer.innerHTML =
      '<p class="movie-markup__message">Queue is empty</p>';
  }
}
