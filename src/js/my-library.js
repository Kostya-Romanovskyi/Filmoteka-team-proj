import { render } from './get-functions';

const btnWatched = document.querySelector('.js-watched');
const btnQueue = document.querySelector('.js-queue');
const markupContainer = document.querySelector('.movie-markup');

btnQueue.addEventListener('click', renderLocalQueueMovies);
btnWatched.addEventListener('click', renderLocalWatchedMovies);

function renderLocalQueueMovies() {
  try {
    const inWatched = JSON.parse(localStorage.getItem('watched'));
    render(inWatched);
  } catch (error) {
    console.log(error.name);
    markupContainer.innerHTML =
      '<p class="movie-markup__message">Watched is empty </p>';
  }
}

function renderLocalWatchedMovies() {
  try {
    const inWatched = JSON.parse(localStorage.getItem('watched'));
    render(inWatched);
  } catch (error) {
    markupContainer.innerHTML =
      '<p class="movie-markup__message">Queue is empty</p>';
  }
}
