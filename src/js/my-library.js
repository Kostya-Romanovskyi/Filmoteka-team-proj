import { render } from './get-functions';

const btnWatched = document.querySelector('.js-watched');
const btnQueue = document.querySelector('.js-queue');
const markupContainer = document.querySelector('.movie-markup');

btnQueue.addEventListener('click', renderLocalQueueMovies);
btnWatched.addEventListener('click', renderLocalWatchedMovies);

const inWatched = JSON.parse(localStorage.getItem('watched'));

render(inWatched);

function renderLocalWatchedMovies() {
  try {
    // const inWatched = JSON.parse(localStorage.getItem('watched'));
    render(inWatched);
  } catch (error) {
    console.log(error.name);
    markupContainer.innerHTML =
      '<p class="movie-markup__message">Watched is empty </p>';
  }
}

function renderLocalQueueMovies() {
  try {
    const inQueue = JSON.parse(localStorage.getItem('queue'));
    render(inQueue);
  } catch (error) {
    markupContainer.innerHTML =
      '<p class="movie-markup__message">Queue is empty</p>';
  }
}
