!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},a=e.parcelRequired7c6;null==a&&((a=function(e){if(e in t)return t[e].exports;if(e in r){var a=r[e];delete r[e];var s={id:e,exports:{}};return t[e]=s,a.call(s.exports,s,s.exports),s.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){r[e]=t},e.parcelRequired7c6=a),a("4F07H"),a("4Q35t"),a("5xtVg");var s=a("eGXEt"),c=document.querySelector(".js-watched"),i=document.querySelector(".js-queue"),n=document.querySelector(".movie-markup");i.addEventListener("click",(function(){try{var e=JSON.parse(localStorage.getItem("queue"));i.classList.add("btn-active-lbr"),c.classList.remove("btn-active-lbr"),(0,s.render)(e)}catch(e){i.classList.add("btn-active-lbr"),c.classList.remove("btn-active-lbr"),n.innerHTML='<p class="movie-markup__message">Queue is empty</p>'}})),c.addEventListener("click",(function(){try{var e=JSON.parse(localStorage.getItem("watched"));c.classList.add("btn-active-lbr"),i.classList.remove("btn-active-lbr"),(0,s.render)(e)}catch(e){c.classList.add("btn-active-lbr"),i.classList.remove("btn-active-lbr"),n.innerHTML='<p class="movie-markup__message">Watched is empty </p>'}}));try{var l=JSON.parse(localStorage.getItem("watched"));c.classList.add("btn-active-lbr"),(0,s.render)(l)}catch(e){n.innerHTML='<p class="movie-markup__message">Watched is empty </p>'}}();
//# sourceMappingURL=library.53d57d15.js.map
