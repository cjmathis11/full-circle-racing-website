const cfg = window.FCR_CONFIG || {text:{}, links:{}, races:[], gear:[]};

document.querySelectorAll("[data-text]").forEach(el => {
  const key = el.dataset.text;
  if (cfg.text && cfg.text[key] !== undefined) el.textContent = cfg.text[key];
});

document.querySelectorAll("[data-link]").forEach(el => {
  const key = el.dataset.link;
  if (cfg.links && cfg.links[key]) el.href = cfg.links[key];
});

const raceList = document.getElementById("race-list");
if (raceList) {
  raceList.innerHTML = "";
  (cfg.races || []).forEach(race => {
    const row = document.createElement("div");
    row.className = "race-row";
    row.innerHTML = `
      <div class="race-series">${race.series}</div>
      <div>${race.name}</div>
      <div class="race-track">${race.track}</div>
      <div class="race-date">${race.date}</div>
    `;
    raceList.appendChild(row);
  });
}

const gearBrands = document.getElementById("gear-brands");
if (gearBrands) {
  gearBrands.innerHTML = "";
  (cfg.gear || []).forEach(item => {
    const div = document.createElement("div");
    div.className = "gear-brand" + (item.red ? " red" : "");
    div.textContent = item.name;
    gearBrands.appendChild(div);
  });
}

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// Highlight the navigation section as the user scrolls.
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".main-nav a")];

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => a.classList.remove("active"));
      const matching = navLinks.find(a => a.getAttribute("href") === `#${entry.target.id}`);
      if (matching) matching.classList.add("active");
    });
  }, {rootMargin:"-30% 0px -55% 0px", threshold:0});

  sections.forEach(s => observer.observe(s));
}
