import { getTrendings, getMoviesByName } from './get-functions';

const API_KEY = '63240915768e2fa639cf91287e69284e';
const TRENDING_TIME = 'week';

const formEl = document.querySelector('.search-form');
formEl.addEventListener('submit', onFormSubmit);

// фетчим тренди та жанри
if (!localStorage['genres']) {
  getGenres();
}
getTrendings();

function onFormSubmit(evt) {
  evt.preventDefault();
  const inputValue = formEl.elements.searchQuery.value;
  getMoviesByName(inputValue);
}

function getGenres(apiKey = '63240915768e2fa639cf91287e69284e') {
  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const movies = await response.json();
    return movies;
  };

  fetchGenres()
    .then(data => {
      console.log(typeof JSON.stringify(data.genres));
      localStorage.setItem('localGenres', JSON.stringify(data.genres));
    })
    .catch(error => {
      console.log(error);
    });
}
