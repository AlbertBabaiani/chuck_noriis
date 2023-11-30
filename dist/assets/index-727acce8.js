var u=Object.defineProperty;var m=(l,e,t)=>e in l?u(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var r=(l,e,t)=>(m(l,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class _{constructor(){r(this,"my_link",`
        <i class="fa-brands fa-github ms-2"></i>
        Albert Babayan
        `);r(this,"app",document.getElementById("app"));r(this,"header",document.createElement("header"));r(this,"main",document.createElement("main"));r(this,"categories_container",document.createElement("div"));r(this,"content",document.createElement("div"));r(this,"clear_all_btn",document.createElement("button"));r(this,"fitst_time",!0)}}const d=class d extends _{load(){const e=document.createElement("h1");e.classList.add("title","display-3","mb-2"),e.textContent="Chuck Norris Facts";const t=document.createElement("p");t.classList.add("author"),t.textContent="Created by";const i=document.createElement("a");i.target="_blank",i.href="https://github.com/AlbertBabaiani",i.title="GitHub",i.innerHTML=this.my_link,t.append(i,"| 30.11.2023"),this.header.append(e,t);const s=document.createElement("div");s.classList.add("generate-btn","mt-3","mb-4");const n=document.createElement("button");n.type="button",n.id="generate",n.textContent="Generate",n.addEventListener("click",async function(){s.classList.add("show-loading"),n.style.color="#282a36",this.blur(),d.instance.render(await o.instance.generate()),s.classList.remove("show-loading"),n.style.color="#fefaff"}),s.append(n),this.clear_all_btn.type="button",this.clear_all_btn.textContent="Unselect All",this.clear_all_btn.id="clear_all_button",this.clear_all_btn.classList.add("clear_all_button"),this.clear_all_btn.disabled=!0,this.clear_all_btn.addEventListener("click",function(){o.instance.removeAll(),this.disabled=!0}),this.content.classList.add("content");const a=document.createElement("div"),c=document.createElement("p");c.textContent="Categories",a.classList.add("category-title","mb-3"),c.classList.add("fs-2"),a.append(c,this.clear_all_btn),this.main.append(s,a,this.categories_container),this.app.append(this.header,this.main)}clear(){this.content.innerHTML=""}categories_constructor(e,t=!1){let i=0;const s=document.createDocumentFragment();e.forEach(n=>{const a=document.createElement("label");a.className="category-label",a.textContent=n,a.setAttribute("for",n),this.fitst_time?(a.style.setProperty("--delay",i.toString()+"s"),i+=.05):a.style.setProperty("--delay","0s"),t&&a.classList.add("selected");const c=document.createElement("input");c.type="checkbox",c.id=n,c.name="categories",c.checked=!!t,c.addEventListener("click",function(){this.checked?(a.classList.add("selected"),o.instance.add_category=n):(a.classList.remove("selected"),o.instance.remove_category=n),o.instance.get_selected_categories.length===0?d.instance.clear_all_btn.disabled=!0:d.instance.clear_all_btn.disabled=!1}),a.append(c),s.append(a)}),this.categories_container.append(s)}show_categories(e,t){var i;if((i=this.categories_container)==null||i.classList.add("categories-container","mb-3"),"error"in e)console.log("Error:",e);else{this.categories_container.innerHTML="";const s=t?e.filter(n=>!t.includes(n)):e;t&&this.categories_constructor(t,!0),this.categories_constructor(s),this.fitst_time=!1}}render(e){if(this.clear(),"error"in e)console.log("Error:",e);else{this.content.remove(),this.main.append(this.content);const t=document.createElement("p");t.textContent=e.value.toString(),this.content.append(t)}}};r(d,"instance",new d);let h=d;class p{constructor(){r(this,"categories",[]);r(this,"selected_categories",[]);r(this,"api_random","https://api.chucknorris.io/jokes/random");r(this,"api_categoris","https://api.chucknorris.io/jokes/categories");r(this,"api_custom_category","https://api.chucknorris.io/jokes/random?category=")}async fetching(e){try{const t=await fetch(e);return t.ok?await t.json():await t.json()}catch(t){return t}}}const g=class g extends p{async generate(){return this.selected_categories.length!==0?await this.fetching(this.generate_by_category()):await this.fetching(this.api_random)}async generate_categories(){const e=await this.fetching(this.api_categoris);return"error"in e?e:(this.categories=e,this.categories)}get get_categories(){return this.categories}get get_selected_categories(){return this.selected_categories}set add_category(e){var t;(t=this.selected_categories)==null||t.push(e),this.reorganise()}set remove_category(e){var t;this.selected_categories=(t=this.selected_categories)==null?void 0:t.filter(i=>i!==e),this.reorganise()}reorganise(){this.selected_categories.sort(),h.instance.show_categories(this.categories,this.selected_categories)}removeAll(){this.selected_categories=[],h.instance.show_categories(this.categories)}generate_by_category(){const e=this.selected_categories.length,t=Math.floor(Math.random()*e);return this.api_custom_category+this.selected_categories[t]}};r(g,"instance",new g);let o=g;const f=async()=>{h.instance.load(),await o.instance.generate_categories(),h.instance.show_categories(o.instance.get_categories)};document.addEventListener("DOMContentLoaded",f);
