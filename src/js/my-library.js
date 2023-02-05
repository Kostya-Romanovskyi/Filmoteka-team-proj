const btnWatched = document.querySelector('.js-watched');
const btnQueue = document.querySelector('.js-queue');

renderLocalWatchedMovies();

btnQueue.addEventListener('click', renderLocalQueueMovies);
btnWatched.addEventListener('click', renderLocalWatchedMovies);

function renderLocalWatchedMovies() {
  const markupContainer = document.querySelector('.movie-markup');
  const genres = JSON.parse(localStorage.getItem('watched'));
  console.log(genres);

  //   if (!genres) {
  //     const noMovies = document.querySelector('.js-container-lib');
  //     noMovies.innerHTML = `
  //       <div class="">
  //         <h1 class="">You haven't watched the movies yet</h1>
  //         <p class="">Go to the main page to select a movie</p>
  //         <a class="" href="./index.html">Home page</a>
  //       </div>`;
  //     return;
  //   }

  //   if (!genres) {
  //     const noMovies = document.querySelector('.js-container-lib');
  //     noMovies.innerHTML = '';
  //     return;
  //   }
  markupCard(markupContainer, genres);
}

function renderLocalQueueMovies() {
  const markupContainer = document.querySelector('.movie-markup');
  const genres = JSON.parse(localStorage.getItem('queue'));
  console.log(genres);

  //   if (!genres) {
  //     const noMovies = document.querySelector('.js-container-lib');
  //     noMovies.innerHTML = `
  //       <div class="">
  //         <h1 class="">You haven't watched the movies yet</h1>
  //         <p class="">Go to the main page to select a movie</p>
  //         <a class="" href="./index.html">Home page</a>
  //       </div>`;
  //     return;
  //   }

  //   if (!genres) {
  //     const noMovies = document.querySelector('.js-container-lib');
  //     noMovies.innerHTML = '';
  //     return;
  //   }

  markupCard(markupContainer, genres);
}

function markupCard(markupContainer, genres) {
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
