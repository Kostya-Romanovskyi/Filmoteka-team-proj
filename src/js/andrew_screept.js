const API_KEY = '50540b41e66ef631d8d57e13679f9024';
const TRENDING_TIME = 'week';

let mainBtn = document.getElementById('main_btn');
mainBtn.addEventListener('click', Trending);

let searchBtn = document.getElementById('search_btn');
searchBtn.addEventListener('click', Searh);
let inputMovie = document.getElementById('search_movie');


function Searh() {

    // console.log(inputMovie.value);
    if (!inputMovie.value) {
        console.log('no input');
        return;
    }

    console.log('Search');

    const fetchMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' +
            API_KEY + '&language=en-US&query=' + inputMovie.value + '&page=1&include_adult=false');
        const movies = await response.json();
        return movies;
    };

    fetchMovies()
        .then(movies => {
            console.log('serch f', movies.results);
            localStorage.setItem('currentPageMovie', JSON.stringify(movies.results));
        })
        .catch(error => console.log(error));



    Render(localStorage.getItem('currentPageMovie'));

}

function Trending() {
    console.log('Trending');

    const fetchMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/' +
            TRENDING_TIME + '?api_key=' + API_KEY);
        const movies = await response.json();
        return movies;
    };

    fetchMovies()
        .then(movies => {
            // console.log('f',movies.results);
            localStorage.setItem('currentPageMovie', JSON.stringify(movies.results));
        })
        .catch(error => console.log(error));



    Render(localStorage.getItem('currentPageMovie'));

}


function Render(movies) {
    let arraymovies = JSON.parse(movies);
    console.log('Render', arraymovies);
    let resultHtml = [];
    searchBtn.insertAdjacentHTML("afterend", '');
    arraymovies.forEach(movie => {
        resultHtml.push('<li>Title ' + !movie.title ? movie.name : movie.title + '</li>');
        resultHtml.push('<img src="' + !movie.poster_path ? '\images\no-image.jpg' : movie.poster_path + '" alt="'+ movie.title +'"></li>');
        resultHtml.push('<li>genre_ids ' + movie.genre_ids + '</li>');
        resultHtml.push('<li>vote_average ' + movie.vote_average + '</li>');
    });
    // console.log('Afrter  Render', resultHtml.join(''));
    searchBtn.insertAdjacentHTML("afterend", resultHtml.join(''));
}
