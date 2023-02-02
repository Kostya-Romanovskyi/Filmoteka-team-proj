        // <button id='main_btn'>Trending</button>
        // <input id='search_muvie' type="text" name="input">
        // <button id='search_btn'>Search</button>

console.log(' -  * test * - ');
const API_KEY = '50540b41e66ef631d8d57e13679f9024';
const TRENDING_TIME = 'week';

let mainBtn = document.getElementById('main_btn');
mainBtn.addEventListener('click', Trending);

let searchBtn = document.getElementById('search_btn');
searchBtn.addEventListener('click', Searh);
let inputMuvie = document.getElementById('search_muvie');


function Searh() {

    // console.log(inputMuvie.value);
    if (!inputMuvie.value) {
        console.log('no input');
        return;
    }

    console.log('Search');

    const fetchMovies = async () => {
        const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' +
            API_KEY + '&language=en-US&query=' + inputMuvie.value + '&page=1&include_adult=false');
        const movies = await response.json();
        return movies;
    };

    fetchMovies()
        .then(movies => {
            console.log('serch f', movies.results);
            localStorage.setItem('currentPageMuvie', JSON.stringify(movies.results));
        })
        .catch(error => console.log(error));



    Render(localStorage.getItem('currentPageMuvie'));

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
            localStorage.setItem('currentPageMuvie', JSON.stringify(movies.results));
        })
        .catch(error => console.log(error));



    Render(localStorage.getItem('currentPageMuvie'));

}


function Render(muvies) {
    let arrayMuvies = JSON.parse(muvies);
    console.log('Render', arrayMuvies);
    let resultHtml = [];
    searchBtn.insertAdjacentHTML("afterend", '');
    for (const muvie of arrayMuvies) {
        resultHtml.push('<li>Title ' + muvie.title + '</li>');
        // resultHtml.push('<img src="' + muvie.poster_path + '" alt="'+ muvie.title +'"></li>');
        resultHtml.push('<li>genre_ids ' + muvie.genre_ids + '</li>');
        resultHtml.push('<li>vote_average ' + muvie.vote_average + '</li>');

    }
    // console.log('Afrter  Render', resultHtml.join(''));
    searchBtn.insertAdjacentHTML("afterend", resultHtml.join(''));
}

//https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>

// конкретний фільм
// https://api.themoviedb.org/3/movie/550?api_key=50540b41e66ef631d8d57e13679f9024