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
      Render(localStorage.getItem('currentPageMuvie'));
    })
    .catch(error => console.log(error));
}

function Trending() {
  //   console.log('Trending');

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

  Render(localStorage.getItem('currentPageMuvie'));
}

Trending();

function Render(movies) {
  let arrayMovies = JSON.parse(movies);
  //   console.log('Render', arrayMovies);
  let resultHtml = [];
  searchBtn.insertAdjacentHTML('afterend', '');
  arrayMovies.forEach(movie => {
    resultHtml.push('<li>Title ' + movie.title + '</li>');
    resultHtml.push(
      '<img src="' +
        'https://image.tmdb.org/t/p/w500' +
        movie.poster_path +
        '" alt="' +
        movie.title +
        '"></li>'
    );
    resultHtml.push('<li>genre_ids ' + movie.genre_ids + '</li>');
    resultHtml.push('<li>vote_average ' + movie.vote_average + '</li>');
  });

  movieMarkup.insertAdjacentHTML('afterend', resultHtml.join(''));
}

window.onload = function () {
  Render(localStorage.getItem('currentPageMuvie'));
};

//https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

// конкретний фільм
// https://api.themoviedb.org/3/movie/550?api_key=50540b41e66ef631d8d57e13679f9024
