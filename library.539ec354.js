let e=[];const t=document.querySelector(".search-form"),n=document.querySelector(".message"),r=document.querySelector(".movie-markup"),a=document.querySelector(".loader-container");function s(t){r.innerHTML=t.map((t=>{const n=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"https://www.theoxygenstore.com/images/source/No-image.jpg",r=e.reduce(((e,n)=>t.genre_ids.includes(n.id)?(console.log(e),e+n.name+" "):e),"");var a;return`\n        <a class="card__link" href="">\n        <li class="card__item" data-id=${t.id}>\n        <img class="card__img" src="${n}" alt="${t.title}">\n        <div>\n        <p class="card__title">${t.title}</p>\n        <div class="card__container">\n        <p class="card__genres">${r} | </p>\n        <p class="card__year"> ${null!==(a=parseInt(t.release_date))&&void 0!==a?a:""}</p>\n        </div>\n        </div>\n        </li>\n        </a>`})).join("")}t.addEventListener("submit",(function(e){e.preventDefault();const r=t.elements.searchQuery.value;if(console.log(t.elements),!r)return;a.hidden=!1,(async()=>{const e=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=63240915768e2fa639cf91287e69284e&query=${r}&page=1`);return await e.json()})().then((e=>{if(!e.total_results)throw n.textContent="Search result not successful. Enter the correct movie name and",new Error("Search result not successful. Enter the correct movie name and");s(e.results),localStorage.setItem("currentPage",JSON.stringify({type:"serched",result:e}))})).catch((e=>{console.log(e)})).finally((()=>{a.hidden=!0}))})),a.hidden=!1,(async()=>{const e=await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=63240915768e2fa639cf91287e69284e");return await e.json()})().then((e=>{s(e.results),localStorage.setItem("currentPage",JSON.stringify({type:"trending",result:e}))})).catch((e=>{console.log(e)})).finally((()=>{a.hidden=!0})),localStorage.genres||(async()=>{const e=await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=63240915768e2fa639cf91287e69284e&language=en-US");return await e.json()})().then((e=>{localStorage.setItem("genres",JSON.stringify(e.genres))})).catch((e=>{console.log(e)})),e=JSON.parse(localStorage.getItem("genres")),console.log(e);
//# sourceMappingURL=library.539ec354.js.map
