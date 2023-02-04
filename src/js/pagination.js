import axios from 'axios';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/_pagination-btn.scss';
import { render } from './trends-and-search.js';

const markupContainer = document.querySelector('.movie-markup');
const formEl = document.querySelector('.search-form');

async function fetchMovies(page) {
  const url = 'https://api.themoviedb.org/3/trending/movie/week';
  const opt = {
    api_key: '63240915768e2fa639cf91287e69284e',
    total_results: 100,
    page,
  };
  const meta = new URLSearchParams(opt);
  const response = await axios.get(`${url}?${meta}`);
  return response.data;
}

const container = document.getElementById('tui-pagination-container');

const pagination = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
});

const page = pagination.getCurrentPage();

function fetch() {
  fetchMovies(page).then(data => {
    markupContainer.innerHTML = '';
    console.log(data);
    pagination.reset(data.total_results);
    render(data.results);
  });
}

fetch();

function paginationOn() {
  pagination.on('afterMove', event => {
    const currentPage = event.page;
    fetchMovies(currentPage).then(data => {
      markupContainer.innerHTML = '';
      console.log(data);
      render(data.results);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    });
  });
}

paginationOn();

formEl.addEventListener('submit', onClickPagination);

function onClickPagination() {
  async function fetchQuery(page) {
    const inputValue = formEl.elements.searchQuery.value;
    const url = 'https://api.themoviedb.org/3/search/movie';
    const opt = {
      api_key: '63240915768e2fa639cf91287e69284e',
      query: `${inputValue}`,
      total_results: 100,
      page,
    };
    const meta = new URLSearchParams(opt);
    const response = await axios.get(`${url}?${meta}`);
    console.log(response.data);
    return response.data;
  }

  const container = document.getElementById('tui-pagination-container');

  const queryPagination = new Pagination(container, {
    totalItems: 0,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
  });

  const page = queryPagination.getCurrentPage();

  function queryfetch() {
    fetchQuery(page).then(data => {
      markupContainer.innerHTML = '';
      console.log(data);
      queryPagination.reset(data.total_results);
      render(data.results);
    });
  }

  queryfetch();

  function querypaginationOn() {
    queryPagination.on('afterMove', event => {
      const currentPage = event.page;
      fetchQuery(currentPage).then(data => {
        markupContainer.innerHTML = '';
        console.log(data);
        render(data.results);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
    });
  }

  querypaginationOn();
}
