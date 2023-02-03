const API_KEY = '63240915768e2fa639cf91287e69284e';
const TRENDING_TIME = 'week';
let genres = [];

const formEl = document.querySelector('.search-form');
const message = document.querySelector('.message');
const markupContainer = document.querySelector('.movie-markup');
const loaderContainer = document.querySelector('.loader-container');

formEl.addEventListener('submit', search);

// фетчим тренди та жанри
trending();
if (!localStorage['genres']) {
  getGenres();
}
genres = JSON.parse(localStorage.getItem('genres'));
console.log(genres);

function search(evt) {
  evt.preventDefault();
  let page = 1;
  const inputValue = formEl.elements.searchQuery.value;
  console.log(formEl.elements);
  if (!inputValue) {
    return;
  }

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputValue}&page=${page}`
    );
    const movies = await response.json();
    return movies;
  };

  loaderContainer.hidden = false;
  fetchMovies()
    .then(movies => {
      if (!movies.total_results) {
        message.textContent =
          'Search result not successful. Enter the correct movie name and';
        throw new Error(
          'Search result not successful. Enter the correct movie name and'
        );
      }
      render(movies.results);
      localStorage.setItem(
        'currentPage',
        JSON.stringify({
          type: 'serched',
          result: movies,
        })
      );
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderContainer.hidden = true;
    });
}

function trending() {
  const fetchTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${TRENDING_TIME}?api_key=${API_KEY}`
    );
    const movies = await response.json();
    return movies;
  };

  loaderContainer.hidden = false;

  fetchTrending()
    .then(movies => {
      render(movies.results);
      localStorage.setItem(
        'currentPage',
        JSON.stringify({
          type: 'trending',
          result: movies,
        })
      );
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderContainer.hidden = true;
    });
}

function render(movies) {
  markupContainer.innerHTML = movies
    .map(movie => {
      // заглушка для відсутньої картинки
      const imageSrc = !movie.poster_path
        ? 'https://www.theoxygenstore.com/images/source/No-image.jpg'
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

      // const cardGenres = genres
      //   .filter(genre => {
      //     if (movie.genre_ids.includes(genre.id)) {
      //       return genre.name;
      //     }
      //   })
      //   .join(' ');

      const cardGenres = genres.reduce((previousValue, genre) => {
        if (movie.genre_ids.includes(genre.id)) {
          console.log(previousValue);
          return previousValue + genre.name + ' ';
        }
        return previousValue;
      }, '');

      return `
        <a class="card__link" href="">
        <li class="card__item" data-id=${movie.id}>
        <img class="card__img" src="${imageSrc}" alt="${movie.title}">
        <div>
        <p class="card__title">${movie.title}</p>
        <div class="card__container">
        <p class="card__genres">${cardGenres} | </p>
        <p class="card__year"> ${parseInt(movie.release_date) ?? ''}</p>
        </div>
        </div>
        </li>
        </a>`;
    })
    .join('');
}

function getGenres() {
  const fetchGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const movies = await response.json();
    return movies;
  };

  fetchGenres()
    .then(data => {
      localStorage.setItem('genres', JSON.stringify(data.genres));
    })
    .catch(error => {
      console.log(error);
    });
}
