const API_KEY = '50540b41e66ef631d8d57e13679f9024';
const TRENDING_TIME = 'week';

const searchBtn = document.querySelector('.search-form__button');
searchBtn.addEventListener('click', Searh);

const inputMuvie = document.querySelector('.search-form__input');
const movieMarkup = document.querySelector('.movie-markup');

function Searh(e) {
  e.preventDefault();

  // console.log(inputMuvie.value);
  if (!inputMuvie.value) {
    // console.log('no input');
    return;
  }
  movieMarkup.innerHTML = '';

  //   console.log('Search');

  const fetchMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=' +
        API_KEY +
        '&language=en-US&query=' +
        inputMuvie.value +
        '&page=1&include_adult=false'
    );
    const movies = await response.json();
    return movies;
  };

  fetchMovies()
    .then(movies => {
      //   console.log('serch f', movies.results);
      localStorage.setItem('currentPageMuvie', JSON.stringify(movies.results));
    })
    .catch(error => console.log(error));

  fetchMovies()
    .then(movies => {
      //   console.log('serch f', movies.results);
      Render(movies.results);
    })
    .catch(error => console.log(error));
}

function Trending() {
  const fetchMovies = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/trending/all/' +
        TRENDING_TIME +
        '?api_key=' +
        API_KEY
    );
    const movies = await response.json();
    return movies;
  };

  fetchMovies()
    .then(movies => {
      // console.log('f',movies.results);
      localStorage.setItem('currentPageMuvie', JSON.stringify(movies.results));
    })
    .catch(error => console.log(error));

  fetchMovies()
    .then(movies => {
      console.log('fee', movies.results);
      Render(movies.results);
    })
    .catch(error => console.log(error));
}

Trending();

function Render(movies) {
  const markupMovie = movies
    .map(
      movie =>
        `<a class="movie__link" href=""><li class="movie__item">
      <img class="movie__poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <p class="movie_title">${movie.title}</p>
      <p class="movie_genre">${movie.genre_ids}</p>
      <p class="movie_average">${movie.vote_average}</p>
        </li></a>`
    )
    .join('');

  movieMarkup.insertAdjacentHTML('beforeend', markupMovie);
}
