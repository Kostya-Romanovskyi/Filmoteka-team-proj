import { render } from './get-functions';

const btnWatched = document.querySelector('.js-watched');
const btnQueue = document.querySelector('.js-queue');

renderLocalWatchedMovies();

btnQueue.addEventListener('click', renderLocalQueueMovies);
btnWatched.addEventListener('click', renderLocalWatchedMovies);

function renderLocalWatchedMovies() {
  const markupContainer = document.querySelector('.movie-markup');
  const genres = JSON.parse(localStorage.getItem('watched'));

  markupContainer.innerHTML = genres
    .map(movie => {
      // заглушка для відсутньої картинки
      const imageSrc = !movie.poster_path
        ? 'https://image.tmdb.org/t/p/w500'
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      const cardGenres = genres
        .filter(genre => {
          if (movie.genre_ids.includes(genre.id)) {
            return genre.name;
          }
        })
        .map(genre => genre.name)
        .join(', ');

      return `
        <li class="card__item" data-id=${movie.id}>
          <a class="card__link" href="">
            <img class="card__img" src="${imageSrc}" alt="${movie.title}">
            <div>
              <p class="card__title">${movie.title}</p>
              <div class="card__container">
                <p class="card__genres"
                ${movie.genre_ids.length ? '' : 'hidden'}>${cardGenres} | </p>
                <p class="card__year" ${
                  movie.release_date.length ? '' : 'hidden'
                }> ${parseInt(movie.release_date) ?? ''}</p>
              </div>
            </div>
          </a>
        </li> `;
    })
    .join('');
}

function renderLocalQueueMovies() {
  const markupContainer = document.querySelector('.movie-markup');
  const genres = JSON.parse(localStorage.getItem('queue'));

  markupContainer.innerHTML = genres
    .map(movie => {
      // заглушка для відсутньої картинки
      const imageSrc = !movie.poster_path
        ? 'https://image.tmdb.org/t/p/w500'
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      const cardGenres = genres
        .filter(genre => {
          if (movie.genre_ids.includes(genre.id)) {
            return genre.name;
          }
        })
        .map(genre => genre.name)
        .join(', ');

      return `
        <li class="card__item" data-id=${movie.id}>
          <a class="card__link" href="">
            <img class="card__img" src="${imageSrc}" alt="${movie.title}">
            <div>
              <p class="card__title">${movie.title}</p>
              <div class="card__container">
                <p class="card__genres"
                ${movie.genre_ids.length ? '' : 'hidden'}>${cardGenres} | </p>
                <p class="card__year" ${
                  movie.release_date.length ? '' : 'hidden'
                }> ${parseInt(movie.release_date) ?? ''}</p>
              </div>
            </div>
          </a>
        </li> `;
    })
    .join('');
}
