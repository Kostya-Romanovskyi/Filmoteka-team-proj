const cardList = document.querySelector('.js__card');

const markup = `<li class="card__item">
  <div class="card__thumb">
<img
class="card__img"
src=""
alt="poster"
/>
    <h2 class="card__name"></h2>
    <div class="card__content">
        <p class="card__genre"><span>|</span></p>
        <p class="card__date"></p>
    </div>
  </div>
</li>`;
const cardDate = document.querySelector('.card__date').slice(0, 4);
