// ---------- SITE SEEING: THE VIEWFINDER ----------
// A single scenic-overlook viewfinder the visitor dials through, rather
// than a row of clickable stalls (that pattern already belongs to Devlog
// Village). One device, one lens, three "sights." Idle state shows the
// real horizon - not empty, not a placeholder - and the first dial turn
// does the same iris-close/open transition every subsequent turn reuses.

const SS_IMG = {
  sol_home: "assets/images/screenshots/sol_home.jpg",
  sol_sneakers: "assets/images/screenshots/sol_sneakers.jpg",
  sol_heels: "assets/images/screenshots/sol_heels.jpg",
  sol_cart: "assets/images/screenshots/sol_cart.jpg",
};

const SITESEEING_DATA = {
  morse: {
    kind:'live',
    title:'Morse Station',
    sub:'Vanilla JS \u00b7 Web Audio API',
    src: "games/morse-station.html",
    tags:['Vanilla JS','Web Audio API','Real-time I/O','Custom UI State'],
  },
  sortviz: {
    kind:'live',
    title:'Sorting Visualizer',
    sub:'Vanilla JS \u00b7 Algorithms',
    src: "games/sorting-visualizer.html",
    tags:['Vanilla JS','Algorithms','Web Audio API'],
  },
  soletude: {
    kind:'gallery',
    title:'Soletude',
    sub:'HTML \u00b7 CSS \u00b7 No JS',
    images:['sol_home','sol_sneakers','sol_heels','sol_cart'],
    tags:['HTML','CSS','No JS'],
  }
};
const SITESEEING_ORDER = ['morse','sortviz','soletude'];

let siteseeingInitialized = false;
let ssIndex = -1;              // -1 = idle (real horizon), 0..2 = a project
let ssGalleryIndex = 0;        // which Soletude screenshot is showing
let ssTransitioning = false;
let ssExpanded = false;
let ssApproached = false;      // coin-drop flavor plays once

function initSiteSeeing(){
  if (siteseeingInitialized) return;
  siteseeingInitialized = true;

  document.getElementById('ssVfPrev').addEventListener('click', () => ssTurnDial(-1));
  document.getElementById('ssVfNext').addEventListener('click', () => ssTurnDial(1));
  document.getElementById('ssVfGalleryNext').addEventListener('click', (e) => {
    e.stopPropagation();
    ssAdvanceGallery();
  });
  document.getElementById('ssVfEnter').addEventListener('click', ssExpandEyepiece);
  document.getElementById('ssExpandClose').addEventListener('click', ssCollapseEyepiece);

  const overlook = document.querySelector('.ss-overlook');
  if (overlook) {
    overlook.addEventListener('pointermove', (e) => {
      const r = overlook.getBoundingClientRect();
      ssParallaxTX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ssParallaxTY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    });
    overlook.addEventListener('pointerleave', () => { ssParallaxTX = 0; ssParallaxTY = 0; });
  }

  ssShowIdle();
}

// Called every time the biome is opened (idempotent-safe, unlike initSiteSeeing).
function ssOnApproach(){
  ssStartAmbient();
  if (ssApproached) return;
  ssApproached = true;
  const coin = document.getElementById('ssVfCoin');
  coin.classList.add('ss-vf-coin-drop');
  setTimeout(() => coin.classList.remove('ss-vf-coin-drop'), 950);
}

// ---------- AMBIENT LOOP ----------
// Mirrors Castle's startCastleAmbient()/castleAmbientRunning pattern: a
// single rAF tick drives the dust motes (same spawn-and-recycle approach as
// Castle's embers), while birds/balloon/ephemera spawn on staggered random
// intervals so the sky never feels mechanical. Clouds are built once and
// then loop purely via CSS (like the Overworld's #cloudLayer).
let ssAmbientRunning = false;
let ssAmbientStart = 0;
let ssAmbientLastTs = 0;
let ssCloudsBuilt = false;
let ssDustMotes = [];
let ssBirdTimer = null;
let ssBalloonTimer = null;
let ssEphemeraTimer = null;

let ssClouds = [];
const SS_CLOUD_PATH = 'M15,50 C5,50 2,38 12,34 C8,20 28,14 38,24 C42,10 68,8 74,22 C90,16 100,32 90,42 C100,50 92,62 78,58 C74,68 50,70 42,60 C24,66 8,62 15,50 Z';

// Mouse-parallax depth: clouds (closest layer) drift the most, the sun a
// little, and the valley/hills (furthest) barely move at all - that
// differential is what actually reads as depth rather than everything
// just sliding around together.
let ssParallaxTX = 0, ssParallaxTY = 0;
let ssParallaxCX = 0, ssParallaxCY = 0;

function ssBuildClouds(){
  if (ssCloudsBuilt) return;
  ssCloudsBuilt = true;
  const layer = document.getElementById('ssCloudLayer');
  if (!layer) return;

  // Shared gradient defs, injected once, referenced by every cloud instance.
  const defsSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defsSvg.setAttribute('width', '0');
  defsSvg.setAttribute('height', '0');
  defsSvg.style.position = 'absolute';
  defsSvg.innerHTML =
    '<defs>' +
      '<linearGradient id="ssCloudGrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#fff6e6"/>' +
        '<stop offset="55%" stop-color="#ffe3bd"/>' +
        '<stop offset="100%" stop-color="#ffb877"/>' +
      '</linearGradient>' +
      '<linearGradient id="ssCloudGradFar" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#f3d9d0"/>' +
        '<stop offset="100%" stop-color="#d9a89a"/>' +
      '</linearGradient>' +
    '</defs>';
  layer.appendChild(defsSvg);

  // Three depth layers: far (small/pale/slow) through near (big/bright/fast).
  // Speeds are real px/second driven straight off the clock every frame in
  // ssAmbientTick - not a CSS animation - so motion can never silently fail
  // to show regardless of animation timing quirks.
  const layers = PERF_MODE ? [
    { count: 2, size: [50, 78],  top: [6, 20],  speed: [16, 24], far: true  },
    { count: 1, size: [86, 128], top: [14, 34], speed: [30, 44], far: false },
    { count: 1, size: [140, 200],top: [22, 42], speed: [55, 78], far: false },
  ] : [
    { count: 3, size: [50, 78],  top: [6, 20],  speed: [16, 24], far: true  },
    { count: 3, size: [86, 128], top: [14, 34], speed: [30, 44], far: false },
    { count: 3, size: [140, 200],top: [22, 42], speed: [55, 78], far: false },
  ];
  const vw = window.innerWidth || 1200;
  layers.forEach(cfg => {
    for (let i = 0; i < cfg.count; i++) {
      const w = cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]);
      const h = w * 0.58;
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'ss-cloud-svg' + (cfg.far ? ' far' : ''));
      svg.setAttribute('viewBox', '0 0 120 70');
      svg.setAttribute('width', w);
      svg.setAttribute('height', h);
      if (Math.random() < 0.5) svg.style.transform = 'scaleX(-1)';
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', SS_CLOUD_PATH);
      svg.appendChild(path);
      svg.style.opacity = cfg.far ? (0.3 + Math.random() * 0.15) : (0.55 + Math.random() * 0.3);
      layer.appendChild(svg);

      const flipped = svg.style.transform.indexOf('scaleX(-1)') !== -1;
      ssClouds.push({
        el: svg,
        x: Math.random() * (vw + w) - w,
        y: (cfg.top[0] + Math.random() * (cfg.top[1] - cfg.top[0])) / 100,
        w: w, h: h,
        speed: cfg.speed[0] + Math.random() * (cfg.speed[1] - cfg.speed[0]),
        bobPhase: Math.random() * Math.PI * 2
      });
      const last = ssClouds[ssClouds.length - 1];
      svg.style.transform = 'translate(' + last.x.toFixed(1) + 'px,' + (last.y * 400).toFixed(1) + 'px)' +
        (flipped ? ' scaleX(-1)' : '');
    }
  });
}

function ssBirdSVG(){
  return '<svg viewBox="0 0 24 12">' +
    '<g class="wing wing-l"><path d="M12,6 Q6,2 1,5" stroke="rgba(58,30,20,.7)" stroke-width="2.1" fill="none" stroke-linecap="round"/></g>' +
    '<g class="wing wing-r"><path d="M12,6 Q18,2 23,5" stroke="rgba(58,30,20,.7)" stroke-width="2.1" fill="none" stroke-linecap="round"/></g></svg>';
}

function ssSpawnBird(){
  const layer = document.getElementById('ssBirdLayer');
  if (!layer) return;
  const f = document.createElement('div');
  f.className = 'ss-flyer';
  const reverse = Math.random() < 0.4;
  const size = 16 + Math.random() * 9;
  f.style.width = size + 'px';
  f.style.height = (size * 0.5) + 'px';
  f.style.top = (10 + Math.random() * 32) + '%';
  f.style.opacity = 0.55 + Math.random() * 0.3;
  const dur = 14 + Math.random() * 10;
  f.style.animation = (reverse ? 'ssFlyAcrossRev' : 'ssFlyAcross') + ' ' + dur + 's linear forwards';
  f.innerHTML = ssBirdSVG();
  layer.appendChild(f);
  setTimeout(() => f.remove(), dur * 1000 + 400);
}

function ssBalloonSVG(){
  return '<svg viewBox="0 0 40 52">' +
    '<ellipse cx="20" cy="18" rx="16" ry="18" fill="rgba(201,99,63,.55)"/>' +
    '<path d="M12,32 L20,44 L28,32" fill="none" stroke="rgba(58,30,20,.5)" stroke-width="1"/>' +
    '<rect x="15" y="44" width="10" height="6" rx="1.5" fill="rgba(58,30,20,.55)"/></svg>';
}

function ssSpawnBalloon(){
  const layer = document.getElementById('ssBalloonLayer');
  if (!layer) return;
  const b = document.createElement('div');
  b.className = 'ss-balloon';
  const size = 26 + Math.random() * 16;
  b.style.width = size + 'px';
  b.style.height = (size * 1.3) + 'px';
  b.style.top = (14 + Math.random() * 20) + '%';
  const dur = 42 + Math.random() * 20;
  b.style.animation = 'ssBalloonDrift ' + dur + 's linear forwards';
  b.innerHTML = ssBalloonSVG();
  layer.appendChild(b);
  setTimeout(() => b.remove(), dur * 1000 + 400);
}

function ssSpawnEphemera(){
  const layer = document.getElementById('ssEphemeraLayer');
  if (!layer) return;
  const e = document.createElement('div');
  const isCard = Math.random() < 0.5;
  e.className = 'ss-ephemera' + (isCard ? ' postcard' : ' ticket');
  e.style.bottom = (4 + Math.random() * 6) + '%';
  const dur = 6 + Math.random() * 3;
  e.style.animation = 'ssEphemeraTumble ' + dur + 's ease-in forwards';
  layer.appendChild(e);
  setTimeout(() => e.remove(), dur * 1000 + 300);
}

function ssSpawnDust(){
  ssDustMotes.forEach(p => p.el.remove());
  ssDustMotes = [];
  const layer = document.getElementById('ssDustLayer');
  if (!layer) return;
  for (let i = 0; i < (PERF_MODE ? 12 : 24); i++) {
    const el = document.createElement('div');
    el.className = 'ss-dust';
    const size = 3 + Math.random() * 4;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    layer.appendChild(el);
    ssDustMotes.push({
      el: el,
      x: Math.random() * 100,
      bottom: Math.random() * 100,
      speed: 2 + Math.random() * 3,
      drift: Math.random() * 40 - 20,
      sway: Math.random() * Math.PI * 2
    });
  }
}

function ssAmbientTick(ts){
  if (!ssAmbientRunning) return;
  if (!ssAmbientStart) ssAmbientStart = ts;
  if (!ssAmbientLastTs) ssAmbientLastTs = ts;
  const t = (ts - ssAmbientStart) / 1000;
  const dt = Math.min((ts - ssAmbientLastTs) / 1000, 1); // clamp so a long tab-away gap can't jump clouds wildly
  ssAmbientLastTs = ts;

  const vw = window.innerWidth || 1200;
  ssClouds.forEach(c => {
    c.x += c.speed * dt;
    if (c.x > vw + c.w) c.x = -c.w * 1.2;
    const bob = Math.sin(t * 0.35 + c.bobPhase) * 6;
    const flip = c.el.style.transform.indexOf('scaleX(-1)') !== -1;
    c.el.style.transform = 'translate(' + c.x.toFixed(1) + 'px,' +
      (c.y * (document.getElementById('ssCloudLayer').clientHeight || 400) + bob).toFixed(1) + 'px)' +
      (flip ? ' scaleX(-1)' : '');
  });

  ssDustMotes.forEach(p => {
    p.bottom += p.speed * (1 / 60);
    if (p.bottom > 100) { p.bottom = -Math.random() * 10; p.x = Math.random() * 100; }
    let op;
    if (p.bottom < 6) op = p.bottom / 6;
    else if (p.bottom > 82) op = Math.max(0, (100 - p.bottom) / 18);
    else op = 1;
    op = Math.max(0, Math.min(1, op)) * 0.85;
    const xOff = Math.sin(t * 0.6 + p.sway) * 14 + (p.bottom / 100) * p.drift;
    p.el.style.left = p.x + '%';
    p.el.style.bottom = p.bottom + '%';
    p.el.style.opacity = op;
    p.el.style.transform = 'translateX(' + xOff.toFixed(1) + 'px)';
  });

  ssParallaxCX += (ssParallaxTX - ssParallaxCX) * 0.08;
  ssParallaxCY += (ssParallaxTY - ssParallaxCY) * 0.08;
  const cloudLayer = document.getElementById('ssCloudLayer');
  const valley = document.querySelector('.ss-valley');
  const sun = document.querySelector('.ss-sun');
  if (cloudLayer) cloudLayer.style.setProperty('--ss-px', (ssParallaxCX * 22).toFixed(1) + 'px');
  if (cloudLayer) cloudLayer.style.setProperty('--ss-py', (ssParallaxCY * 12).toFixed(1) + 'px');
  if (sun) sun.style.transform = 'translate(-50%,-50%) translate(' + (ssParallaxCX * -10).toFixed(1) + 'px,' + (ssParallaxCY * -6).toFixed(1) + 'px)';
  if (valley) valley.style.transform = 'translate(' + (ssParallaxCX * -4).toFixed(1) + 'px,0)';

  requestAnimationFrame(ssAmbientTick);
}

function ssStartAmbient(){
  if (ssAmbientRunning) return;
  ssAmbientRunning = true;
  ssAmbientStart = 0;
  ssAmbientLastTs = 0;
  ssBuildClouds();
  ssSpawnDust();
  requestAnimationFrame(ssAmbientTick);

  // Front-load a small burst so the overlook feels alive within the
  // first couple seconds rather than depending on the recurring rolls
  // below, which is all a quick glance would previously have caught.
  setTimeout(ssSpawnBird, 500);
  setTimeout(ssSpawnBird, 1400);
  setTimeout(ssSpawnBalloon, 1800);
  setTimeout(ssSpawnEphemera, 2600);

  ssBirdTimer = setInterval(() => { if (Math.random() < 0.7) ssSpawnBird(); }, PERF_MODE ? 5200 : 3200);
  ssBalloonTimer = setInterval(() => { if (Math.random() < 0.5) ssSpawnBalloon(); }, PERF_MODE ? 20000 : 14000);
  ssEphemeraTimer = setInterval(() => { if (Math.random() < 0.55) ssSpawnEphemera(); }, PERF_MODE ? 13000 : 8000);
}

function ssStopAmbient(){
  ssAmbientRunning = false;
  ssAmbientStart = 0;
  ssAmbientLastTs = 0;
  if (ssBirdTimer) { clearInterval(ssBirdTimer); ssBirdTimer = null; }
  if (ssBalloonTimer) { clearInterval(ssBalloonTimer); ssBalloonTimer = null; }
  if (ssEphemeraTimer) { clearInterval(ssEphemeraTimer); ssEphemeraTimer = null; }
}

function ssShowIdle(){
  ssIndex = -1;
  document.querySelectorAll('.ss-vf-view').forEach(v => v.classList.remove('ss-vf-active'));
  document.getElementById('ssVfIdle').classList.add('ss-vf-active');
  document.getElementById('ssVfPlaque').textContent = SITESEEING_ORDER.length + ' sights to see';
  document.getElementById('ssVfCaptionTitle').textContent = '';
  document.getElementById('ssVfCaptionSub').textContent = '';
  document.getElementById('ssVfCaptionTags').innerHTML = '';
  document.getElementById('ssVfEnter').style.display = 'none';
  ssStopIframe();
}

function ssStopIframe(){
  const frame = document.getElementById('ssVfIframe');
  if (frame.src && frame.src !== 'about:blank') frame.src = 'about:blank';
}

function ssTurnDial(dir){
  if (ssTransitioning) return;
  const len = SITESEEING_ORDER.length;
  let next = ssIndex + dir;
  if (next < -1) next = len - 1;
  if (next >= len) next = -1;
  ssGoTo(next);
}

function ssGoTo(index){
  if (ssTransitioning || index === ssIndex) return;
  ssTransitioning = true;
  const iris = document.getElementById('ssVfIris');
  iris.classList.add('ss-vf-iris-closed');

  setTimeout(() => {
    ssApplyIndex(index);
    // re-open the iris on the next frame so the closed state actually paints first
    requestAnimationFrame(() => {
      iris.classList.remove('ss-vf-iris-closed');
    });
    setTimeout(() => { ssTransitioning = false; }, 340);
  }, 340);
}

function ssApplyIndex(index){
  ssStopIframe();
  ssIndex = index;

  if (index === -1) {
    document.querySelectorAll('.ss-vf-view').forEach(v => v.classList.remove('ss-vf-active'));
    document.getElementById('ssVfIdle').classList.add('ss-vf-active');
    document.getElementById('ssVfPlaque').textContent = SITESEEING_ORDER.length + ' sights to see';
    document.getElementById('ssVfCaptionTitle').textContent = '';
    document.getElementById('ssVfCaptionSub').textContent = '';
    document.getElementById('ssVfCaptionTags').innerHTML = '';
    document.getElementById('ssVfEnter').style.display = 'none';
    return;
  }

  const key = SITESEEING_ORDER[index];
  const s = SITESEEING_DATA[key];

  document.querySelectorAll('.ss-vf-view').forEach(v => v.classList.remove('ss-vf-active'));
  document.getElementById('ssVfPlaque').textContent = 'Sight ' + (index + 1) + ' of ' + SITESEEING_ORDER.length;
  document.getElementById('ssVfCaptionTitle').textContent = s.title;
  document.getElementById('ssVfCaptionSub').textContent = s.sub;
  document.getElementById('ssVfCaptionTags').innerHTML =
    s.tags.map(t => '<span>' + t + '</span>').join('');
  document.getElementById('ssVfEnter').style.display = '';

  if (s.kind === 'live') {
    const frame = document.getElementById('ssVfIframe');
    frame.src = s.src;
    frame.classList.add('ss-vf-active');
  } else {
    ssGalleryIndex = 0;
    ssRenderGalleryImage();
    document.getElementById('ssVfGallery').classList.add('ss-vf-active');
  }
}

function ssRenderGalleryImage(){
  const s = SITESEEING_DATA['soletude'];
  const key = s.images[ssGalleryIndex];
  document.getElementById('ssVfGalleryImg').src = SS_IMG[key];
  document.getElementById('ssVfGalleryImg').alt = s.title + ' screenshot';
}

function ssAdvanceGallery(){
  const s = SITESEEING_DATA['soletude'];
  ssGalleryIndex = (ssGalleryIndex + 1) % s.images.length;
  ssRenderGalleryImage();
}

// ---------- STEP UP TO THE EYEPIECE (expand) ----------
function ssExpandEyepiece(){
  if (ssIndex === -1 || ssExpanded) return;
  ssExpanded = true;
  const key = SITESEEING_ORDER[ssIndex];
  const s = SITESEEING_DATA[key];
  const expandFrame = document.getElementById('ssExpandFrame');

  const activeEl = s.kind === 'live'
    ? document.getElementById('ssVfIframe')
    : document.getElementById('ssVfGallery');

  expandFrame.appendChild(activeEl);
  document.getElementById('ssExpandOverlay').classList.add('show');
}

function ssCollapseEyepiece(){
  if (!ssExpanded) return;
  ssExpanded = false;
  const lens = document.getElementById('ssVfLens');
  const iris = document.getElementById('ssVfIris');
  const iframe = document.getElementById('ssVfIframe');
  const gallery = document.getElementById('ssVfGallery');

  // Return whichever element was moved out back to its home inside the lens,
  // right before the iris layer so stacking order stays correct.
  lens.insertBefore(iframe, iris);
  lens.insertBefore(gallery, iris);

  document.getElementById('ssExpandOverlay').classList.remove('show');
}

// Called by main.js's closeDest() when leaving the biome entirely.
function ssReset(){
  ssStopAmbient();
  if (ssExpanded) ssCollapseEyepiece();
  ssStopIframe();
  ssIndex = -1;
  ssTransitioning = false;
  const iris = document.getElementById('ssVfIris');
  if (iris) iris.classList.remove('ss-vf-iris-closed');
  ssShowIdle();
}
window.__resetSiteSeeing = ssReset;
window.__approachSiteSeeing = ssOnApproach;
