!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},t={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in r)return r[e].exports;if(e in t){var n=t[e];delete t[e];var a={id:e,exports:{}};return r[e]=a,n.call(a.exports,a,a.exports),a.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){t[e]=r},e.parcelRequired7c6=n),n("4F07H"),n("4Q35t"),n("5xtVg");var a=n("eGXEt"),o=document.querySelector(".js-watched"),c=document.querySelector(".js-queue"),i=document.querySelector(".movie-markup");c.addEventListener("click",(function(){try{var e=JSON.parse(localStorage.getItem("queue"));(0,a.render)(e)}catch(e){i.innerHTML='<p class="movie-markup__message">Queue is empty</p>'}})),o.addEventListener("click",(function(){try{var e=JSON.parse(localStorage.getItem("watched"));(0,a.render)(e)}catch(e){console.log(e.name),i.innerHTML='<p class="movie-markup__message">Watched is empty </p>'}}));try{var l=JSON.parse(localStorage.getItem("watched"));(0,a.render)(l)}catch(e){console.log(e.name),i.innerHTML='<p class="movie-markup__message">Watched is empty </p>'}}();
//# sourceMappingURL=library.c21c50e2.js.map