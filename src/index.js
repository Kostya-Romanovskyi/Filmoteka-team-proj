/*
    @param 'watched' | 'queue' listType
    @param { Film } film
*/

function addFilmToList(listType, film) {
  const storageKey = listType;

  const filmList = JSON.parse(localStorage.getItem(storageKey)) || [];

  filmList.push(film);

  localStorage.setItem(storageKey, JSON.stringify(filmList));
}

// addFilmToList('watched', { name: 'Titanic' });
// addFilmToList('queue', { name: 'Clon' });
