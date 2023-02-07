import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/_pagination-btn.scss';
import { render, getGenres } from './get-functions';

const markupContainer = document.querySelector('.movie-markup');
const formEl = document.querySelector('.search-form');
const container = document.getElementById('tui-pagination-container');
const loaderContainer = document.querySelector('.loader-container');
const message = document.querySelector('.message');

// if (!localStorage['localGenres']) {

// }

const pagination = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
});
const page = pagination.getCurrentPage();
getTrends();
trendsPaginationOn();
formEl.addEventListener('submit', onClickPagination);

async function fetchTrends(page) {
  const url = 'https://api.themoviedb.org/3/trending/movie/week';
  const key = '63240915768e2fa639cf91287e69284e';
  const opt = {
    api_key: `${key}`,
    total_results: 100,
    page,
  };
  const meta = new URLSearchParams(opt);
  const response = await axios.get(`${url}?${meta}`);
  // console.log(response.data.results);
  localStorage.setItem(
    'currentPage',
    JSON.stringify({
      type: 'trending',
      result: response.data,
    })
  );
  return response.data;
}

async function getTrends() {
  loaderContainer.hidden = false; // запускає спінер

  if (!localStorage['localGenres']) {
    await getGenres();
  }

  fetchTrends(page)
    .then(data => {
      markupContainer.innerHTML = '';
      // console.log(data);
      pagination.reset(data.total_results);
      render(data.results);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderContainer.hidden = true; // виключає спінер
    });
}

function trendsPaginationOn() {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    loaderContainer.hidden = false; // запускає спінер
    fetchTrends(currentPage)
      .then(data => {
        markupContainer.innerHTML = '';
        // console.log(data);
        render(data.results);
        // paginationGenres();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loaderContainer.hidden = true; // виключає спінер
      });
  });
}

function onClickPagination(evt) {
  evt.preventDefault();
  const container = document.getElementById('tui-pagination-container');

  const queryPagination = new Pagination(container, {
    totalItems: 0,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
  });

  const page = queryPagination.getCurrentPage();
  getSearch();
  searchPaginationOn();

  async function fetchSearch(page) {
    const inputValue = formEl.elements.searchQuery.value;
    const url = 'https://api.themoviedb.org/3/search/movie';
    const opt = {
      api_key: '63240915768e2fa639cf91287e69284e',
      query: `${inputValue.trim()}`,
      total_results: 100,
      page,
    };
    if (!opt.query) {
      markupContainer.innerHTML =
        '<p class="movie-markup__message">Nothing found </p>';
      message.textContent =
        'Search result not successful. Enter the correct movie name and';
      setTimeout(() => {
        message.textContent = '';
      }, 2000);

      throw new Error(
        'Search result not successful. Enter the correct movie name and'
      );
    }
    const meta = new URLSearchParams(opt);
    const response = await axios.get(`${url}?${meta}`);

    // виводить повідомелення, коли приходить пустий результат і кидає помилку, яка потім обробляеться в сatch
    console.log(!response.data.total_results);
    if (!response.data.total_results) {
      markupContainer.innerHTML =
        '<p class="movie-markup__message">Nothing found </p>';
      message.textContent =
        'Search result not successful. Enter the correct movie name and';
      setTimeout(() => {
        message.textContent = '';
      }, 2000);

      throw new Error(
        'Search result not successful. Enter the correct movie name and'
      );
    }

    localStorage.setItem(
      'currentPage',
      JSON.stringify({
        type: 'searched',
        result: response.data,
      })
    );

    return response.data;
  }

  function getSearch() {
    loaderContainer.hidden = false; // запускає спінер
    fetchSearch(page)
      .then(data => {
        markupContainer.innerHTML = '';
        // console.log(data);
        queryPagination.reset(data.total_results);
        render(data.results);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loaderContainer.hidden = true; // виключає спіннер
      });
  }

  function searchPaginationOn() {
    queryPagination.on('afterMove', event => {
      const currentPage = event.page;
      loaderContainer.hidden = false; // запускає спінер
      fetchSearch(currentPage)
        .then(data => {
          markupContainer.innerHTML = '';
          // console.log(data);
          render(data.results);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          loaderContainer.hidden = true; // виключає спіннер
        });
    });
  }
}
