// ---------- STARS ----------
const starsEl = document.getElementById('stars');
for (let i = 0; i < 120; i++) {
  const s = document.createElement('div');
  s.className = 'star' + (Math.random() < 0.12 ? ' big' : '');
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 55 + '%';
  s.style.animationDelay = (Math.random() * 4) + 's';
  s.style.animationDuration = (2.5 + Math.random() * 3) + 's';
  starsEl.appendChild(s);
}

// ---------- SHOOTING STARS ----------
const shootLayer = document.getElementById('shootingStars');

function spawnShootingStar() {
  if (reduceMotion) return;
  const s = document.createElement('div');
  s.className = 'shooting-star';
  s.style.left = (20 + Math.random() * 50) + '%';
  s.style.top = (6 + Math.random() * 18) + '%';
  s.style.animation = 'shoot 1.1s ease-out forwards';
  shootLayer.appendChild(s);
  setTimeout(() => s.remove(), 1300);
}
setInterval(() => { if (Math.random() < 0.5) spawnShootingStar(); }, 7000);
setTimeout(spawnShootingStar, 2500);

// ---------- CLOUDS ----------
const cloudLayer = document.getElementById('cloudLayer');
for (let i = 0; i < 5; i++) {
  const c = document.createElement('div');
  c.className = 'cloud';
  const size = 40 + Math.random() * 50;
  c.style.width = size + 'px';
  c.style.height = size * 0.4 + 'px';
  c.style.top = (6 + Math.random() * 22) + '%';
  const dur = 70 + Math.random() * 60;
  c.style.animationDuration = dur + 's';
  c.style.animationDelay = (-Math.random() * dur) + 's';
  cloudLayer.appendChild(c);
}

// ---------- FLYERS ----------
const flyerLayer = document.getElementById('flyerLayer');

function birdSVG() {
  return `<svg viewBox="0 0 24 12" style="filter:drop-shadow(0 0 1.5px rgba(0,0,0,.55));">
    <g class="wing wing-l"><path d="M12,6 Q6,2 1,5" stroke="rgba(244,236,216,.92)" stroke-width="2.1" fill="none" stroke-linecap="round"/></g>
    <g class="wing wing-r"><path d="M12,6 Q18,2 23,5" stroke="rgba(244,236,216,.92)" stroke-width="2.1" fill="none" stroke-linecap="round"/></g>
  </svg>`;
}

function owlSVG() {
  return `<svg viewBox="0 0 40 20" style="filter:drop-shadow(0 0 2px rgba(0,0,0,.6));">
    <g class="wing wing-l"><path d="M20,11 Q9,3 1,10" stroke="rgba(250,242,222,.95)" stroke-width="2.8" fill="none" stroke-linecap="round"/></g>
    <g class="wing wing-r"><path d="M20,11 Q31,3 39,10" stroke="rgba(250,242,222,.95)" stroke-width="2.8" fill="none" stroke-linecap="round"/></g>
    <ellipse cx="20" cy="12" rx="4.5" ry="3.2" fill="rgba(250,242,222,.95)"/>
    <polygon points="17,9 19.5,5 22,9" fill="rgba(250,242,222,.95)"/>
    <polygon points="18,9 20,5.5 22,9" fill="rgba(250,242,222,.95)"/>
  </svg>`;
}

function spawnFlyer(kind) {
  const isOwl = kind === 'owl';
  const f = document.createElement('div');
  f.className = 'flyer' + (isOwl ? ' owl' : ' bird');
  const reverse = Math.random() < 0.35;
  const size = isOwl ? 42 + Math.random() * 10 : 22 + Math.random() * 10;
  f.style.width = size + 'px';
  f.style.height = (size * 0.5) + 'px';
  f.style.top = (isOwl ? 14 + Math.random() * 20 : 8 + Math.random() * 30) + '%';
  f.style.opacity = isOwl ? 0.85 : (0.7 + Math.random() * 0.25);
  const dur = isOwl ? 22 + Math.random() * 10 : 13 + Math.random() * 9;
  f.style.animation = `${reverse ? 'flyacrossRev' : 'flyacross'} ${dur}s linear forwards`;
  f.innerHTML = `<div class="flap-wrap">${isOwl ? owlSVG() : birdSVG()}</div>`;
  flyerLayer.appendChild(f);
  setTimeout(() => f.remove(), dur * 1000 + 500);
}

setInterval(() => {
  if (Math.random() < 0.5) {
    spawnFlyer('bird');
    if (Math.random() < 0.3) setTimeout(() => spawnFlyer('bird'), 300 + Math.random() * 500);
  }
}, 6000);
setTimeout(() => spawnFlyer('bird'), 1200);
setInterval(() => { if (Math.random() < 0.4) spawnFlyer('owl'); }, 26000);
setTimeout(() => spawnFlyer('owl'), 11000);

// ---------- TREELINE ----------
const treelineLayer = document.getElementById('treelineLayer');
(function buildTreeline() {
  const w = 1600,
    h = 140,
    n = 34;
  let polys = '';
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * w + (Math.random() - 0.5) * 14;
    const crownH = 60 + Math.random() * 40;
    const crownW = 30 + Math.random() * 18;
    const base = h;
    const tip = base - crownH;
    polys += `<polygon points="${x},${tip} ${x - crownW / 2},${base} ${x + crownW / 2},${base}" fill="${i % 2 ? '#1c3d20' : '#173a1c'}" opacity="${0.75 + Math.random() * 0.2}"/>`;
  }
  treelineLayer.innerHTML = `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${polys}<rect x="0" y="${h - 6}" width="${w}" height="6" fill="#142f18"/></svg>`;
})();

// ---------- SCATTERED TREES ----------
// Positioned with `left` (%, horizontal - safe across aspect ratios) and
// `bottom` (vw, not vh) because the terrain layers above are all sized by
// viewport WIDTH (width:110%, height:auto from their SVG aspect ratio).
// Using a vh-based `top` here used to decouple these trees from the
// mountains on tall/narrow screens - they'd drift into the sky instead of
// sitting on the ground. bottom:Nvw keeps every layer scaling together.
const scatterHost = document.getElementById('treeScatter');
const scatterSpots = [
  { l: 10, b: 14.4, s: 1.15, d: 'far' }, { l: 19, b: 12, s: .8, d: 'far' }, { l: 13, b: 22.8, s: .7, d: 'mid' },
  { l: 26, b: 17.4, s: .55, d: 'mid' }, { l: 33, b: 22.2, s: .45, d: 'far' }, { l: 56, b: 7.2, s: .9, d: 'mid' },
  { l: 44, b: 9, s: .6, d: 'far' }, { l: 70, b: 15, s: .5, d: 'far' }, { l: 4, b: 4.2, s: .65, d: 'mid' },
  { l: 92, b: 12, s: .5, d: 'far' }
];

function pineSVG(scale) {
  const w = 40 * scale,
    h = 64 * scale;
  return `<svg width="${w}" height="${h}" viewBox="0 0 40 64" style="display:block;">
    <rect x="17" y="52" width="6" height="12" fill="url(#gradTrunk)"/>
    <polygon points="20,4 6,30 34,30" fill="url(#gradPineDark)"/>
    <polygon points="20,16 4,40 36,40" fill="url(#gradPineDark)"/>
    <polygon points="20,28 2,52 38,52" fill="url(#gradPineDark)"/>
  </svg>`;
}
scatterSpots.forEach((spot, i) => {
  const el = document.createElement('div');
  el.className = 'scatter-tree';
  el.style.left = spot.l + '%';
  el.style.bottom = spot.b + 'vw';
  el.style.opacity = spot.d === 'far' ? 0.55 : 0.85;
  el.style.zIndex = spot.d === 'far' ? 3 : 6;
  el.style.transform = 'translateX(-50%)';
  el.innerHTML = `<div class="sway-inner" style="animation-delay:-${(i * 0.7)}s;">${pineSVG(spot.s)}</div>`;
  scatterHost.appendChild(el);
});

// ---------- PARTICLES ----------
const zones = [
  { x: .16, y: .66, type: 'firefly', color: '200,255,150' },
  { x: .62, y: .55, type: 'ember', color: '255,150,60' },
  { x: .06, y: .83, type: 'mist', color: '140,255,170' },
  { x: .48, y: .78, type: 'smoke', color: '210,205,195' },
];

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth;
  canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

let particles = [];

function spawnFor(zone) {
  const cx = zone.x * window.innerWidth,
    cy = zone.y * window.innerHeight;
  particles.push({
    x: cx + (Math.random() - 0.5) * 140,
    y: cy + (Math.random() - 0.5) * 100,
    vx: (Math.random() - 0.5) * (zone.type === 'mist' ? 0.15 : 0.3),
    vy: zone.type === 'ember' || zone.type === 'smoke' ? -0.25 - Math.random() * 0.3 : (Math.random() - 0.5) * 0.25,
    life: 0,
    maxLife: 200 + Math.random() * 300,
    r: zone.type === 'mist' ? 10 + Math.random() * 10 : (zone.type === 'smoke' ? 2 + Math.random() * 2 : 1.5 + Math.random() * 1.8),
    color: zone.color,
    type: zone.type,
    phase: Math.random() * Math.PI * 2
  });
}
setInterval(() => { zones.forEach(z => { if (Math.random() < 0.9) spawnFor(z); }); }, 220);
setInterval(() => {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: window.innerHeight * 0.9 + Math.random() * window.innerHeight * 0.1,
    vx: (Math.random() - 0.5) * 0.1,
    vy: -0.05 - Math.random() * 0.1,
    life: 0,
    maxLife: 400 + Math.random() * 200,
    r: 1 + Math.random(),
    color: '255,255,255',
    type: 'dust',
    phase: Math.random() * Math.PI * 2
  });
}, 600);

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.life++;
    p.phase += 0.02;
    p.x += p.vx + Math.sin(p.phase) * 0.15;
    p.y += p.vy;
    const lifeRatio = p.life / p.maxLife;
    const alpha = p.type === 'mist' ? 0.10 * (1 - lifeRatio) : (p.type === 'smoke' ? 0.22 * (1 - lifeRatio) : 0.9 * Math.sin(Math.PI * lifeRatio));
    ctx.beginPath();
    if (p.type === 'firefly') {
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${p.color},0.9)`;
      ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
      ctx.arc(p.x, p.y, p.r, 0, 7);
    } else if (p.type === 'ember') {
      ctx.shadowBlur = 6;
      ctx.shadowColor = `rgba(${p.color},0.8)`;
      ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
      ctx.arc(p.x, p.y, p.r, 0, 7);
    } else if (p.type === 'mist' || p.type === 'smoke') {
      ctx.shadowBlur = 0;
      ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
      ctx.arc(p.x, p.y, p.r, 0, 7);
    } else {
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'rgba(255,255,255,.5)';
      ctx.fillStyle = `rgba(${p.color},${Math.max(alpha * 0.6, 0)})`;
      ctx.arc(p.x, p.y, p.r, 0, 7);
    }
    ctx.fill();
  });
  particles = particles.filter(p => p.life < p.maxLife);
  requestAnimationFrame(tick);
}
tick();

// ---------- PROGRESS DOTS ----------
const visited = new Set();
const hudProgress = document.getElementById('hudProgress');
const order = ['forest', 'mountain', 'castle', 'village', 'lighthouse', 'swamp', 'siteseeing'];
order.forEach(id => {
  const dot = document.createElement('i');
  dot.dataset.id = id;
  hudProgress.appendChild(dot);
});

function refreshProgress() {
  hudProgress.querySelectorAll('i').forEach(d => { d.classList.toggle('filled', visited.has(d.dataset.id)); });
}

// ---------- BURST ----------
const burstCanvas = document.getElementById('burst');
const bctx = burstCanvas.getContext('2d');

function resizeBurst() { burstCanvas.width = window.innerWidth;
  burstCanvas.height = window.innerHeight; }
resizeBurst();
window.addEventListener('resize', resizeBurst);

function fireBurst(x, y, colorRgb) {
  const bits = [];
  const n = reduceMotion ? 0 : 30;
  for (let i = 0; i < n; i++) {
    const ang = Math.random() * Math.PI * 2,
      spd = 1 + Math.random() * 3.8;
    bits.push({ x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd, life: 0, maxLife: 40 + Math.random() * 30, r: 1 + Math.random() * 2.4 });
  }

  function step() {
    bctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    let alive = false;
    bits.forEach(b => {
      if (b.life >= b.maxLife) return;
      alive = true;
      b.life++;
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.03;
      b.vx *= 0.985;
      b.vy *= 0.985;
      const a = 1 - (b.life / b.maxLife);
      bctx.beginPath();
      bctx.fillStyle = `rgba(${colorRgb},${a})`;
      bctx.shadowBlur = 6;
      bctx.shadowColor = `rgba(${colorRgb},.8)`;
      bctx.arc(b.x, b.y, b.r, 0, 7);
      bctx.fill();
    });
    if (alive) requestAnimationFrame(step);
    else bctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
  }
  step();
}

function hexToRgb(hex) {
  const v = hex.replace('#', '');
  const n = parseInt(v.length === 3 ? v.split('').map(c => c + c).join('') : v, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

// ---------- TRAVEL ----------
const world = document.getElementById('world');
const overlay = document.getElementById('transitionOverlay');
const panel = document.getElementById('destPanel');
const destName = document.getElementById('destName');
const destDesc = document.getElementById('destDesc');
const destIcon = document.getElementById('destIcon');
const returnBtn = document.getElementById('returnBtn');
let traveling = false;

function travelTo(m) {
  if (traveling) return;
  traveling = true;
  const rect = m.getBoundingClientRect();
  const ox = rect.left + rect.width / 2,
    oy = rect.top + rect.height / 2;
  const tint = m.dataset.tint || '#111';
  overlay.style.setProperty('--ox', ox + 'px');
  overlay.style.setProperty('--oy', oy + 'px');
  overlay.style.setProperty('--tint', tint);

  fireBurst(ox, oy, hexToRgb(m.dataset.color || '#ffffff'));

  const scaleX = (ox / window.innerWidth - 0.5) * -0.6;
  const scaleY = (oy / window.innerHeight - 0.5) * -0.6;
  world.classList.add('zooming');
  world.style.transform = `scale(2.4) translate(${scaleX * 60}px, ${scaleY * 60}px)`;
  world.style.filter = 'brightness(1.6)';

  requestAnimationFrame(() => { overlay.classList.add('wipe'); });

  const id = m.dataset.id;
  const info = BIOME_INFO[id] || {};
  setTimeout(() => {
    if (id === 'castle') {
      panel.classList.add('castle-mode');
      panel.classList.remove('peak-mode');
      panel.classList.remove('village-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('siteseeing-mode');
      panel.classList.remove('lighthouse-mode');
      panel.classList.remove('swamp-mode');
      panel.classList.add('show');
      visited.add(id);
      refreshProgress();
      initCastle();
    } else if (id === 'mountain') {
      panel.classList.add('peak-mode');
      panel.classList.remove('castle-mode');
      panel.classList.remove('village-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('siteseeing-mode');
      panel.classList.remove('lighthouse-mode');
      panel.classList.remove('swamp-mode');
      panel.classList.add('show');
      visited.add(id);
      refreshProgress();
    } else if (id === 'village') {
      panel.classList.add('village-mode');
      panel.classList.remove('castle-mode');
      panel.classList.remove('peak-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('siteseeing-mode');
      panel.classList.remove('lighthouse-mode');
      panel.classList.remove('swamp-mode');
      panel.classList.add('show');
      visited.add(id);
      refreshProgress();
      initVillage();
    } else if (id === 'forest') {
      panel.classList.remove('castle-mode');
      panel.classList.remove('peak-mode');
      panel.classList.remove('village-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('siteseeing-mode');
      panel.classList.remove('lighthouse-mode');
      panel.classList.remove('swamp-mode');
      visited.add(id);
      refreshProgress();
      openForestJournal();
    } else if (id === 'siteseeing') {
      panel.classList.add('siteseeing-mode');
      panel.classList.remove('castle-mode');
      panel.classList.remove('peak-mode');
      panel.classList.remove('village-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('lighthouse-mode');
      panel.classList.remove('swamp-mode');
      panel.classList.add('show');
      visited.add(id);
      refreshProgress();
      initSiteSeeing();
      if (window.__approachSiteSeeing) window.__approachSiteSeeing();
    } else if (id === 'lighthouse') {
      panel.classList.add('lighthouse-mode');
      panel.classList.remove('castle-mode');
      panel.classList.remove('peak-mode');
      panel.classList.remove('village-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('siteseeing-mode');
      panel.classList.remove('swamp-mode');
      panel.classList.add('show');
      visited.add(id);
      refreshProgress();
      if (window.initLighthouse) window.initLighthouse();
    } else if (id === 'swamp') {
      panel.classList.add('swamp-mode');
      panel.classList.remove('castle-mode');
      panel.classList.remove('peak-mode');
      panel.classList.remove('village-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('siteseeing-mode');
      panel.classList.remove('lighthouse-mode');
      panel.classList.add('show');
      visited.add(id);
      refreshProgress();
      if (window.initGlitchmire) window.initGlitchmire();
    } else {
      panel.classList.remove('castle-mode');
      panel.classList.remove('peak-mode');
      panel.classList.remove('village-mode');
      panel.classList.remove('forest-mode');
      panel.classList.remove('siteseeing-mode');
      panel.classList.remove('lighthouse-mode');
      panel.classList.remove('swamp-mode');
      destName.textContent = m.dataset.name;
      destDesc.textContent = info.desc || destDesc.textContent;
      destIcon.textContent = info.icon || '🚧';
      panel.classList.add('show');
      visited.add(id);
      refreshProgress();
    }
    setRoute(id);
  }, 780);
}

// ---------- URL ROUTER ----------
// Gives every biome (and, for Castle/Village, every individual game or
// devlog inside it) a real, shareable, bookmarkable URL - e.g.
// #castle/ricochet or #village/adaptivefitness - without turning any of
// this into separate page loads. travelTo()'s animated entrance and
// closeDest()'s single shared exit point already cover every way in or
// out of a scene, so the router only needs to hook into those two spots
// plus the two places (selectGame, openDevlog) where the *item* within a
// biome can change without a fresh travelTo() call.
function setRoute(biome, item) {
  const hash = '#' + biome + (item ? '/' + item : '');
  if (location.hash !== hash) {
    history.pushState({ biome, item: item || null }, '', hash);
  }
}
function clearRoute() {
  if (location.hash) {
    history.pushState({}, '', location.pathname + location.search);
  }
}
function parseRoute() {
  const h = location.hash.replace(/^#/, '');
  if (!h) return null;
  const [biome, item] = h.split('/');
  return { biome, item: item || null };
}
window.__setRoute = setRoute;

// Instant version of travelTo()'s scene-opening branch, used for deep
// links and browser back/forward - re-running the full zoom/wipe/particle
// animation on every back-button tap would feel sluggish rather than fun.
function openRouteDirect(id, item) {
  const marker = document.querySelector('.biome-marker[data-id="' + id + '"]');
  if (!marker) return false;
  if (id === 'castle' && item) window.__pendingCastleGame = item;
  if (id === 'village' && item) window.__pendingVillageHouse = item;

  const info = BIOME_INFO[id] || {};
  panel.classList.remove('castle-mode', 'peak-mode', 'village-mode', 'forest-mode', 'siteseeing-mode', 'lighthouse-mode', 'swamp-mode');
  if (id === 'castle') {
    panel.classList.add('castle-mode', 'show');
    visited.add(id); refreshProgress(); initCastle();
  } else if (id === 'mountain') {
    panel.classList.add('peak-mode', 'show');
    visited.add(id); refreshProgress();
  } else if (id === 'village') {
    panel.classList.add('village-mode', 'show');
    visited.add(id); refreshProgress(); initVillage();
  } else if (id === 'forest') {
    visited.add(id); refreshProgress(); openForestJournal();
  } else if (id === 'siteseeing') {
    panel.classList.add('siteseeing-mode', 'show');
    visited.add(id); refreshProgress(); initSiteSeeing();
    if (window.__approachSiteSeeing) window.__approachSiteSeeing();
  } else if (id === 'lighthouse') {
    panel.classList.add('lighthouse-mode', 'show');
    visited.add(id); refreshProgress();
    if (window.initLighthouse) window.initLighthouse();
  } else if (id === 'swamp') {
    panel.classList.add('swamp-mode', 'show');
    visited.add(id); refreshProgress();
    if (window.initGlitchmire) window.initGlitchmire();
  } else {
    destName.textContent = marker.dataset.name;
    destDesc.textContent = info.desc || destDesc.textContent;
    destIcon.textContent = info.icon || '🚧';
    panel.classList.add('show');
    visited.add(id); refreshProgress();
  }
  traveling = false;
  return true;
}

window.addEventListener('popstate', () => {
  const route = parseRoute();
  if (!route) {
    if (panel.classList.contains('show') && window.closeDest) window.closeDest();
  } else {
    openRouteDirect(route.biome, route.item);
  }
});

// Deep-link entry: if the page loaded with a hash already in the address
// bar (someone followed a shared link), open straight to it - no
// animation, since there's no marker click to animate from.
(function handleInitialRoute() {
  const route = parseRoute();
  if (route) openRouteDirect(route.biome, route.item);
})();


// The journal's own script is fully self-contained (its own IIFE) and
// exposes window.initForest for the first build (creates the page spreads,
// attaches nextBtn/prevBtn/etc. listeners) plus window.__forestSetRicochetHandler
// for wiring the cross-biome link. window.initForest is NOT idempotent -
// calling it twice would rebuild spreads and double-attach listeners - so
// this guard ensures it only ever runs once; revisits just re-show the
// scene in whatever state it was left in, same as opening a real notebook
// back to wherever your bookmark is.
let forestJournalInitialized = false;
function openForestJournal(){
  if (!forestJournalInitialized) {
    forestJournalInitialized = true;
    if (window.initForest) window.initForest();
  } else {
    const fs = document.getElementById('forestScene');
    if (fs) {
      fs.style.display = 'flex';
      requestAnimationFrame(() => {
        fs.classList.add('visible');
        fs.style.opacity = '1';
      });
    }
  }
}
if (window.__forestSetRicochetHandler) {
  window.__forestSetRicochetHandler(() => {
    const targetMarker = document.querySelector('.biome-marker[data-id="castle"]');
    if (!targetMarker) return;
    // closeDest() resets the shared `traveling` flag and hides the forest
    // scene. Without this, travelTo()'s own `if (traveling) return;` guard
    // silently no-ops here, since `traveling` was set true when the Forest
    // was first opened and never got reset while the journal stayed open.
    closeDest();
    setTimeout(() => {
      travelTo(targetMarker);
      const trySelect = (attempts) => {
        const entry = document.querySelector('.game-entry[data-game="ricochet"]');
        if (entry) { entry.click(); }
        else if (attempts > 0) { setTimeout(() => trySelect(attempts - 1), 150); }
      };
      setTimeout(() => trySelect(10), 900);
    }, 550);
  });
}const markers = document.querySelectorAll('.biome-marker');
markers.forEach(m => {
  m.addEventListener('click', () => travelTo(m));
  m.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault();
      travelTo(m); }
  });
  // hover/focus tooltip - short blurb pulled from BIOME_INFO so the person
  // knows what's behind a marker before committing to the travel animation
  const info = BIOME_INFO[m.dataset.id];
  if (info && info.desc) {
    const tip = document.createElement('div');
    tip.className = 'biome-tooltip';
    tip.textContent = info.desc;
    if (m.dataset.color) tip.style.setProperty('--tip-accent', m.dataset.color);
    m.appendChild(tip);
  }
});

// ---------- COMPASS: quick-travel menu ----------
// Was purely decorative before (aria-hidden, idle needle drift only) - now
// doubles as a fast-travel shortcut so a landmark on the far side of the
// map is never more than two clicks away.
const compassBtn = document.getElementById('compassBtn');
const compassMenu = document.getElementById('compassMenu');
if (compassBtn && compassMenu) {
  markers.forEach(m => {
    const info = BIOME_INFO[m.dataset.id] || {};
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'compass-menu-item';
    item.setAttribute('role', 'menuitem');
    item.innerHTML = `<span class="compass-menu-icon">${info.icon || '•'}</span><span>${m.dataset.name}</span><span class="compass-menu-dot"></span>`;
    item.addEventListener('click', () => { closeCompassMenu(); travelTo(m); });
    compassMenu.appendChild(item);
  });

  function openCompassMenu(){
    compassMenu.classList.add('open');
    compassMenu.setAttribute('aria-hidden', 'false');
    compassBtn.setAttribute('aria-expanded', 'true');
    compassMenu.querySelectorAll('.compass-menu-item').forEach((el, i) => {
      el.classList.toggle('visited', visited.has(markers[i].dataset.id));
    });
  }
  function closeCompassMenu(){
    compassMenu.classList.remove('open');
    compassMenu.setAttribute('aria-hidden', 'true');
    compassBtn.setAttribute('aria-expanded', 'false');
  }
  compassBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    compassMenu.classList.contains('open') ? closeCompassMenu() : openCompassMenu();
  });
  document.addEventListener('click', (e) => {
    if (compassMenu.classList.contains('open') && !compassMenu.contains(e.target) && e.target !== compassBtn) closeCompassMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && compassMenu.classList.contains('open')) closeCompassMenu();
  });
}

// Sticky mobile Contact CTA - jumps straight to Farpoint Lighthouse (the
// contact biome) without requiring the visitor to find and tap its marker
// on the map first. CSS hides this on wider/desktop viewports.
const stickyContactCta = document.getElementById('stickyContactCta');
if (stickyContactCta) {
  const lighthouseMarker = document.querySelector('.biome-marker[data-id="lighthouse"]');
  if (lighthouseMarker) {
    stickyContactCta.addEventListener('click', () => travelTo(lighthouseMarker));
  }
}

// Featured Work strip - lets an impatient visitor see a few highlights and
// jump straight into a specific game/project without first finding and
// clicking the right landmark, then finding the right item inside it.
// Uses a "pending" flag that each biome's init function checks once its
// scene has loaded (see initCastle/initVillage), since travelTo()'s own
// entrance animation needs to finish first.
const castleMarker = document.querySelector('.biome-marker[data-id="castle"]');
const villageMarker = document.querySelector('.biome-marker[data-id="village"]');

const featuredDino = document.getElementById('featuredDino');
if (featuredDino && castleMarker) {
  featuredDino.addEventListener('click', () => {
    window.__pendingCastleGame = 'dinowifi';
    travelTo(castleMarker);
  });
}

const featuredRicochet = document.getElementById('featuredRicochet');
if (featuredRicochet && castleMarker) {
  featuredRicochet.addEventListener('click', () => {
    window.__pendingCastleGame = 'ricochet';
    travelTo(castleMarker);
  });
}

const featuredFitness = document.getElementById('featuredFitness');
if (featuredFitness && villageMarker) {
  featuredFitness.addEventListener('click', () => {
    window.__pendingVillageHouse = 'adaptivefitness';
    travelTo(villageMarker);
  });
}
// Resume card is a plain download link - no JS needed.

// Marker entrance: fade + rise in, staggered per-biome using each marker's
// existing inline `animation-delay` value (authored in the HTML, e.g. .05s,
// .15s, .25s...) so the original stagger timing is preserved exactly.
// Deliberately JS-driven (inline style set, then transitioned, then fully
// cleared via removeProperty) rather than a CSS `animation` with a fill
// mode - a fill-mode animation was the earlier bug here: once finished,
// it permanently owned `transform`/`opacity` and blocked `:hover` from ever
// applying its own transform. Once the inline styles are cleared below, the
// element falls back to plain stylesheet rules, where :hover works normally.
markers.forEach(m => {
  const delaySec = parseFloat(m.style.animationDelay) || 0;
  const delayMs = delaySec * 1000;
  if (reduceMotion) {
    return; // base stylesheet already renders it fully visible at rest
  }
  m.style.opacity = '0';
  m.style.transform = 'translate(-50%,-40%) scale(.85)';
  setTimeout(() => {
    m.style.transition = 'opacity .7s cubic-bezier(.2,.8,.3,1.2), transform .7s cubic-bezier(.2,.8,.3,1.2)';
    m.style.opacity = '1';
    m.style.transform = 'translate(-50%,-50%) scale(1)';
  }, delayMs);
  setTimeout(() => {
    m.style.removeProperty('opacity');
    m.style.removeProperty('transform');
    m.style.removeProperty('transition');
  }, delayMs + 750);
});

function closeDest() {
  panel.classList.remove('show');
  panel.classList.remove('castle-mode');
  panel.classList.remove('peak-mode');
  panel.classList.remove('village-mode');
  panel.classList.remove('forest-mode');
  panel.classList.remove('siteseeing-mode');
  panel.classList.remove('lighthouse-mode');
      panel.classList.remove('swamp-mode');
  if (window.__closeVillageDevlog) { window.__closeVillageDevlog(); }
  else { document.getElementById('devlogOverlay').classList.remove('show'); }
  const forestScene = document.getElementById('forestScene');
  if (forestScene && forestScene.classList.contains('visible')) {
    forestScene.classList.remove('visible');
    forestScene.style.opacity = '0';
    setTimeout(() => { forestScene.style.display = 'none'; }, 500);
  }
  if (window.__resetSiteSeeing) window.__resetSiteSeeing();
  if (window.__resetLighthouse) window.__resetLighthouse();
  if (window.__resetGlitchmire) window.__resetGlitchmire();
  overlay.classList.remove('wipe');
  overlay.style.clipPath = '';
  world.classList.remove('zooming');
  world.style.transform = 'scale(1) translate(0,0)';
  world.style.filter = 'brightness(1)';
  traveling = false;
  clearRoute();
}
window.closeDest = closeDest;
returnBtn.addEventListener('click', closeDest);
document.getElementById('castleReturnBtn').addEventListener('click', closeDest);
document.getElementById('ssReturnBtn').addEventListener('click', closeDest);
document.getElementById('lhReturnBtn').addEventListener('click', closeDest);
document.getElementById('gmReturnBtn').addEventListener('click', closeDest);