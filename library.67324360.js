!function(){function t(t){return t&&t.__esModule?t.default:t}function e(t,e,n,r){Object.defineProperty(t,e,{get:n,set:r,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=n.parcelRequired7c6;null==i&&((i=function(t){if(t in r)return r[t].exports;if(t in o){var e=o[t];delete o[t];var n={id:t,exports:{}};return r[t]=n,e.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){o[t]=e},n.parcelRequired7c6=i),i.register("4F07H",(function(t,e){var n={openModalFooter:document.querySelector("[data-modal-open]"),closeModalFooter:document.querySelector("[data-modal-close]"),modalFooter:document.querySelector("[data-modal-footer]"),backdropFooter:document.querySelector(".backdrop-footer")};function r(){n.modalFooter.classList.add("is-hidden-footer"),window.removeEventListener("keydown",o),document.body.style.overflow=""}function o(t){"Escape"===t.code&&(r(),window.removeEventListener("keydown",o))}n.openModalFooter.addEventListener("click",(function(){n.modalFooter.classList.remove("is-hidden-footer"),window.addEventListener("keydown",o),document.body.style.overflow="hidden"})),n.closeModalFooter.addEventListener("click",r),n.backdropFooter.addEventListener("click",(function(t){t.currentTarget===t.target&&r()}))})),i.register("4Q35t",(function(t,e){({el:document.querySelector(".btn-up"),scrolling:!1,show:function(){if(this.el.classList.contains("btn-up_hide")&&!this.el.classList.contains("btn-up_hiding")){var t=this;this.el.classList.remove("btn-up_hide"),this.el.classList.add("btn-up_hiding"),window.setTimeout((function(){t.el.classList.remove("btn-up_hiding")}),200)}},hide:function(){if(!this.el.classList.contains("btn-up_hide")&&!this.el.classList.contains("btn-up_hiding")){var t=this;this.el.classList.add("btn-up_hiding"),window.setTimeout((function(){t.el.classList.add("btn-up_hide"),t.el.classList.remove("btn-up_hiding")}),200)}},addEventListener:function(){var t=this;window.addEventListener("scroll",(function(){var e=window.scrollY||document.documentElement.scrollTop;t.scrolling&&e>0||(t.scrolling=!1,e>400?t.show():t.hide())})),document.querySelector(".btn-up").onclick=function(){t.scrolling=!0,t.hide(),window.scrollTo({top:0,left:0,behavior:"smooth"})}}}).addEventListener()})),i.register("5xtVg",(function(e,n){var r=i("8nrFW"),o=document.querySelector(".movie-markup"),a=document.querySelector("[data-modal]"),c=document.querySelector(".modal-film"),s="",l=null;function u(t){p()}function d(t){"Escape"===t.key&&p()}function f(t){t.target===t.currentTarget&&p()}function p(){a.classList.add("is-hidden"),document.body.classList.remove("overflow"),a.removeEventListener("click",f),document.removeEventListener("keydown",d),s.removeEventListener("click",u)}function h(t,e){var n=t,r=JSON.parse(localStorage.getItem(n))||[];r.push(e),localStorage.setItem(n,JSON.stringify(r))}function m(t,e){var n=JSON.parse(localStorage.getItem(t));return n&&n.find((function(t){return Number(e)===t.id}))?"disabled":""}o.addEventListener("click",(function(e){e.preventDefault();var n=e.target.closest("li").getAttribute("data-id");e.target!==e.currentTarget&&(!function(e){var n=localStorage.getItem("currentPage"),o=localStorage.getItem("localGenres"),i=localStorage.getItem("watched"),a=localStorage.getItem("queue");try{var s,u,d,f,p=JSON.parse(n),h=JSON.parse(o),v=JSON.parse(i),g=JSON.parse(a),y=[];v&&g?(s=y).push.apply(s,t(r)(v).concat(t(r)(g),t(r)(p.result.results))):g?(u=y).push.apply(u,t(r)(g).concat(t(r)(p.result.results))):v?(d=y).push.apply(d,t(r)(v).concat(t(r)(p.result.results))):(f=y).push.apply(f,t(r)(p.result.results)),l=y.filter((function(t){return t.id===Number(e)}))[0];var _=[];h.map((function(t){l.genre_ids.includes(t.id)&&_.push(t.name)}));var b=l.poster_path?"https://image.tmdb.org/t/p/w500".concat(l.poster_path):"https://www.theoxygenstore.com/images/source/No-image.jpg";c.innerHTML='<div class="modal-film__content">\n      <button class="close-modal" type="button">\n        <svg class="close__icon" width="14" height="14">\n          <use href="./images/home/close.svg#close-icon"></use>\n        </svg>\n      </button>\n      <img\n        class="modal-film__poster"\n       \n        src="'.concat(b,'"\n        alt=').concat(l.title,'\n        width="240"\n        height="357"\n      />\n      <div class="modal-wrapper">\n      <h2 class="title-film">').concat(l.title,'</h2>\n      <ul class="modal-film__list">\n        <li class="modal-film__item">\n          <span class="item__label">Vote / Votes</span>\n          <span class="item__content"\n            ><span class="item__content--rating">').concat(l.vote_average.toFixed(1),'</span> /<span\n              class="item__content--votes"\n              >').concat(l.vote_count,'</span\n            >\n          </span>\n        </li>\n        <li class="modal-film__item">\n          <span class="item__label">Popularity</span>\n          <span class="item__content">').concat(l.popularity.toFixed(1),'</span>\n        </li>\n        <li class="modal-film__item">\n          <span class="item__label">Original Title</span>\n          <span class="item__content">').concat(l.original_title,'</span>\n        </li>\n        <li class="modal-film__item">\n          <span class="item__label">Genre</span>\n          <span class="item__content">').concat(_.join(", "),'</span>\n        </li>\n      </ul>\n      <div class="modal-film__about">\n        <h3 class="about__title">ABOUT</h3>\n        <p class="about__text">\n          ').concat(l.overview,'\n        </p>\n      </div>\n      <div class="modal-film__buttons">\n        <button class="modal_film__btn" id="add_to_watched_btn" type="button" ').concat(m("watched",e),'>add to Watched</button>\n        <button class="modal_film__btn" id="add_to_queue_btn" type="button" ').concat(m("queue",e),">add to queue</button>\n      </div>\n      </div>\n    </div>")}catch(t){console.log(t)}}(n),s=document.querySelector(".close-modal"),a.classList.remove("is-hidden"),document.body.classList.add("overflow"),document.addEventListener("keydown",d),s.addEventListener("click",u),a.addEventListener("click",f),o=document.querySelector("#add_to_watched_btn"),i=document.querySelector("#add_to_queue_btn"),o.addEventListener("click",(function(){o.disabled=!0,h("watched",l)})),i.addEventListener("click",(function(){i.disabled=!0,h("queue",l)})));var o,i}))})),i.register("8nrFW",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){return n.default(t)||r.default(t)||a.default(t)||o.default()};var n=c(i("kMC0W")),r=c(i("7AJDX")),o=c(i("8CtQK")),a=c(i("auk6i"));function c(t){return t&&t.__esModule?t:{default:t}}})),i.register("kMC0W",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if(Array.isArray(t))return r.default(t)};var n,r=(n=i("8NIkP"))&&n.__esModule?n:{default:n}})),i.register("8NIkP",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}})),i.register("7AJDX",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}})),i.register("8CtQK",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}})),i.register("auk6i",(function(t,e){"use strict";Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t,e){if(!t)return;if("string"==typeof t)return r.default(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r.default(t,e)};var n,r=(n=i("8NIkP"))&&n.__esModule?n:{default:n}})),i.register("eGXEt",(function(n,r){e(n.exports,"getTrendings",(function(){return c})),e(n.exports,"render",(function(){return l})),e(n.exports,"getMoviesByName",(function(){return s}));var o=i("bpxeT"),a=i("2TvXO");function c(e,n){var r=document.querySelector(".loader-container"),i=e,c=n;function s(){return s=t(o)(t(a).mark((function e(){var n,r,o,i,c=arguments;return t(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=c.length>0&&void 0!==c[0]?c[0]:"week",r=c.length>1&&void 0!==c[1]?c[1]:"63240915768e2fa639cf91287e69284e",t.next=3,fetch("https://api.themoviedb.org/3/trending/movie/".concat(n,"?api_key=").concat(r));case 3:return o=t.sent,t.next=6,o.json();case 6:return i=t.sent,t.abrupt("return",i);case 8:case"end":return t.stop()}}),e)}))),s.apply(this,arguments)}r.hidden=!1,function(){return s.apply(this,arguments)}(i,c).then((function(t){localStorage.setItem("currentPage",JSON.stringify({type:"trending",result:t})),l(t.results)})).catch((function(t){console.log(t)})).finally((function(){r.hidden=!0}))}function s(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"63240915768e2fa639cf91287e69284e",i=document.querySelector(".loader-container"),c=document.querySelector(".message"),s=document.querySelector(".movie-markup");function u(t,e,n){return d.apply(this,arguments)}function d(){return(d=t(o)(t(a).mark((function e(n,r,o){var i,c;return t(a).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.themoviedb.org/3/search/movie?api_key=".concat(o,"&query=").concat(n,"&page=").concat(r));case 2:return i=t.sent,t.next=5,i.json();case 5:return c=t.sent,t.abrupt("return",c);case 7:case"end":return t.stop()}}),e)})))).apply(this,arguments)}i.hidden=!1,u(e,n,r).then((function(t){if(!t.total_results)throw s.innerHTML='<p class="movie-markup__message">Nothing found </p>',c.textContent="Search result not successful. Enter the correct movie name and",new Error("Search result not successful. Enter the correct movie name and");localStorage.setItem("currentPage",JSON.stringify({type:"serched",result:t})),l(t.results)})).catch((function(t){console.log(t)})).finally((function(){i.hidden=!0}))}function l(t){var e=document.querySelector(".movie-markup"),n=JSON.parse(localStorage.getItem("localGenres"));e.innerHTML=t.map((function(t){var e=t.poster_path?"https://image.tmdb.org/t/p/w500".concat(t.poster_path):"https://cdn.pixabay.com/photo/2016/12/14/23/08/page-not-found-1907792_960_720.jpg",r=n.filter((function(e){if(t.genre_ids.includes(e.id))return e.name})).map((function(t){return t.name})).join(", ");return'\n        <li class="card__item" data-id='.concat(t.id,'>\n          <a class="card__link" href="">\n            <img class="card__img" src="').concat(e,'" alt="').concat(t.title,'">\n            <div>\n              <p class="card__title">').concat(t.title,'</p>\n              <div class="card__container">\n                <p class="card__genres"\n                ').concat(t.genre_ids.length?"":"hidden",">").concat(r,'</p>\n                <p class="card__year" ').concat(t.release_date.length?"":"hidden","> ").concat(parseInt(t.release_date),"</p>\n              </div>\n            </div>\n          </a>\n        </li> ")})).join("")}})),i.register("bpxeT",(function(t,e){"use strict";function n(t,e,n,r,o,i,a){try{var c=t[i](a),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(r,o)}Object.defineProperty(t.exports,"__esModule",{value:!0}),t.exports.default=function(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)}))}}})),i.register("2TvXO",(function(t,e){var n=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new j(r||[]);return i._invoke=function(t,e,n){var r=d;return function(o,i){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===o)throw i;return T()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=S(a,n);if(c){if(c===m)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var s=u(t,e,n);if("normal"===s.type){if(r=n.done?h:f,s.arg===m)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=h,n.method="throw",n.arg=s.arg)}}}(t,n,a),i}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var d="suspendedStart",f="suspendedYield",p="executing",h="completed",m={};function v(){}function g(){}function y(){}var _={};s(_,i,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(N([])));w&&w!==n&&r.call(w,i)&&(_=w);var L=y.prototype=v.prototype=Object.create(_);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function n(o,i,a,c){var s=u(t[o],t,i);if("throw"!==s.type){var l=s.arg,d=l.value;return d&&"object"==typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(d).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function S(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,S(t,n),"throw"===n.method))return m;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=u(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,m;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,m):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function N(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:T}}function T(){return{value:e,done:!0}}return g.prototype=y,s(L,"constructor",y),s(y,"constructor",g),g.displayName=s(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},x(E.prototype),s(E.prototype,a,(function(){return this})),t.AsyncIterator=E,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new E(l(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(L),s(L,c,"Generator"),s(L,i,(function(){return this})),s(L,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=N,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var s=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(s&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;O(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:N(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}))}();
//# sourceMappingURL=library.67324360.js.map
