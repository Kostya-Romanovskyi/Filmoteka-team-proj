const API_KEY = '63240915768e2fa639cf91287e69284e';
const TRENDING_TIME = 'week';

Trending();

const formEl = document.querySelector('.search-form');
const message = document.querySelector('.message');
const markupContainer = document.querySelector('.movie-markup');

formEl.addEventListener('submit', Search);

function Search(evt) {
  evt.preventDefault();
  let page = 1;
  const inputValue = formEl.elements.searchQuery.value;
  console.log(formEl.elements);
  if (!inputValue) {
    message.textContent =
      'Search result not successful. Enter the correct movie name and';
    return;
  }

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${inputValue}&page=${page}`
    );
    const movies = await response.json();
    return movies;
  };

  fetchMovies()
    .then(movies => {
      Render(movies.results);
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
    });
}

function Trending() {
  const fetchTrending = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${TRENDING_TIME}?api_key=${API_KEY}`
    );
    const movies = await response.json();
    return movies;
  };

  fetchTrending()
    .then(movies => {
      Render(movies.results);
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
    });
}

function Render(movies) {
  markupContainer.innerHTML = movies
    .map(movie => {
      return `
    <li>
      <img src="https://image.tmdb.org/t/p/w500${!movie.poster_path ? '\images\no-image.jpg' : movie.poster_path}" alt="${
        movie.title
      }">
      <div>
        <p class="card__title">${!movie.title ? movie.name : movie.title}</p>
        <p class="card__genres">${movie.genre_ids}</p>
        <p class="card__year">${parseInt(movie.release_date)}</p>
      </div>
    </li>`;
    })
    .join('');
}
