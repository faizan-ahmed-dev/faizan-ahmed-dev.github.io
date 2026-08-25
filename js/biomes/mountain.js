function initMountain(){
    // Every other biome only builds its scene and starts its ambient
    // animation loop the first time the user actually travels there
    // (see initCastle/initVillage/initLighthouse/initGlitchmire etc).
    // This file used to be the one exception: it was a self-invoking
    // function that ran at page-load time regardless of whether the
    // visitor ever opened Mastery Peak, which meant its cloud-drift
    // requestAnimationFrame loop (and everything else below) was running
    // in the background on every single screen of the site, forever.
    // That's what made this biome uniquely laggy compared to the others.
    // Wrapping it in initMountain() + this guard makes it lazy like
    // everything else - nothing here runs until the peak is visited.
    if (window.__mountainInitialized) return;
    window.__mountainInitialized = true;

    // Everything below builds a fair amount of DOM at once (skill camps,
    // ~35-100 particle divs, several cloud elements) and starts the cloud
    // rAF loop. Doing all of that synchronously in the same tick as the
    // travel transition's own zoom/wipe/panel-open animation is what
    // caused Mastery Peak specifically to glitch on open - the browser
    // had to build all this DOM in the exact frame it was also trying to
    // start those CSS transitions. Deferring one frame lets the panel-open
    // transition begin cleanly first; the heavy build then happens right
    // after, while the panel is still animating in, where it's not
    // competing for the same frame.
    requestAnimationFrame(() => {

    // ── data ──
    const PEAK_CAMPS = [{
      name: 'Languages',
      accent: '#7fb8ff',
      icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h14M6 4l-3 12h4l1-3h4l1 3h4L13 4"/></svg>',
      skills: [
        { n: 'C', lvl: 'comfortable' }, { n: 'C++', lvl: 'core' }, { n: 'C#', lvl: 'core' },
        { n: 'SQL', lvl: 'core' }, { n: 'CSS3', lvl: 'comfortable' },
        { n: 'JavaScript', lvl: 'learning' }, { n: 'Python', lvl: 'learning' }
      ]
    }, {
      name: 'Frameworks / Libraries',
      accent: '#b399ff',
      icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="6" height="6"/><rect x="11" y="3" width="6" height="6"/><rect x="3" y="11" width="6" height="6"/><rect x="11" y="11" width="6" height="6"/></svg>',
      skills: [
        { n: 'Windows Forms (WinForms)', lvl: 'core' }, { n: '.NET', lvl: 'core' }, { n: 'STL', lvl: 'core' }
      ]
    }, {
      name: 'Databases',
      accent: '#5eead4',
      icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="10" cy="4.5" rx="7" ry="2.5"/><path d="M3 4.5v11c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-11"/><path d="M3 10c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/></svg>',
      skills: [
        { n: 'MySQL', lvl: 'core' }, { n: 'SQL', lvl: 'core' }
      ]
    }, {
      name: 'Game Development',
      accent: '#ff9d5c',
      icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="7" width="16" height="8" rx="4"/><path d="M6.5 9.5v3M5 11h3"/><circle cx="14" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="15.6" cy="12" r=".9" fill="currentColor" stroke="none"/></svg>',
      skills: [
        { n: 'Unity', lvl: 'comfortable' }, { n: 'Godot', lvl: 'core' }, { n: 'WinForms Games', lvl: 'core' },
        { n: '2D Game Development', lvl: 'core' }, { n: 'Game Design Fundamentals', lvl: 'core' }
      ]
    }, {
      name: 'Tools / Platforms',
      accent: '#8fe0a8',
      icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 3l4 4-8 8-4 1 1-4 8-8z"/><path d="M11 5l4 4"/></svg>',
      skills: [
        { n: 'Visual Studio', lvl: 'comfortable' }, { n: 'VS Code', lvl: 'comfortable' },
        { n: 'Dev-C++', lvl: 'comfortable' },
        { n: 'Godot', lvl: 'comfortable' }, { n: 'Unity Editor', lvl: 'comfortable' }, { n: 'Git', lvl: 'comfortable' }, { n: 'GitHub', lvl: 'comfortable' },
        { n: 'Itch.io', lvl: 'comfortable' }, { n: 'Figma', lvl: 'learning' }, { n: 'Notion', lvl: 'comfortable' }
      ]
    }];

    const PEAK_BADGES = [
      { title: 'SQL (Basic)', date: '20 Apr 2026', link: 'https://www.hackerrank.com/certificates/d4dbe30c8ed4' },
      { title: 'SQL (Intermediate)', date: '31 May 2026', link: 'https://www.hackerrank.com/certificates/6bd41b8946d4' },
      { title: 'SQL (Advanced)', date: '31 May 2026', link: 'https://www.hackerrank.com/certificates/5c1cf30b8c3f' }
    ];

    const PEAK_CLIMBING = [
      'Data Structures & Algorithms', 'Software Engineering Principles',
      'Computer Networks', 'Git & Collaborative Development', 'Game Architecture', '3D Game Development'
    ];

    // ── render content ──
    const peakScroll = document.getElementById('peakScene');
    const container = document.getElementById('peakContent');

    function buildSkillTip(lvl) {
      const labels = { core: 'Core competency', comfortable: 'Comfortable', learning: 'Actively learning' };
      return labels[lvl] || '';
    }

    const campsHtml = PEAK_CAMPS.map((camp, ci) =>
      `<div class="peak-camp" data-index="${ci}" style="--accent:${camp.accent}">
          <span class="pc-marker"></span>
          <div class="pc-card">
            <h3><span class="pc-icon">${camp.icon}</span>${camp.name}</h3>
            <div class="pc-skills">
              ${camp.skills.map(s =>
                `<span class="pc-skill lvl-${s.lvl}" data-skill="${s.n}">
                    <span class="pc-dot"></span>${s.n}
                    <span class="skill-tip">${buildSkillTip(s.lvl)}</span>
                  </span>`
              ).join('')}
            </div>
          </div>
        </div>`
    ).join('');

    const badgesHtml = PEAK_BADGES.map(b =>
      `<a class="ps-badge" href="${b.link}" target="_blank" rel="noopener">
          <svg class="ps-flag" viewBox="0 0 46 56" fill="none">
            <rect x="21" y="4" width="3" height="48" fill="#4a3826"/>
            <path d="M24 6 L44 12 L24 20 Z" fill="#f4e9cf" stroke="#241c08" stroke-width="1.2"/>
            <ellipse cx="22.5" cy="53" rx="12" ry="2.5" fill="#241c08" opacity="0.25"/>
          </svg>
          <span class="ps-label">${b.title}</span>
          <span class="ps-date">${b.date}</span>
        </a>`
    ).join('');

    const climbingHtml = PEAK_CLIMBING.map(c =>
      `<div class="route-item">
          <span class="route-marker"></span>
          <span class="route-text">${c}</span>
        </div>`
    ).join('');

    container.innerHTML = `
        <div class="peak-intro" id="peakIntro">
          <div class="pi-eyebrow">Year One - Skills Gained Along The Way</div>
          <h2>The Climb</h2>
          <p>Every skill below was earned somewhere on this first year - one camp per category, planted higher as the mountain goes.</p>
        </div>
        <div class="skill-legend">
          <span><span class="dot-sample core"></span> Core</span>
          <span><span class="dot-sample comfortable"></span> Comfortable</span>
          <span><span class="dot-sample learning"></span> Learning</span>
        </div>
        ${campsHtml}
        <div class="peak-summit" id="peakSummit">
          <div class="ps-eyebrow">Summit Badges</div>
          <h3>
            <svg class="summit-flag" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect class="flag-pole" x="10" y="5" width="4" height="50" rx="2" />
              <path class="flag-cloth-shadow" d="M14 12 L 40 14 L 35 20 L 42 26 L 14 28 Z" />
              <path class="flag-cloth" d="M14 10 L 40 12 L 35 18 L 42 24 L 14 26 Z" />
            </svg>
            HackerRank SQL Certifications
          </h3>
          <div class="ps-badges glass-box">${badgesHtml}</div>
        </div>
        <div class="peak-climbing" id="peakClimbing">
          <div class="pcl-eyebrow">Still Ahead - The Next Peak</div>
          <h3>Currently Climbing</h3>
          <div class="route-list glass-box">${climbingHtml}</div>
        </div>
      `;

    // ── particles ──
    const particleLayer = document.getElementById('peakParticles');
    const pCount = PERF_MODE ? 35 : 100;
    for (let i = 0; i < pCount; i++) {
      const el = document.createElement('div');
      el.className = 'peak-particle';
      const size = 1.5 + Math.random() * 4.5;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = '-10%';
      el.style.setProperty('--drift', (Math.random() - 0.5) * 100 + 'px');
      const dur = 14 + Math.random() * 24;
      el.style.animationDuration = dur + 's';
      el.style.animationDelay = (Math.random() * dur * 0.8) + 's';
      el.style.opacity = 0.15 + Math.random() * 0.35;
      particleLayer.appendChild(el);
    }

    // ── JS-driven clouds ──
    const cloudLayer = document.getElementById('peakCloudLayer');
    const clouds = [];

    function createCloud() {
      const el = document.createElement('div');
      el.className = 'cloud-obj';
      const w = 80 + Math.random() * 150;
      const h = 20 + Math.random() * 40;
      el.style.width = w + 'px';
      el.style.height = h + 'px';
      el.style.top = (5 + Math.random() * 85) + '%';
      el.style.opacity = 0.15 + Math.random() * 0.15;
      el.style.background = 'rgba(220,235,255,0.25)';
      el.style.borderRadius = '50%';
      el.style.filter = 'blur(3px)';
      const c1 = document.createElement('span');
      c1.style.cssText =
        `position:absolute;border-radius:50%;background:inherit;width:${w*0.6}px;height:${h*0.7}px;top:${-h*0.2}px;left:${w*0.1}px;filter:blur(4px);`;
      const c2 = document.createElement('span');
      c2.style.cssText =
        `position:absolute;border-radius:50%;background:inherit;width:${w*0.5}px;height:${h*0.6}px;top:${-h*0.1}px;right:${w*0.1}px;filter:blur(4px);`;
      el.appendChild(c1);
      el.appendChild(c2);

      const speed = 0.15 + Math.random() * 0.35;
      const startX = -w - Math.random() * 200;
      const data = {
        el,
        x: startX,
        y: parseFloat(el.style.top),
        speed: speed,
        width: w,
        height: h,
        phase: Math.random() * Math.PI * 2
      };
      cloudLayer.appendChild(el);
      return data;
    }

    const MOUNTAIN_CLOUD_COUNT = PERF_MODE ? 5 : 10;
    for (let i = 0; i < MOUNTAIN_CLOUD_COUNT; i++) {
      const c = createCloud();
      c.x = -c.width - Math.random() * 300 + (i / MOUNTAIN_CLOUD_COUNT) * window.innerWidth * 0.8;
      c.el.style.left = c.x + 'px';
      clouds.push(c);
    }

    function animateClouds() {
      const speedFactor = 1;
      clouds.forEach(c => {
        c.x += c.speed * speedFactor;
        c.phase += 0.005;
        const bob = Math.sin(c.phase) * 2;
        if (c.x > window.innerWidth + c.width + 50) {
          c.x = -c.width - 50 - Math.random() * 200;
          c.el.style.top = (5 + Math.random() * 85) + '%';
          c.y = parseFloat(c.el.style.top);
          c.speed = 0.15 + Math.random() * 0.35;
        }
        c.el.style.left = c.x + 'px';
        c.el.style.top = (c.y + bob) + '%';
        const opacity = 0.12 + 0.18 * (0.5 + 0.5 * Math.sin(c.phase * 0.5 + c.x * 0.001));
        c.el.style.opacity = opacity;
      });
      requestAnimationFrame(animateClouds);
    }
    animateClouds();

    // ── IntersectionObserver for visibility ──
    const campElements = document.querySelectorAll('.peak-camp');
    const introEl = document.getElementById('peakIntro');
    const summitEl = document.getElementById('peakSummit');
    const climbingEl = document.getElementById('peakClimbing');

    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.id === 'peakSummit') {
            entry.target.classList.add('summit-reached');
          }
        }
      });
    }, { threshold: 0.1 });

    [introEl, ...campElements, summitEl, climbingEl].forEach(el => {
      if (el) visibilityObserver.observe(el);
    });

    // ── progress ring, active camp, fireworks ──
    const ring = document.getElementById('progressRing');
    const label = document.getElementById('progressLabel');
    const progressWrap = document.getElementById('peakProgress');
    const gradientEl = document.getElementById('scrollGradient');
    const circumference = 150.8;
    let summitCelebrated = false;
    // Queried fresh on every scroll tick before - cache once instead.
    const layerMountains = document.getElementById('layerMountains');
    const layerRidges = document.getElementById('layerRidges');
    const layerMist = document.getElementById('layerMist');
    const layerGlow = document.getElementById('layerGlow');
    const backBtn = document.getElementById('backTop');

    function getActiveCampIndex() {
      const viewportHeight = window.innerHeight;
      let bestIdx = -1;
      let bestDist = Infinity;
      campElements.forEach((camp, idx) => {
        const rect = camp.getBoundingClientRect();
        const campCenter = rect.top + rect.height / 2;
        const dist = Math.abs(campCenter - viewportHeight / 2);
        if (rect.bottom > 0 && rect.top < viewportHeight) {
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = idx;
          }
        }
      });
      return bestIdx;
    }

    function updateActiveCamp() {
      const idx = getActiveCampIndex();
      if (idx === -1) return;
      campElements.forEach((c, i) => {
        c.classList.toggle('active-camp', i === idx);
      });
    }

    function updateProgress() {
      const scrollTop = peakScroll.scrollTop;
      const docHeight = Math.max(1, peakScroll.scrollHeight - peakScroll.clientHeight);
      const pct = Math.min(1, Math.max(0, scrollTop / docHeight));

      const offset = circumference * (1 - pct);
      ring.style.strokeDashoffset = offset;
      const pctDisplay = Math.round(pct * 100);
      label.innerHTML = `${pctDisplay}% <small>summit</small>`;

      const hue = 40 - pct * 22;
      const sat = 55 + pct * 25;
      const lig = 65 + pct * 20;
      ring.style.stroke = `hsl(${hue}, ${sat}%, ${lig}%)`;
      progressWrap.style.borderColor = `hsla(${hue}, ${sat}%, ${lig}%, 0.25)`;
      label.style.color = `hsl(${hue}, ${sat}%, ${lig}%)`;

      const r1 = 10 + Math.round(60 * pct);
      const g1 = 14 + Math.round(40 * pct);
      const b1 = 26 + Math.round(30 * pct);
      const r2 = 20 + Math.round(100 * pct);
      const g2 = 30 + Math.round(80 * pct);
      const b2 = 50 + Math.round(60 * pct);
      const r3 = 40 + Math.round(180 * pct);
      const g3 = 50 + Math.round(150 * pct);
      const b3 = 60 + Math.round(100 * pct);
      const r4 = 100 + Math.round(200 * pct);
      const g4 = 120 + Math.round(150 * pct);
      const b4 = 130 + Math.round(80 * pct);
      gradientEl.style.background = `
          linear-gradient(180deg,
            rgb(${r1},${g1},${b1}) 0%,
            rgb(${r2},${g2},${b2}) 30%,
            rgb(${r3},${g3},${b3}) 60%,
            rgb(${r4},${g4},${b4}) 100%
          )
        `;

      if (!summitCelebrated && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const summitRect = summitEl.getBoundingClientRect();
        if (summitRect.top < window.innerHeight * 0.4 && summitRect.bottom > window.innerHeight * 0.6) {
          summitCelebrated = true;
          triggerSummitCelebration();
        }
      }

      if (scrollTop > 400) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }

      if (layerMountains) {
        const offset = scrollTop * 0.08;
        layerMountains.style.transform = `translateY(${offset}px) scale(1.02)`;
      }
      if (layerRidges) {
        const offset = scrollTop * 0.04;
        layerRidges.style.transform = `translateY(${offset}px) scale(1.01)`;
      }
      if (layerMist) {
        const offset = scrollTop * 0.02;
        layerMist.style.transform = `translateY(${offset}px)`;
      }
      if (layerGlow) {
        const offset = scrollTop * 0.01;
        const intensity = 0.5 + pct * 0.4;
        layerGlow.style.opacity = intensity;
        layerGlow.style.transform = `translateY(${offset}px)`;
      }

      updateActiveCamp();
    }

    // The scroll handler above repaints a full-viewport gradient, reads
    // layout for every skill camp, and updates several elements - fine
    // once per rendered frame, but the native 'scroll' event on mobile can
    // fire far more often than the screen actually redraws (especially
    // during momentum scrolling), so it was running that whole expensive
    // update dozens of times per frame. That flood of repaints is what
    // showed up as the screen flashing black while scrolling. Coalescing
    // it to at most once per animation frame fixes it at the source.
    let peakScrollTicking = false;
    function onPeakScroll() {
      if (peakScrollTicking) return;
      peakScrollTicking = true;
      requestAnimationFrame(() => {
        updateProgress();
        peakScrollTicking = false;
      });
    }
    peakScroll.addEventListener('scroll', onPeakScroll, { passive: true });
    window.addEventListener('resize', onPeakScroll, { passive: true });
    setTimeout(updateProgress, 50);

    // ── back to top ──
    backBtn.addEventListener('click', () => {
      peakScroll.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── skill click ──
    document.querySelectorAll('.pc-skill').forEach(skill => {
      skill.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.add('skill-flash');
        setTimeout(() => this.classList.remove('skill-flash'), 400);
      });
    });

    // ── summit celebration ──
    let celebrationCanvas, ctx, particles = [];
    let celebrationActive = false;

    function triggerSummitCelebration() {
      const canvas = document.getElementById('summitCelebration');
      if (!canvas) return;
      celebrationCanvas = canvas;
      ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.classList.add('active');

      const colors = ['#f4e9cf', '#ffd97a', '#ff9d42', '#dfe8ff', '#9fc7e8', '#7cff9e', '#f5d78a', '#ff6b6b', '#ffb15c',
        '#a78bfa', '#34d399'
      ];
      const count = PERF_MODE ? 90 : 220;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 9;
        const size = 2 + Math.random() * 7;
        particles.push({
          x: canvas.width * (0.1 + Math.random() * 0.8),
          y: canvas.height * (0.1 + Math.random() * 0.4),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5,
          life: 1,
          decay: 0.003 + Math.random() * 0.012,
          size: size,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      if (!celebrationActive) {
        celebrationActive = true;
        animateCelebration();
      }

      setTimeout(() => {
        canvas.classList.remove('active');
        celebrationActive = false;
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }, 8000);
    }

    function animateCelebration() {
      if (!celebrationActive) return;
      const canvas = celebrationCanvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.028;
        p.vx *= 0.995;
        p.life -= p.decay;
        if (p.life <= 0) return;
        alive = true;
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        if (!PERF_MODE) { ctx.shadowColor = p.color; ctx.shadowBlur = 16; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.3 + 0.7 * p.life), 0, Math.PI * 2);
        ctx.fill();
        // The trailing "afterimage" dot is a nice-to-have blur echo; skip it
        // in perf mode rather than doing a second shadowed draw per particle.
        if (!PERF_MODE) {
          ctx.globalAlpha = p.life * 0.3;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x - p.vx * 2, p.y - p.vy * 2, p.size * 0.4 * p.life, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (alive) {
        requestAnimationFrame(animateCelebration);
      } else {
        celebrationActive = false;
        canvas.classList.remove('active');
        particles = [];
      }
    }

    window.addEventListener('resize', () => {
      if (celebrationCanvas) {
        celebrationCanvas.width = window.innerWidth;
        celebrationCanvas.height = window.innerHeight;
      }
    });

    // ── return ──
    document.getElementById('peakReturnBtn').addEventListener('click', () => {
      if (window.closeDest) window.closeDest();
    });

    // ── initial reveal ──
    setTimeout(() => {
      document.querySelectorAll('.peak-camp, .peak-intro, .peak-summit, .peak-climbing').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible');
          if (el.id === 'peakSummit') {
            el.classList.add('summit-reached');
          }
        }
      });
      updateProgress();
    }, 150);

    }); // end deferred requestAnimationFrame

}
window.initMountain = initMountain;
  