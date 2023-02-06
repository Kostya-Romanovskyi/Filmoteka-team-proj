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
      // console.log(typeof JSON.stringify(data.genres));
      localStorage.setItem('localGenres', JSON.stringify(data.genres));
    })
    .catch(error => {
      console.log(error);
    });
}

function render(movies) {
  const markupContainer = document.querySelector('.movie-markup');
  const genres = JSON.parse(localStorage.getItem('localGenres'));

  markupContainer.innerHTML = movies
    .map(movie => {
      // заглушка для відсутньої картинки
      const imageSrc = !movie.poster_path
        ? 'https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg'
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
                ${movie.genre_ids?.length ? '' : 'hidden'}>${cardGenres}</p>
                <p class="card__year" ${
                  movie.release_date?.length ? '' : 'hidden'
                }> ${parseInt(movie.release_date)}</p>
              </div>
            </div>
          </a>
        </li> `;
    })
    .join('');
}

export { render, getGenres };
