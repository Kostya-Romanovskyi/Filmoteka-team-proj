const e={openModalFooter:document.querySelector("[data-modal-open]"),closeModalFooter:document.querySelector("[data-modal-close]"),modalFooter:document.querySelector("[data-modal-footer]"),backdropFooter:document.querySelector(".backdrop-footer")};function t(){e.modalFooter.classList.add("is-hidden-footer"),window.removeEventListener("keydown",n),document.body.style.overflow=""}function n(e){"Escape"===e.code&&(t(),window.removeEventListener("keydown",n))}e.openModalFooter.addEventListener("click",(function(){e.modalFooter.classList.remove("is-hidden-footer"),window.addEventListener("keydown",n),document.body.style.overflow="hidden"})),e.closeModalFooter.addEventListener("click",t),e.backdropFooter.addEventListener("click",(function(e){e.currentTarget===e.target&&t()}));({el:document.querySelector(".btn-up"),scrolling:!1,show(){this.el.classList.contains("btn-up_hide")&&!this.el.classList.contains("btn-up_hiding")&&(this.el.classList.remove("btn-up_hide"),this.el.classList.add("btn-up_hiding"),window.setTimeout((()=>{this.el.classList.remove("btn-up_hiding")}),200))},hide(){this.el.classList.contains("btn-up_hide")||this.el.classList.contains("btn-up_hiding")||(this.el.classList.add("btn-up_hiding"),window.setTimeout((()=>{this.el.classList.add("btn-up_hide"),this.el.classList.remove("btn-up_hiding")}),200))},addEventListener(){window.addEventListener("scroll",(()=>{const e=window.scrollY||document.documentElement.scrollTop;this.scrolling&&e>0||(this.scrolling=!1,e>400?this.show():this.hide())})),document.querySelector(".btn-up").onclick=()=>{this.scrolling=!0,this.hide(),window.scrollTo({top:0,left:0,behavior:"smooth"})}}}).addEventListener();const o=document.querySelector(".movie-markup"),s=document.querySelector("[data-modal]"),i=document.querySelector(".modal-film");let l="",a=null;function c(e){u()}function d(e){"Escape"===e.key&&u()}function r(e){e.target===e.currentTarget&&u()}function u(){s.classList.add("is-hidden"),document.body.classList.remove("overflow"),s.removeEventListener("click",r),document.removeEventListener("keydown",d),l.removeEventListener("click",c)}function m(e,t){const n=e,o=JSON.parse(localStorage.getItem(n))||[];o.push(t),localStorage.setItem(n,JSON.stringify(o))}function _(e,t){const n=JSON.parse(localStorage.getItem(e));if(!n)return"";return n.find((e=>Number(t)===e.id))?"disabled":""}o.addEventListener("click",(function(e){e.preventDefault();const t=e.target.closest("li").getAttribute("data-id");e.target!==e.currentTarget&&(!function(e){const t=localStorage.getItem("currentPage"),n=localStorage.getItem("localGenres");try{const o=JSON.parse(t),s=JSON.parse(n);a=o.result.results.filter((t=>t.id===Number(e)))[0];const l=[];s.map((e=>{a.genre_ids.includes(e.id)&&l.push(e.name)}));const c=a.poster_path?`https://image.tmdb.org/t/p/w500${a.poster_path}`:"https://www.theoxygenstore.com/images/source/No-image.jpg";i.innerHTML=`<div class="modal-film__content">\n      <button class="close-modal" type="button">\n        <svg class="close__icon" width="14" height="14">\n          <use href="./images/home/close.svg#close-icon"></use>\n        </svg>\n      </button>\n      <img\n        class="modal-film__poster"\n       \n        src="${c}"\n        alt=${a.title}\n        width="240"\n        height="357"\n      />\n      <div class="modal-wrapper">\n      <h2 class="title-film">${a.title}</h2>\n      <ul class="modal-film__list">\n        <li class="modal-film__item">\n          <span class="item__label">Vote / Votes</span>\n          <span class="item__content"\n            ><span class="item__content--rating">${a.vote_average.toFixed(1)}</span> /<span\n              class="item__content--votes"\n              >${a.vote_count}</span\n            >\n          </span>\n        </li>\n        <li class="modal-film__item">\n          <span class="item__label">Popularity</span>\n          <span class="item__content">${a.popularity.toFixed(1)}</span>\n        </li>\n        <li class="modal-film__item">\n          <span class="item__label">Original Title</span>\n          <span class="item__content">${a.original_title}</span>\n        </li>\n        <li class="modal-film__item">\n          <span class="item__label">Genre</span>\n          <span class="item__content">${l.join(", ")}</span>\n        </li>\n      </ul>\n      <div class="modal-film__about">\n        <h3 class="about__title">ABOUT</h3>\n        <p class="about__text">\n          ${a.overview}\n        </p>\n      </div>\n      <div class="modal-film__buttons">\n        <button class="modal_film__btn" id="add_to_watched_btn" type="button" ${_("watched",e)}>add to Watched</button>\n        <button class="modal_film__btn" id="add_to_queue_btn" type="button" ${_("queue",e)}>add to queue</button>\n      </div>\n      </div>\n    </div>`}catch(e){console.log(e)}}(t),function(){const e=document.querySelector("#add_to_watched_btn"),t=document.querySelector("#add_to_queue_btn");e.addEventListener("click",(()=>{e.disabled=!0,m("watched",a)})),t.addEventListener("click",(()=>{t.disabled=!0,m("queue",a)}))}(),l=document.querySelector(".close-modal"),s.classList.remove("is-hidden"),document.body.classList.add("overflow"),document.addEventListener("keydown",d),l.addEventListener("click",c),s.addEventListener("click",r))}));const p=document.querySelector(".js-watched"),h=document.querySelector(".js-queue");function g(){const e=document.querySelector(".movie-markup"),t=JSON.parse(localStorage.getItem("watched"));console.log(t),v(e,t)}function v(e,t){e.innerHTML=t.map((e=>{const n=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"https://image.tmdb.org/t/p/w500",o=t.filter((t=>{if(e.genre_ids.includes(t.id))return t.name})).map((e=>e.name)).join(", ");return`\n          <li class="card__item" data-id=${e.id}>\n            <a class="card__link" href="">\n              <img class="card__img" src="${n}" alt="${e.title}">\n              <div>\n                <p class="card__title">${e.title}</p>\n                <div class="card__container">\n                  <p class="card__genres"\n                  ${e.genre_ids.length?"":"hidden"}>${o} | </p>\n                  <p class="card__year" ${e.release_date.length?"":"hidden"}> ${parseInt(e.release_date)??""}</p>\n                </div>\n              </div>\n            </a>\n          </li> `})).join("")}g(),h.addEventListener("click",(function(){const e=document.querySelector(".movie-markup"),t=JSON.parse(localStorage.getItem("queue"));console.log(t),v(e,t)})),p.addEventListener("click",g);
//# sourceMappingURL=library.c76cafed.js.map
