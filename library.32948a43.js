var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},s={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in s){var n=s[e];delete s[e];var a={id:e,exports:{}};return t[e]=a,n.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){s[e]=t},e.parcelRequired7c6=n),n("6HA5D"),n("dL6U0"),n("bTcpz");var a=n("9yiNF");const r=document.querySelector(".js-watched"),c=document.querySelector(".js-queue"),i=(document.querySelector(".msg-container"),document.querySelector(".msg-container"));c.addEventListener("click",(function(){try{const e=JSON.parse(localStorage.getItem("queue"));c.classList.add("btn-active-lbr"),r.classList.remove("btn-active-lbr"),(0,a.render)(e),0===e.length&&(i.innerHTML='<p class="msg-container__message">Queue is empty</p>')}catch(e){c.classList.add("btn-active-lbr"),r.classList.remove("btn-active-lbr"),i.innerHTML='<p class="msg-container__message">Queue is empty</p>'}})),r.addEventListener("click",(function(){try{const e=JSON.parse(localStorage.getItem("watched"));r.classList.add("btn-active-lbr"),c.classList.remove("btn-active-lbr"),(0,a.render)(e),0===e.length&&(i.innerHTML='<p class="msg-container__message">Watched is empty </p>')}catch(e){r.classList.add("btn-active-lbr"),c.classList.remove("btn-active-lbr"),i.innerHTML='<p class="msg-container__message">Watched is empty </p>'}}));try{const e=JSON.parse(localStorage.getItem("watched"));r.classList.add("btn-active-lbr"),(0,a.render)(e),0===e.length&&(i.innerHTML='<p class="msg-container__message">Watched is empty </p>')}catch(e){i.innerHTML='<p class="msg-container__message">Watched is empty </p>'}
//# sourceMappingURL=library.32948a43.js.map