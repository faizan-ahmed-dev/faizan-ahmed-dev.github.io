// ---------- CASTLE OF GAMES: IMAGE DATA ----------
// Replace these with your actual screenshots
const GAME_IMG = {
  wordoku_1: "assets/images/screenshots/wordoku_1.jpg",
  wordoku_2: "assets/images/screenshots/wordoku_2.jpg",
  wordoku_3: "assets/images/screenshots/wordoku_3.jpg",
  wordoku_4: "assets/images/screenshots/wordoku_4.jpg",
  levelone_1: "assets/images/screenshots/levelone_1.jpg",
  levelone_2: "assets/images/screenshots/levelone_2.jpg",
  levelone_3: "assets/images/screenshots/levelone_3.jpg",
  levelone_4: "assets/images/screenshots/levelone_4.jpg",
  pewpewjet_1: "assets/images/screenshots/pewpewjet_1.jpg",
  pewpewjet_2: "assets/images/screenshots/pewpewjet_2.jpg",
  pewpewjet_3: "assets/images/screenshots/pewpewjet_3.jpg",
  ricochet_1: "assets/images/screenshots/ricochet_1.jpg",
  ricochet_2: "assets/images/screenshots/ricochet_2.jpg",
  ricochet_3: "assets/images/screenshots/ricochet_3.jpg",
  ricochet_player: "assets/images/screenshots/ricochet_player.png",
  ricochet_enemy1: "assets/images/screenshots/ricochet_enemy1.png",
  ricochet_enemy2: "assets/images/screenshots/ricochet_enemy2.png",
  ricochet_enemy3: "assets/images/screenshots/ricochet_enemy3.png",
  dinowifi_1: "assets/images/screenshots/dinowifi_1.jpg",
  dinowifi_2: "assets/images/screenshots/dinowifi_2.jpg",
  dinowifi_3: "assets/images/screenshots/dinowifi_3.jpg",
};

const VILLAGE_IMG = {
  AdaptiveFitness_2_Login: "assets/images/screenshots/AdaptiveFitness_2_Login.jpg",
  AdaptiveFitness_3_Dashboard: "assets/images/screenshots/AdaptiveFitness_3_Dashboard.jpg",
  AdaptiveFitness_4_Workout: "assets/images/screenshots/AdaptiveFitness_4_Workout.jpg",
  AdaptiveFitness_5_Nutrition: "assets/images/screenshots/AdaptiveFitness_5_Nutrition.jpg",
  AdaptiveFitness_6_Billing: "assets/images/screenshots/AdaptiveFitness_6_Billing.jpg",
  AdaptiveFitness_7_Report: "assets/images/screenshots/AdaptiveFitness_7_Report.jpg",
  AdaptiveFitness_8_StudentPortal: "assets/images/screenshots/AdaptiveFitness_8_StudentPortal.jpg",
  OBE_10_ManageAttendance: "assets/images/screenshots/OBE_10_ManageAttendance.jpg",
  OBE_11_Report: "assets/images/screenshots/OBE_11_Report.jpg",
  OBE_12_DatabaseDesign: "assets/images/screenshots/OBE_12_DatabaseDesign.jpg",
  OBE_1_login: "assets/images/screenshots/OBE_1_login.jpg",
  OBE_2_dashboard: "assets/images/screenshots/OBE_2_dashboard.jpg",
  OBE_3_ManageStudents: "assets/images/screenshots/OBE_3_ManageStudents.jpg",
  OBE_4_ManageCLOs: "assets/images/screenshots/OBE_4_ManageCLOs.jpg",
  OBE_5_ManageRubrics: "assets/images/screenshots/OBE_5_ManageRubrics.jpg",
  OBE_6_ManageRubricLevels: "assets/images/screenshots/OBE_6_ManageRubricLevels.jpg",
  OBE_7_ManageAssessments: "assets/images/screenshots/OBE_7_ManageAssessments.jpg",
  OBE_8_ManageAssessmentComponents: "assets/images/screenshots/OBE_8_ManageAssessmentComponents.jpg",
  OBE_9_MarkEvaluations: "assets/images/screenshots/OBE_9_MarkEvaluations.jpg",
  cppGym_1_welcome: "assets/images/screenshots/cppGym_1_welcome.jpg",
  cppGym_2_login: "assets/images/screenshots/cppGym_2_login.jpg",
  cppGym_3_menu: "assets/images/screenshots/cppGym_3_menu.jpg",
  cppGym_4_addMember: "assets/images/screenshots/cppGym_4_addMember.jpg",
  cppGym_5_viewAllMembers: "assets/images/screenshots/cppGym_5_viewAllMembers.jpg",
  cppGym_6_plan: "assets/images/screenshots/cppGym_6_plan.jpg",
  cppGym_7_calcCalories: "assets/images/screenshots/cppGym_7_calcCalories.jpg",
  csharpgym_1_login: "assets/images/screenshots/csharpgym_1_login.jpg",
  csharpgym_2_dashboard: "assets/images/screenshots/csharpgym_2_dashboard.jpg",
  csharpgym_3_members: "assets/images/screenshots/csharpgym_3_members.jpg",
  csharpgym_4_analytics: "assets/images/screenshots/csharpgym_4_analytics.jpg",
  AdaptiveFitness_1_DatabaseDesign: "assets/images/screenshots/AdaptiveFitness_1_DatabaseDesign.svg",
};

// ---------- GAME DATA ----------
const GAME_DATA = {
  levelone: {
    num:'01',
    title:'Level One',
    tag:'GODOT · GDSCRIPT · PLATFORMER',
    tagline:'First steps into a real game engine.',
    accent:'var(--lvl1-a)',
    desc:"A small 2D platformer built in Godot while learning the engine through Brackeys\u2019 beginner tutorial series. Working through it end to end is what actually taught the fundamentals underneath every platformer: player movement and physics, animation state, collision handling, and basic level design.",
    meta:[ {label:'Engine', value:'Godot 4'}, {label:'Language', value:'GDScript'}, {label:'Type', value:'2D Platformer'}, {label:'Status', value:'Shipped'} ],
    itchLink:'https://ricocheted-ball.itch.io/level-one',
    linkedinLink:'https://www.linkedin.com/posts/faizan-ahmed-150911386_gamedeveloper-godot-idk-activity-7424701179202301952-yb5w',
    images:['levelone_1','levelone_2','levelone_3','levelone_4'],
    icon:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 34V9"/><path d="M14 9 L28 14 L14 19 Z" fill="currentColor" stroke="none"/><rect x="6" y="34" width="22" height="4" rx="1" fill="currentColor" stroke="none"/></svg>',
    bestiaryLore: {}
  },
  pewpewjet: {
    num:'02',
    title:'Pew Pew Jet',
    tag:'C# · WINFORMS · ARCADE SHOOTER',
    tagline:'Three lives, one sky full of enemies.',
    accent:'var(--ppj-a)',
    desc:'A fast-paced 2D fighter jet shooter built directly in C# WinForms rather than a game engine. Dodge and shoot down waves of enemy planes, survive with three lives, and chase a high score before you run out of sky.',
    meta:[ {label:'Engine', value:'.NET WinForms'}, {label:'Language', value:'C#'}, {label:'Type', value:'Arcade Shooter'}, {label:'Lives', value:'3'} ],
    itchLink:'https://ricocheted-ball.itch.io/pew-pew-jet',
    linkedinLink:'https://www.linkedin.com/posts/faizan-ahmed-150911386_gamedevelopment-csharp-visualstudio-activity-7461687055241314306-0yul',
    images:['pewpewjet_1','pewpewjet_2','pewpewjet_3'],
    icon:'<svg viewBox="0 0 40 40" fill="currentColor" stroke="none"><path d="M20 4 L23 19 L34 25 L34 28 L23 25 L23 31 L27 35 L27 37 L20 35 L13 37 L13 35 L17 31 L17 25 L6 28 L6 25 L17 19 Z"/></svg>',
    bestiaryLore: {}
  },
  ricochet: {
    num:'03',
    title:'Ricochet',
    tag:'C# · WINFORMS · TOP-DOWN ARENA',
    tagline:'Bouncing Bullet Arena.',
    accent:'var(--ric-a)',
    desc:'An armed agent is trapped inside a sealed arena called the Killbox. Every bullet fired, by the player or by an enemy, bounces off walls and surfaces like a billiard ball, reflecting a set number of times before it disappears \u2014 and the player\u2019s own ricochets can hurt them right back. That risk is the whole game: every shot is a question of angle, not just aim.',
    meta:[ {label:'Engine', value:'.NET WinForms'}, {label:'Language', value:'C#'}, {label:'Type', value:'Top-Down Arena'}, {label:'Arena', value:'The Killbox'} ],
    itchLink:'https://ricocheted-ball.itch.io/ricochet',
    linkedinLink:'https://www.linkedin.com/posts/faizan-ahmed-150911386_gamedevelopment-csharp-visualstudio-activity-7468559781398720512-BQx3',
    images:['ricochet_1','ricochet_2','ricochet_3'],
    bestiary:[
      {key:'ricochet_player', label:'Player'},
      {key:'ricochet_enemy1', label:'Bob'},
      {key:'ricochet_enemy2', label:'Jumper'},
      {key:'ricochet_enemy3', label:'Bullseye'}
    ],
    icon:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="6" x2="6" y2="34"/><line x1="34" y1="6" x2="34" y2="34"/><path d="M8 10 L30 18 L10 26 L28 32"/><path d="M22 28 L28 32 L26 25"/></svg>',
    bestiaryLore: {
      'ricochet_player': 'The agent - you. Fast, fragile, and the only one who can turn ricochets against the enemy.',
      'ricochet_enemy1': 'Bob - slow, predictable, but relentless. Their bullets bounce just like yours.',
      'ricochet_enemy2': 'Jumper - sluggish, but their erratic shots fill the arena with chaos.',
      'ricochet_enemy3': 'Bullseye - fast and aggressive. They hunt in patterns that force you to move.'
    }
  },
  wordoku: {
    num:'04',
    title:'Wordoku',
    tag:'C++ · CONSOLE · WORDLE × SUDOKU',
    tagline:'Two logic games, one terminal.',
    accent:'var(--wrd-a)',
    desc:'A menu-driven console application that packs two classic logic games - Wordle and Sudoku - into a single terminal experience. Built to put core programming fundamentals through their paces: loops, arrays, functions, conditionals, and the game-logic that ties them together, all wrapped in a colorized, genuinely usable console interface rather than plain black-and-white text output.',
    meta:[ {label:'Language', value:'C++'}, {label:'Type', value:'Console, Menu-Driven'}, {label:'Games', value:'Wordle + Sudoku'}, {label:'Interface', value:'Colorized Console'} ],
    itchLink:'https://ricocheted-ball.itch.io/wordoku',
    linkedinLink:'https://www.linkedin.com/posts/faizan-ahmed-150911386_gamedevelopment-studentdeveloper-programming-activity-7422981435835375616-MiPi',
    images:['wordoku_1','wordoku_2','wordoku_3','wordoku_4'],
    icon:'<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="5" width="30" height="30" rx="2"/><line x1="15" y1="5" x2="15" y2="35"/><line x1="25" y1="5" x2="25" y2="35"/><line x1="5" y1="15" x2="35" y2="15"/><line x1="5" y1="25" x2="35" y2="25"/><rect x="15" y="15" width="10" height="10" fill="currentColor" stroke="none"/></svg>',
    bestiaryLore: {}
  },
  dinowifi: {
    num:'05',
    title:'404: Dino Not Found',
    tag:'UNITY · C# · SIMULATION',
    tagline:'My first Unity project, built start to finish inside a single game jam.',
    jam:{ event:'Pakistan Game Jam 2026', duration:'87 Hours', status:'Submitted · Won' },
    accent:'#ff8a5c',
    desc:"That dinosaur from the browser game everyone's played while waiting for their Wi-Fi to reconnect? Turns out it wasn't stuck offline by choice - it got a job just to escape that place. You play as the T-Rex, now working as an internet technician, racing to fix people's Wi-Fi before your Offline Meter maxes out. Let it fill, and you're teleported straight back into that cactus-dodging nightmare - three strikes there and you're stuck for good. Built for Pakistan Game Jam 2026 around the theme Dinosaurs, the constraint No Animations (every character and object uses static sprites - all motion comes from position and color changes, never animation clips), and the optional prompt Everyday - an ordinary Wi-Fi repair job, with a very unordinary threat hanging over it.",
    meta:[ {label:'Engine', value:'Unity'}, {label:'Language', value:'C#'}, {label:'Type', value:'Simulation'}, {label:'Jam', value:'Pakistan Game Jam 2026'}, {label:'Duration', value:'87 Hours'}, {label:'Theme', value:'Dinosaurs'} ],
    itchLink:'https://ricocheted-ball.itch.io/404-dino-not-found',
    linkedinLink:'https://lnkd.in/p/dvFydWpH',
    images:['dinowifi_1','dinowifi_2','dinowifi_3'],
    icon:'<svg viewBox="0 0 40 35" fill="currentColor"><path d="M 25,0 L 32.5,0 L 32.5,2.5 L 35,2.5 L 35,5 L 40,5 L 40,7.5 L 37.5,7.5 L 37.5,10 L 32.5,10 L 32.5,12.5 L 30,12.5 L 30,17.5 L 27.5,17.5 L 27.5,20 L 25,20 L 25,25 L 20,25 L 20,32.5 L 22.5,32.5 L 22.5,35 L 17.5,35 L 17.5,32.5 L 15,32.5 L 15,25 L 12.5,25 L 12.5,35 L 7.5,35 L 7.5,25 L 0,25 L 0,20 L 5,20 L 5,17.5 L 7.5,17.5 L 7.5,15 L 12.5,15 L 12.5,12.5 L 15,12.5 L 15,10 L 17.5,10 L 17.5,7.5 L 20,7.5 L 20,5 L 22.5,5 L 22.5,2.5 L 25,2.5 Z"/></svg>',
    bestiaryLore: {}
  }
};
const GAME_ORDER = ['levelone','pewpewjet','ricochet','wordoku','dinowifi'];

// ---------- DEVLOG VILLAGE ----------

let activeGame = null;
let castleInitialized = false;
let castleDetailRendered = false;
let castleEmbers = [];
let castleAmbientRunning = false;
let castleAmbientStart = 0;

// ---------- GAME SWITCH TRANSITION (plain fade + rise) ----------
// Deliberately as simple as possible: toggle one class, wait out its
// transition duration with a plain setTimeout, swap content, toggle the
// class back. No sweeping bar, no inline style left behind afterward
// (toggling a class on/off leaves nothing residual once removed), and no
// dependency on `transitionend` ever firing.
function switchGameDetail(applyContent) {
  const el = document.getElementById('gameDetail');
  el.classList.add('switching');
  setTimeout(() => {
    applyContent();
    el.classList.remove('switching');
  }, reduceMotion ? 0 : 220);
}

// ---------- SIDEBAR ----------
function renderSidebar() {
  const sidebar = document.getElementById('castleSidebar');
  GAME_ORDER.forEach((key, i) => {
    const g = GAME_DATA[key];
    const btn = document.createElement('button');
    btn.className = 'game-entry';
    btn.type = 'button';
    btn.dataset.game = key;
    btn.innerHTML = '<span class="ge-bar"></span><span class="ge-icon">' + g.icon + '</span>' +
      '<span class="ge-text"><span class="ge-title">' + g.title + '</span>' +
      (g.jam ? '<span class="ge-jam-badge">🏆 Jam</span>' : '') + '<br>' +
      '<span class="ge-sub">' + g.tag + '</span></span>';
    btn.addEventListener('click', (e) => selectGame(key, e.currentTarget));
    sidebar.appendChild(btn);
    if (reduceMotion) {
      btn.style.opacity = '1';
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateX(-18px)';
      setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateX(0)';
      }, 60 + i * 90);
      // Fully remove the inline entrance styles once settled, rather than
      // setting them to 'none'/'1' - an inline style value (even 'none')
      // permanently outranks any stylesheet rule for that property,
      // including :hover, regardless of specificity. Clearing the
      // properties lets the element fall back to the stylesheet, where
      // .game-entry:hover can then apply normally.
      setTimeout(() => {
        btn.style.removeProperty('opacity');
        btn.style.removeProperty('transform');
      }, 900);
    }
  });
}

// ---------- SELECT GAME ----------
function selectGame(key, entryEl) {
  if (window._gateWipeCancel) {
    window._gateWipeCancel();
    window._gateWipeCancel = null;
  }

  activeGame = key;
  if (window.__setRoute) window.__setRoute('castle', key);
  const sidebar = document.getElementById('castleSidebar');
  sidebar.classList.add('dim-others');

  document.querySelectorAll('.game-entry').forEach(b => {
    b.classList.toggle('active', b.dataset.game === key);
  });

  if (entryEl) {
    entryEl.classList.add('snap-active');
    setTimeout(() => entryEl.classList.remove('snap-active'), 150);
  }

  renderDetail(key);

  if (entryEl && typeof fireBurst === 'function') {
    const rect = entryEl.getBoundingClientRect();
    const accentHex = { levelone: '#5fc7e8', pewpewjet: '#e8dfc0', ricochet: '#35e6e6', dinowifi: '#ff8a5c' }[key] || '#e0b45c';
    fireBurst(rect.left + 30, rect.top + rect.height / 2, hexToRgb(accentHex));
  }

  clearTimeout(window._dimTimeout);
  window._dimTimeout = setTimeout(() => {
    sidebar.classList.remove('dim-others');
  }, 600);
}

// ---------- RENDER DETAIL ----------
function renderDetail(key) {
  const g = GAME_DATA[key];
  const el = document.getElementById('gameDetail');
  el.style.setProperty('--gd-accent', g.accent);

  const thumbs = g.images.map((imgKey, i) =>
    '<button type="button" class="' + (i === 0 ? 'active' : '') + '" data-img="' + imgKey + '">' +
    '<img src="' + GAME_IMG[imgKey] + '" alt=""></button>'
  ).join('');

  let bestiaryHtml = '';
  if (g.bestiary && g.bestiary.length) {
    const chips = g.bestiary.map(b =>
      '<div class="bchip" data-key="' + b.key + '">' +
      '<img src="' + GAME_IMG[b.key] + '" alt="' + b.label + ' sprite">' +
      '<span>' + b.label + '</span>' +
      '</div>'
    ).join('');

    const lore = g.bestiaryLore || {};
    const defaultLore = 'Hover over an enemy to learn more.';
    const firstKey = g.bestiary[0]?.key || '';

    bestiaryHtml =
      '<div class="gd-bestiary-wrap">' +
      '<div class="gd-bestiary">' + chips + '</div>' +
      '<div class="gd-bestiary-lore" id="gdBestiaryLore">' +
      '<span class="lore-label">Lore</span>' +
      '<span class="lore-text">' + (lore[firstKey] || defaultLore) + '</span>' +
      '</div>' +
      '</div>';
  }

  const metaRows = g.meta ? (
    '<div class="gd-meta">' +
    g.meta.map(m => '<div class="mrow"><span>' + m.label + '</span><span>' + m.value + '</span></div>').join('') +
    '</div>'
  ) : '';

  const itchBtn = g.itchLink ?
    '<a class="gd-play" href="' + g.itchLink + '" target="_blank" rel="noopener">Play on itch.io <span class="play-arrow">→</span></a>' :
    '<span class="gd-play disabled">Link coming soon</span>';

  const linkedinBtn = g.linkedinLink ?
    '<a class="gd-linkedin" href="' + g.linkedinLink + '" target="_blank" rel="noopener"><span class="li-icon">🔗</span> LinkedIn Post</a>' :
    '';

  const descHtml = '<div class="gd-desc-wrapper" id="descWrapper"><p class="gd-desc">' + g.desc + '</p></div>';

  const jamBadgeHtml = g.jam ?
    '<div class="gd-jam-badge">' +
    '<span class="gd-jam-trophy">🏆</span>' +
    '<span class="gd-jam-text"><strong>' + g.jam.event + '</strong> · ' + g.jam.duration + ' · ' + g.jam.status + '</span>' +
    '</div>' : '';

  const html =
    '<div class="gd-head">' +
    '<span class="gd-numeral">' + (g.num || '') + '</span>' +
    '<span class="gd-tag">' + g.tag + '</span>' +
    jamBadgeHtml +
    '<h2 class="gd-title">' + g.title + '</h2>' +
    '<p class="gd-tagline">' + g.tagline + '</p>' +
    '</div>' +
    '<div class="gd-body">' +
    '<div class="gd-media">' +
    '<div class="gd-main-wrap" id="gdMainWrap">' +
    '<div class="corner-brackets"></div>' +
    '<div class="scan-line"></div>' +
    '<img class="gd-main" id="gdMain" src="' + GAME_IMG[g.images[0]] + '" alt="' + g.title + ' screenshot">' +
    '</div>' +
    '<div class="gd-thumbs">' + thumbs + '</div>' +
    '</div>' +
    '<div class="gd-side">' +
    metaRows +
    bestiaryHtml +
    descHtml +
    '<div class="gd-links">' + itchBtn + linkedinBtn + '</div>' +
    '</div>' +
    '</div>';

  const isFirstRender = !castleDetailRendered;
  if (isFirstRender || reduceMotion) {
    el.innerHTML = html;
    wireThumbs();
    wireBestiaryLore(g);
    activateFrame();
    checkDescOverflow();
    castleDetailRendered = true;
    return;
  }

  function apply() {
    el.innerHTML = html;
    wireThumbs();
    wireBestiaryLore(g);
    activateFrame();
    checkDescOverflow();
  }
  switchGameDetail(apply);
}

function activateFrame() {
  const wrap = document.getElementById('gdMainWrap');
  if (wrap) wrap.classList.add('active-frame');
  const numeral = document.querySelector('.gd-numeral');
  if (numeral) {
    numeral.classList.remove('pulse-once', 'glow-static');
    void numeral.offsetWidth;
    numeral.classList.add('pulse-once');
    setTimeout(() => {
      numeral.classList.remove('pulse-once');
      numeral.classList.add('glow-static');
    }, 750);
  }
}

function checkDescOverflow() {
  const wrapper = document.getElementById('descWrapper');
  if (wrapper) {
    if (wrapper.scrollHeight > wrapper.clientHeight) {
      wrapper.classList.add('overflowing');
    } else {
      wrapper.classList.remove('overflowing');
    }
  }
}

function wireThumbs() {
  const el = document.getElementById('gameDetail');
  el.querySelectorAll('.gd-thumbs button').forEach(tb => {
    tb.addEventListener('click', () => {
      el.querySelectorAll('.gd-thumbs button').forEach(x => x.classList.remove('active'));
      tb.classList.add('active');
      const mainImg = document.getElementById('gdMain');
      mainImg.style.opacity = '0';
      setTimeout(() => {
        mainImg.src = GAME_IMG[tb.dataset.img];
        mainImg.style.opacity = '1';
      }, 130);
    });
  });
}

function wireBestiaryLore(g) {
  const loreEl = document.getElementById('gdBestiaryLore');
  if (!loreEl) return;
  const loreData = g.bestiaryLore || {};
  const defaultText = 'Hover over an enemy to learn more.';

  const chips = document.querySelectorAll('.gd-bestiary .bchip');
  if (chips.length === 0) {
    loreEl.style.display = 'none';
    return;
  }

  chips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      const key = chip.dataset.key;
      const text = loreData[key] || defaultText;
      loreEl.querySelector('.lore-text').textContent = text;
      loreEl.classList.add('has-lore');
    });
  });
}

// ---------- EMBERS ----------
function spawnEmbers() {
  castleEmbers = [];
  const layer = document.getElementById('csEmbers');
  const count = PERF_MODE ? 10 : 24;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const big = Math.random() < 0.3;
    el.className = 'cs-ember' + (big ? ' big' : '');
    layer.appendChild(el);
    castleEmbers.push({
      el: el,
      x: Math.random() * 100,
      bottom: -Math.random() * 110,
      speed: 6 + Math.random() * 7,
      drift: Math.random() * 60 - 30
    });
  }
}

// ---------- AMBIENT TICK ----------
function castleAmbientTick(ts) {
  if (!castleAmbientRunning) return;
  if (!castleAmbientStart) castleAmbientStart = ts;
  const t = (ts - castleAmbientStart) / 1000;

  castleEmbers.forEach(p => {
    p.bottom += p.speed * (1 / 60);
    if (p.bottom > 112) { p.bottom = -Math.random() * 20;
      p.x = Math.random() * 100; }
    let op;
    if (p.bottom < 8) op = p.bottom / 8;
    else if (p.bottom > 90) op = Math.max(0, (100 - p.bottom) / 10);
    else op = 1;
    op = Math.max(0, Math.min(1, op)) * 0.95;
    const xOff = (p.bottom / 100) * p.drift;
    p.el.style.left = p.x + '%';
    p.el.style.bottom = p.bottom + '%';
    p.el.style.opacity = op;
    p.el.style.transform = 'translateX(' + xOff.toFixed(1) + 'px)';
  });

  document.querySelectorAll('.game-entry:not(.active) .ge-icon').forEach((icon, i) => {
    const y = Math.sin(t * 1.1 + i * 1.7) * 5;
    const r = Math.sin(t * 1.1 + i * 1.7) * -5;
    icon.style.transform = 'translateY(' + y.toFixed(1) + 'px) rotate(' + r.toFixed(1) + 'deg)';
  });

  const sweep = document.getElementById('castleSweep');
  if (sweep) {
    const cyc = (t % 6) / 6;
    const leftPct = -40 + cyc * 160;
    sweep.style.left = leftPct + '%';
  }

  document.querySelectorAll('.castle-slashes span').forEach((s, i) => {
    s.style.opacity = (0.75 + Math.sin(t * 0.35 + i * 2.1) * 0.25).toFixed(2);
  });

  requestAnimationFrame(castleAmbientTick);
}

function startCastleAmbient() {
  if (castleAmbientRunning) return;
  castleAmbientRunning = true;
  requestAnimationFrame(castleAmbientTick);
}

// ---------- INIT CASTLE ----------
function initCastle() {
  const pendingGame = window.__pendingCastleGame;
  window.__pendingCastleGame = null;
  if (castleInitialized) {
    if (pendingGame && GAME_DATA[pendingGame]) selectGame(pendingGame);
    return;
  }
  castleInitialized = true;
  renderSidebar();
  spawnEmbers();
  selectGame((pendingGame && GAME_DATA[pendingGame]) ? pendingGame : GAME_ORDER[0]);
  startCastleAmbient();
  const scene = document.getElementById('castleScene');
  requestAnimationFrame(() => {
    scene.classList.add('castle-entering');
    setTimeout(() => scene.classList.remove('castle-entering'), 800);
  });
}
