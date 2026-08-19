const c = window.FCR_CONFIG || {site:{},links:{},gear:{},races:[]};
document.querySelectorAll('[data-site]').forEach(el=>{const k=el.dataset.site;if(c.site[k])el.textContent=c.site[k];});
document.querySelectorAll('[data-link]').forEach(el=>{const k=el.dataset.link;if(c.links[k])el.href=c.links[k];});
document.querySelectorAll('[data-gear]').forEach(el=>{const k=el.dataset.gear;if(c.gear[k])el.textContent=c.gear[k];});
const raceList=document.getElementById('race-list');
if(raceList){raceList.innerHTML=(c.races||[]).map(r=>`<div class="race-row"><div class="race-series">${r.series}</div><div><strong>${r.name}</strong><small>${r.track}</small></div><div class="race-date"><b>${r.date}</b></div></div>`).join('');}
const menu=document.querySelector('.menu-toggle'), nav=document.querySelector('.main-nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
document.getElementById('year').textContent=new Date().getFullYear();
