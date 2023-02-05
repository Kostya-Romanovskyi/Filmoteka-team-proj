function getTrendings(trendingTime, apiKey) {
  const loaderContainer = document.querySelector('.loader-container');
  const time = trendingTime;
  const key = apiKey;

  loaderContainer.hidden = false; // запускає спінер

  fetchTrending(time, key)
    .then(movies => {
      localStorage.setItem(
        'currentPage',
        JSON.stringify({
          type: 'trending',
          result: movies,
        })
      );

      render(movies.results); // рендер карток
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderContainer.hidden = true; // виключає спінер
    });

  async function fetchTrending(
    trendingTime = 'week',
    apiKey = '63240915768e2fa639cf91287e69284e'
  ) {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${trendingTime}?api_key=${apiKey}`
    );
    const movies = await response.json();
    return movies;
  }
}

function getMoviesByName(
  searchName,
  page = 1,
  apiKey = '63240915768e2fa639cf91287e69284e'
) {
  const loaderContainer = document.querySelector('.loader-container');
  const message = document.querySelector('.message');
  const markupContainer = document.querySelector('.movie-markup');

  loaderContainer.hidden = false; //
  fetchMovies(searchName, page, apiKey)
    .then(movies => {
      if (!movies.total_results) {
        markupContainer.innerHTML =
          '<p class="movie-markup__message">Nothing found </p>';
        message.textContent =
          'Search result not successful. Enter the correct movie name and';
        throw new Error(
          'Search result not successful. Enter the correct movie name and'
        );
      }

      localStorage.setItem(
        'currentPage',
        JSON.stringify({
          type: 'serched',
          result: movies,
        })
      );
      render(movies.results);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderContainer.hidden = true;
    });

  async function fetchMovies(searchName, page, apiKey) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchName}&page=${page}`
    );
    const movies = await response.json();
    return movies;
  }
}

function render(movies) {
  const markupContainer = document.querySelector('.movie-markup');
  const genres = JSON.parse(localStorage.getItem('localGenres'));

  markupContainer.innerHTML = movies
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
        <a class="card__link" href="">
        <li class="card__item" data-id=${movie.id}>
        <img class="card__img" src="${imageSrc}" alt="${movie.title}">
        <div>
        <p class="card__title">${movie.title}</p>
        <div class="card__container">
        <p class="card__genres"
        ${movie.genre_ids.length ? '' : 'hidden'}>${cardGenres}</p>
        <p class="card__year" ${movie.release_date.length ? '' : 'hidden'}> ${
        parseInt(movie.release_date) ?? ''
      }</p>
        </div>
        </div>
        </li>
        </a>`;
    })
    .join('');
}

export { getTrendings, getMoviesByName, render };
