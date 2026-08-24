(function(){

  // ── beam timing (kept in one place so CSS + sync math never drift) ──
  const BEAM_DURATION = 14; // seconds per full 360° rotation - keep in sync with .lh-beam-pivot in css/biomes.css

  // ── contact channels → buoys on the water ──
  // left/top are percentages within #lhOcean; depth < 1 pushes a buoy
  // further "out to sea" (smaller, dimmer, slightly slower bob).
  const CONTACTS = [
    {
      id: 'email',
      label: 'Email',
      icon: '<path d="M2 5h16v10H2z"/><path d="M2 5l8 6 8-6"/>',
      value: 'mehunfaizan@gmail.com',
      href: 'mailto:mehunfaizan@gmail.com',
      action: 'Open mail',
      left: 20, top: 58, depth: 1
    },
    {
      id: 'devemail',
      label: 'Dev Email',
      icon: '<path d="M2 5h16v10H2z"/><path d="M2 5l8 6 8-6"/>',
      value: 'ricochetedball@gmail.com',
      href: 'mailto:ricochetedball@gmail.com',
      action: 'Open mail',
      left: 46, top: 32, depth: 0.85
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      icon: '<rect x="2" y="2" width="16" height="16" rx="2"/><circle cx="6.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/><path d="M5.3 9v6M11 9v6M11 11.2c0-1.5 3-1.7 3 .3V15"/>',
      value: 'linkedin.com/in/faizan-ahmed-150911386',
      href: 'https://www.linkedin.com/in/faizan-ahmed-150911386/',
      action: 'Open profile',
      left: 30, top: 22, depth: 0.95
    },
    {
      id: 'github',
      label: 'GitHub',
      icon: '<path d="M10 2a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.49c-2.22.48-2.69-1.07-2.69-1.07-.36-.93-.89-1.17-.89-1.17-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.14-.08-.2-.36-1.02.08-2.13 0 0 .67-.22 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.55.82 1.27.82 2.14 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.14.46.55.38A8 8 0 0 0 10 2z"/>',
      value: 'github.com/faizan-ahmed-dev',
      href: 'https://github.com/faizan-ahmed-dev',
      action: 'Open profile',
      left: 58, top: 60, depth: 0.9
    },
    {
      id: 'itch',
      label: 'itch.io',
      icon: '<path d="M2.5 5.5c.3-1.6 1-2.5 2.6-2.7C7 2.5 8.5 3.2 10 3.2s3-.7 4.9-.4c1.6.2 2.3 1.1 2.6 2.7.3 1.5.9 4.4.5 5.7-.3 1-1 1.6-2 1.6-1.4 0-2.1-1-2.3-2-.2 1-1 1.9-2.4 1.9-.9 0-1.6-.4-2.3-1.1-.7.7-1.4 1.1-2.3 1.1-1.4 0-2.2-.9-2.4-1.9-.2 1-.9 2-2.3 2-1 0-1.7-.6-2-1.6-.4-1.3.2-4.2.5-5.7z"/><circle cx="7.2" cy="9.2" r=".6" fill="currentColor" stroke="none"/><circle cx="12.8" cy="9.2" r=".6" fill="currentColor" stroke="none"/>',
      value: 'ricocheted-ball.itch.io',
      href: 'https://ricocheted-ball.itch.io/',
      action: 'Open page',
      left: 10, top: 36, depth: 0.8
    },
    {
      id: 'discord',
      label: 'Discord',
      icon: '<path d="M6 5.5C8.5 4.5 11.5 4.5 14 5.5l.3.7c1 1.6 1.5 3.5 1.6 5.4-1.1 1.3-2.8 2-4.5 2.1l-.5-1c.9-.2 1.7-.6 2.4-1.2-.6.4-1.2.7-1.9.9-1.4.4-2.9.4-4.3 0-.7-.2-1.3-.5-1.9-.9.7.6 1.5 1 2.4 1.2l-.5 1c-1.7-.1-3.4-.8-4.5-2.1.1-1.9.6-3.8 1.6-5.4z"/><circle cx="7.7" cy="10" r=".9" fill="currentColor" stroke="none"/><circle cx="12.3" cy="10" r=".9" fill="currentColor" stroke="none"/>',
      value: 'ricochetedball',
      href: null,
      action: 'Copy tag',
      left: 56, top: 84, depth: 0.75
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: '<rect x="2.5" y="2.5" width="15" height="15" rx="4"/><circle cx="10" cy="10" r="3.3"/><circle cx="14" cy="6" r=".9" fill="currentColor" stroke="none"/>',
      value: 'instagram.com/ricochetedball',
      href: 'https://www.instagram.com/ricochetedball/',
      action: 'Open profile',
      left: 34, top: 78, depth: 0.85
    }
  ];

  let lighthouseInitialized = false;
  let activeBuoy = null;

  function buildStars(){
    const wrap = document.getElementById('lhStars');
    if (!wrap || wrap.childElementCount) return;
    const frag = document.createDocumentFragment();
    const count = reduceMotion ? 40 : 70;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'lh-star';
      const size = 0.6 + Math.random() * 1.6;
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * 100) + '%';
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      if (!reduceMotion) {
        s.style.animationDuration = (2.5 + Math.random() * 3.5) + 's';
        s.style.animationDelay = (Math.random() * 5) + 's';
      }
      frag.appendChild(s);
    }
    wrap.appendChild(frag);
  }

  function buildBuoys(){
    const wrap = document.getElementById('lhBuoys');
    if (!wrap || wrap.childElementCount) return;
    const frag = document.createDocumentFragment();
    CONTACTS.forEach(c => {
      const el = document.createElement('div');
      el.className = 'lh-buoy';
      el.dataset.id = c.id;
      el.tabIndex = 0;
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', c.label);
      el.style.left = c.left + '%';
      el.style.top = c.top + '%';
      el.style.setProperty('--depth', c.depth);
      el.innerHTML = `
        <div class="lh-buoy-glow"></div>
        <div class="lh-buoy-body">
          <svg class="lh-buoy-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3">${c.icon}</svg>
        </div>
        <div class="lh-buoy-label">${c.label}</div>
        <div class="lh-buoy-card">
          <div class="lh-buoy-card-label">${c.label}</div>
          <div class="lh-buoy-card-value">${c.value}</div>
          <div class="lh-buoy-card-actions">
            ${c.href ? `<a class="lh-buoy-action" href="${c.href}" target="${c.href.startsWith('mailto:') ? '_self' : '_blank'}" rel="noopener">${c.action}</a>` : ''}
            <button type="button" class="lh-buoy-action lh-buoy-copy" data-copy="${c.value}">Copy</button>
          </div>
        </div>
      `;
      frag.appendChild(el);
    });
    wrap.appendChild(frag);

    // wire interactions once elements exist
    wrap.querySelectorAll('.lh-buoy').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.lh-buoy-card')) return; // let card's own controls work
        toggleBuoy(el);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleBuoy(el);
        }
        if (e.key === 'Escape') closeBuoys();
      });
    });
    wrap.querySelectorAll('.lh-buoy-copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const text = btn.dataset.copy;
        const done = () => {
          const orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.textContent = orig; }, 1400);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(done);
        } else {
          done();
        }
      });
    });
  }

  function toggleBuoy(el){
    const isActive = el.classList.contains('active');
    closeBuoys();
    if (!isActive) {
      el.classList.add('active');
      activeBuoy = el;
    }
  }
  function closeBuoys(){
    document.querySelectorAll('.lh-buoy.active').forEach(el => el.classList.remove('active'));
    activeBuoy = null;
  }

  // Sync each buoy's glow-pulse so it visually "catches the light" at the
  // moment the rotating beam sweeps past its actual angle from the tower.
  function syncBuoyPulses(){
    const pivot = document.getElementById('lhBeamPivot');
    const ocean = document.getElementById('lhOcean');
    if (!pivot || !ocean) return;
    const pr = pivot.getBoundingClientRect();
    const px = pr.left + pr.width / 2;
    const py = pr.top + pr.height / 2;
    document.querySelectorAll('.lh-buoy').forEach(el => {
      const r = el.getBoundingClientRect();
      const bx = r.left + r.width / 2;
      const by = r.top + r.height / 2;
      let angle = Math.atan2(by - py, bx - px) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      const delay = (angle / 360) * BEAM_DURATION;
      const glow = el.querySelector('.lh-buoy-glow');
      if (glow) {
        glow.style.animationDuration = BEAM_DURATION + 's';
        glow.style.animationDelay = delay + 's';
      }
    });
  }

  let resizeTimer = null;
  function onResize(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncBuoyPulses, 200);
  }

  function wireForm(){
    const form = document.getElementById('lhForm');
    if (!form || form.dataset.wired) return;
    form.dataset.wired = '1';

    const submitBtn = document.getElementById('lhFormSubmit');
    const submitLabel = submitBtn.querySelector('.lh-form-submit-label');
    const successBox = document.getElementById('lhFormSuccess');
    const confirmBox = document.getElementById('lhFormConfirm');
    const confirmBody = document.getElementById('lhFormConfirmBody');
    const copyBtn = document.getElementById('lhCopyMessage');
    const againBtn = document.getElementById('lhWriteAnother');
    const sendAnotherBtn = document.getElementById('lhSendAnother');

    function showFallback(name, message) {
      const plainMessage = `To: mehunfaizan@gmail.com\nSubject: Signal from the Overworld - ${name}\n\n${message}\n\n- ${name}, via Farpoint Lighthouse`;
      const subject = encodeURIComponent(`Signal from the Overworld - ${name}`);
      const body = encodeURIComponent(`${message}\n\n- ${name}, via Farpoint Lighthouse`);
      // Best-effort attempt to open the visitor's own mail app as a second
      // fallback layer. This can fail silently on browsers/OS with no
      // registered mail handler, which is exactly why the copy-paste box
      // below is shown regardless, rather than relying on this alone.
      try {
        window.location.href = `mailto:mehunfaizan@gmail.com?subject=${subject}&body=${body}`;
      } catch (err) { /* ignore */ }
      confirmBody.textContent = plainMessage;
      form.classList.add('lh-hidden');
      confirmBox.classList.add('visible');
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('lhFormName').value.trim() || 'Someone';
      const message = document.getElementById('lhFormMessage').value.trim();

      submitBtn.disabled = true;
      submitLabel.textContent = 'Sending...';

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: '6109dea5-8dbc-4fb5-97b7-350f1a3ac582',
            subject: `Signal from the Overworld - ${name}`,
            from_name: 'The Overworld contact form',
            name,
            message
          })
        });
        const data = await res.json().catch(() => null);
        if (res.ok && data && data.success) {
          form.classList.add('lh-hidden');
          successBox.classList.add('visible');
        } else {
          showFallback(name, message);
        }
      } catch (err) {
        // Network failure (offline, blocked request, Web3Forms unreachable) -
        // never leave the visitor with a dead button, drop to the fallback.
        showFallback(name, message);
      } finally {
        submitBtn.disabled = false;
        submitLabel.textContent = 'Send signal';
      }
    });

    copyBtn.addEventListener('click', () => {
      const text = confirmBody.textContent;
      const done = () => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = orig; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });

    againBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('lh-hidden');
      confirmBox.classList.remove('visible');
    });

    sendAnotherBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('lh-hidden');
      successBox.classList.remove('visible');
    });
  }

  function wireConsoleTab(){
    const tab = document.getElementById('lhConsoleTab');
    const consoleEl = document.getElementById('lhConsole');
    if (!tab || !consoleEl || tab.dataset.wired) return;
    tab.dataset.wired = '1';
    const toggle = () => {
      const collapsed = consoleEl.classList.toggle('collapsed');
      tab.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    };
    tab.addEventListener('click', toggle);
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }

  function wireHint(){
    const hint = document.getElementById('lhHint');
    if (!hint || hint.dataset.wired) return;
    hint.dataset.wired = '1';
    setTimeout(() => { hint.classList.add('fade'); }, 6000);
  }

  function wireOutsideClick(){
    document.getElementById('lhOcean').addEventListener('click', (e) => {
      if (!e.target.closest('.lh-buoy')) closeBuoys();
    });
  }

  function initLighthouse(){
    if (!lighthouseInitialized) {
      lighthouseInitialized = true;
      buildStars();
      buildBuoys();
      wireForm();
      wireConsoleTab();
      wireHint();
      wireOutsideClick();
      window.addEventListener('resize', onResize, { passive: true });
    }
    // Recompute sync every time we arrive, in case viewport changed since
    // the last visit (or since layout happened while the panel was hidden).
    requestAnimationFrame(() => requestAnimationFrame(syncBuoyPulses));
  }

  window.initLighthouse = initLighthouse;
  window.__resetLighthouse = function(){
    closeBuoys();
    const form = document.getElementById('lhForm');
    const confirmBox = document.getElementById('lhFormConfirm');
    if (form) { form.reset(); form.classList.remove('lh-hidden'); }
    if (confirmBox) confirmBox.classList.remove('visible');
  };

})();
