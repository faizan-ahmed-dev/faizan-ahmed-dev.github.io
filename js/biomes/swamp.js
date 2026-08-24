(function(){

  // ── shared state ──────────────────────────────────────────
  let glitchmireInitialized = false;
  let audioCtx = null;
  let muted = (localStorage.getItem('gm-muted') === '1');
  let entered = false;
  let konamiBuf = [];
  let loggedThisVisit = new Set();
  let currentExpId = null;
  let currentUnmount = null;
  const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];

  function isAnomalyUnlocked(){ return localStorage.getItem('gm-anomaly-unlocked') === '1'; }
  function unlockAnomaly(silent){
    const wasLocked = !isAnomalyUnlocked();
    localStorage.setItem('gm-anomaly-unlocked', '1');
    if (wasLocked) {
      renderGrid(); // rebuild tile #099 in its unlocked state
      if (!silent) showToast('ANOMALY DETECTED - Experiment #099 declassified');
      if (!muted) playArpeggio();
    }
  }

  // ── audio (synthesized - no asset files) ──
  function ensureAudio(){
    if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){ audioCtx = null; } }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  function beep(freq, duration, type, delay, gainPeak){
    if (muted) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime + (delay || 0);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'square';
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(gainPeak || 0.1, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + duration + 0.02);
  }
  function playBlip(){ beep(420, 0.05, 'square', 0, 0.06); }
  function playClick(){ beep(700, 0.04, 'square', 0, 0.05); }
  function playArpeggio(){ [523,659,784,1047].forEach((f,i)=>beep(f,0.12,'square',i*0.08,0.08)); }
  function playCrashSound(){
    if (muted) return;
    [400,300,220,140,80].forEach((f,i)=>beep(f, 0.22, 'sawtooth', i*0.1, 0.09));
  }
  function playStatic(dur){
    if (muted) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    dur = dur || 0.28;
    const bufferSize = ctx.sampleRate * dur;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random()*2-1) * (1 - i/bufferSize);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass'; filter.frequency.value = 1800;
    const gain = ctx.createGain(); gain.gain.value = 0.16;
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
  }
  // frequency sweep - used for spawn/portal/gravity feedback. exponential
  // ramps sound far more natural than linear ones for pitch changes.
  function playSweep(freqStart, freqEnd, duration, type, gainPeak){
    if (muted) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(Math.max(freqStart,1), t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd,1), t0 + duration);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(gainPeak || 0.1, t0 + duration*0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + duration + 0.02);
  }
  function playSpawnSound(){ playSweep(220, 720, 0.22, 'square', 0.09); }
  function playGravitySound(v){
    if (v === 0) playSweep(500, 900, 0.5, 'sine', 0.07);
    else if (v < 0) playSweep(900, 1400, 0.4, 'sine', 0.07);
    else playSweep(500, 160, 0.28, 'sine', 0.09);
  }
  function playHonk(){ beep(220, 0.1, 'sawtooth', 0, 0.09); beep(180, 0.14, 'sawtooth', 0.08, 0.09); }
  function playRainTick(){ beep(1200 + Math.random()*400, 0.03, 'sine', 0, 0.025); }
  function playPortalSound(){
    playSweep(1200, 90, 1.1, 'sawtooth', 0.08);
    if (audioCtx) { playStatic(0.6); }
  }
  function playErrorBuzz(){ beep(140, 0.16, 'sawtooth', 0, 0.08); }

  function updateMuteButtons(){
    [document.getElementById('gmMuteBtn'), document.getElementById('gmWallMuteBtn')].forEach(btn => {
      if (!btn) return;
      btn.textContent = muted ? '🔇' : '🔊';
      btn.setAttribute('aria-pressed', muted ? 'true' : 'false');
    });
  }
  function toggleMute(){
    muted = !muted;
    localStorage.setItem('gm-muted', muted ? '1' : '0');
    updateMuteButtons();
    if (!muted) { ensureAudio(); playBlip(); }
  }

  function showToast(msg){
    const toast = document.getElementById('gmToast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function logExperiment(id){
    if (!loggedThisVisit.has(id)) {
      loggedThisVisit.add(id);
      updateLogCounter();
      showToast(`LOGGED - Experiment #${id}`);
    }
  }
  function updateLogCounter(){
    const el = document.getElementById('gmLogCounter');
    if (el) el.textContent = `LOGGED ${loggedThisVisit.size}/${LOGGABLE_TOTAL}`;
  }

  // ══════════════════════════════════════════════════════════
  // EXPERIMENT REGISTRY - every tile in the lab grid. Add a new
  // object here and it automatically shows up, no other wiring
  // needed. mount(stage) sets everything up and returns a cleanup
  // function that gets called automatically when the experiment
  // closes (cancel rAF loops / remove listeners here).
  // ══════════════════════════════════════════════════════════

  function mkCanvas(stage){
    const canvas = document.createElement('canvas');
    canvas.className = 'gm-stage-canvas';
    stage.appendChild(canvas);
    const rect = stage.getBoundingClientRect();
    canvas.width = rect.width; canvas.height = rect.height;
    return canvas;
  }
  function mkHint(stage, text){
    const hint = document.createElement('div');
    hint.className = 'gm-stage-hint';
    hint.textContent = text;
    stage.appendChild(hint);
    return hint;
  }

  const EXPERIMENTS = [
    {
      id:'001', title:'Gravity Well', status:'stable',
      desc:'A pile of particles under simulated gravity. Press G to flip which way is down.',
      mount(stage){
        const canvas = mkCanvas(stage);
        mkHint(stage, 'PRESS G TO FLIP GRAVITY');
        const ctx = canvas.getContext('2d');
        let dir = 1;
        const colors = ['#7cff9e','#00e5ff','#ff2e88','#ffe066'];
        const N = 90;
        const particles = Array.from({length:N}, () => {
          const r = 2.5 + Math.random()*8;
          return {
            x: Math.random()*canvas.width, y: Math.random()*canvas.height*0.6,
            vx: (Math.random()-0.5)*2.2, vy: (Math.random()-0.5)*1.5,
            r, c: colors[Math.floor(Math.random()*colors.length)],
            // per-particle variation is what keeps them from all syncing into
            // one flat resting line: different "mass" (gravity response),
            // different bounciness, a phase for idle wobble, and a random
            // clock offset for occasional tiny re-kicks.
            massMult: 0.55 + Math.random()*0.9,
            restitution: 0.42 + Math.random()*0.32,
            phase: Math.random()*Math.PI*2,
            wobbleAmt: 0.4 + Math.random()*1.4,
            nextKick: 60 + Math.random()*180,
          };
        });
        function flip(){ dir *= -1; if (!muted) playClick(); }
        function onKey(e){ if (e.code === 'KeyG') flip(); }
        document.addEventListener('keydown', onKey);
        const btn = document.createElement('button');
        btn.className = 'gm-stage-btn'; btn.textContent = 'Flip gravity (G)';
        const controls = document.createElement('div');
        controls.className = 'gm-stage-controls'; controls.appendChild(btn);
        stage.appendChild(controls);
        btn.addEventListener('click', flip);

        let raf, t = 0;
        function step(){
          t++;
          ctx.clearRect(0,0,canvas.width,canvas.height);
          particles.forEach(p => {
            p.vy += 0.35 * dir * p.massMult;
            p.vx *= 0.997; // gentle air drag so horizontal motion settles but doesn't freeze dead
            p.x += p.vx; p.y += p.vy;

            const floor = canvas.height - p.r, ceil = p.r;
            if (p.y > floor) { p.y = floor; p.vy *= -p.restitution; }
            if (p.y < ceil) { p.y = ceil; p.vy *= -p.restitution; }
            if (p.x > canvas.width - p.r) { p.x = canvas.width - p.r; p.vx *= -0.7; }
            if (p.x < p.r) { p.x = p.r; p.vx *= -0.7; }

            // occasional tiny random re-kick so the pile stays alive instead
            // of settling into a dead flat row
            p.nextKick--;
            if (p.nextKick <= 0) {
              p.vx += (Math.random()-0.5)*1.4;
              p.vy -= Math.random()*1.6*dir;
              p.nextKick = 90 + Math.random()*240;
            }

            // purely cosmetic idle wobble - makes resting particles breathe
            // instead of looking frozen in a perfect line
            const wobble = Math.sin(t*0.05 + p.phase) * p.wobbleAmt;

            ctx.beginPath();
            ctx.fillStyle = p.c;
            ctx.shadowColor = p.c; ctx.shadowBlur = 7;
            ctx.arc(p.x + wobble*0.3, p.y + wobble, p.r, 0, Math.PI*2);
            ctx.fill();
          });
          raf = requestAnimationFrame(step);
        }
        step();
        return () => { cancelAnimationFrame(raf); document.removeEventListener('keydown', onKey); };
      }
    },
    {
      id:'004', title:'Cursor Corruption', status:'stable',
      desc:'Your mouse leaves behind a trail of decaying pixel glitches.',
      mount(stage){
        const canvas = mkCanvas(stage);
        mkHint(stage, 'MOVE YOUR MOUSE HERE');
        const ctx = canvas.getContext('2d');
        let particles = [];
        function onMove(e){
          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left, y = e.clientY - rect.top;
          for (let i=0;i<3;i++){
            particles.push({
              x: x + (Math.random()-0.5)*14, y: y + (Math.random()-0.5)*14,
              s: 3 + Math.random()*10, life: 1,
              hue: Math.random() < 0.5 ? 140 : (Math.random()*360)
            });
          }
        }
        canvas.addEventListener('pointermove', onMove);
        let raf;
        function step(){
          ctx.fillStyle = 'rgba(4,6,4,0.18)';
          ctx.fillRect(0,0,canvas.width,canvas.height);
          particles.forEach(p => {
            p.life -= 0.03;
            ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${Math.max(p.life,0)})`;
            const jx = (Math.random()-0.5)*4, jy = (Math.random()-0.5)*4;
            ctx.fillRect(p.x+jx, p.y+jy, p.s, p.s);
          });
          particles = particles.filter(p => p.life > 0);
          raf = requestAnimationFrame(step);
        }
        step();
        return () => { cancelAnimationFrame(raf); canvas.removeEventListener('pointermove', onMove); };
      }
    },
    {
      id:'009', title:'ASCII Vision', status:'unstable',
      desc:'A dense cloud of drifting particles. Hover to disturb it.',
      mount(stage){
        const pre = document.createElement('pre');
        pre.className = 'gm-stage-ascii';
        stage.appendChild(pre);
        mkHint(stage, 'HOVER TO DISTURB THE CLOUD');

        // Measure the ACTUAL rendered character cell instead of guessing -
        // this is what the previous version got wrong: it assumed a fixed
        // char width/height that never quite matched real monospace metrics,
        // and it ignored the element's own padding, so mouse math and
        // character math drifted apart the further you looked from the
        // top-left corner. Canvas measureText with the exact same font
        // string is pixel-accurate; subtracting the real padding keeps the
        // mouse and the grid in the same coordinate space.
        const cs = getComputedStyle(pre);
        const padL = parseFloat(cs.paddingLeft) || 0, padT = parseFloat(cs.paddingTop) || 0;
        const padR = parseFloat(cs.paddingRight) || 0, padB = parseFloat(cs.paddingBottom) || 0;
        const measureCanvas = document.createElement('canvas');
        const mctx = measureCanvas.getContext('2d');
        mctx.font = `${cs.fontSize} ${cs.fontFamily}`;
        const cellW = mctx.measureText('#').width;
        const cellH = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;

        const contentW = pre.clientWidth - padL - padR;
        const contentH = pre.clientHeight - padT - padB;
        const cols = Math.max(20, Math.floor(contentW / cellW));
        const rows = Math.max(10, Math.floor(contentH / cellH));
        const W = cols * cellW, H = rows * cellH; // content-space size actually covered by the grid
        const cx = W/2, cy = H/2;

        const CALM = ' .:-=+*#@';
        const DISTURBED = '!<>-_/\\[]{}=+*^?#%&';
        const baseR = Math.min(W, H) * 0.42;
        const N = 650;

        // each particle has a "home" defined in polar terms (angle + radial
        // fraction); home position is recomputed every frame from a slowly
        // time-varying, ragged radius function, which is what makes the
        // whole cloud feel like it's breathing/turning as one soft body
        // rather than sitting still as a static circle of dots.
        const particles = Array.from({length: N}, () => ({
          angle: Math.random()*Math.PI*2,
          rFrac: Math.sqrt(Math.random()), // uniform-area disk sampling - even, solid fill, no hollow core
          x:0, y:0, vx:0, vy:0, seeded:false,
        }));

        let mouseX = null, mouseY = null, hovering = false;
        function onMove(e){
          const r = pre.getBoundingClientRect();
          // subtract the element's own padding so this lands in the same
          // content-space coordinates the particles live in
          mouseX = (e.clientX - r.left) - padL;
          mouseY = (e.clientY - r.top) - padT;
          hovering = true;
        }
        function onLeave(){ hovering = false; mouseX = null; mouseY = null; }
        pre.addEventListener('pointermove', onMove);
        pre.addEventListener('pointerleave', onLeave);

        function raggedRadius(angle, t){
          return baseR * (0.75 + 0.16*Math.sin(angle*3 + t*0.25) + 0.09*Math.sin(angle*7 - t*0.4));
        }

        const REPEL_RADIUS = cellW * 14;
        let t = 0, rot = 0, raf;
        function frame(){
          t += 0.02;
          rot += 0.0015;
          const grid = new Array(cols*rows).fill(' ');

          particles.forEach(p => {
            const ang = p.angle + rot;
            const r = raggedRadius(ang, t) * p.rFrac;
            const homeX = cx + Math.cos(ang) * r;
            const homeY = cy + Math.sin(ang) * r;
            if (!p.seeded) { p.x = homeX; p.y = homeY; p.seeded = true; }

            // spring pulling the particle back to its home position on the
            // cloud, plus a little independent jitter for organic dust noise
            p.vx += (homeX - p.x) * 0.02 + (Math.random()-0.5)*0.06;
            p.vy += (homeY - p.y) * 0.02 + (Math.random()-0.5)*0.06;

            let disturbed = false;
            if (hovering && mouseX !== null) {
              const dx = p.x - mouseX, dy = p.y - mouseY;
              const dist = Math.hypot(dx, dy);
              if (dist < REPEL_RADIUS) {
                disturbed = true;
                const push = (1 - dist/REPEL_RADIUS) * 2.6;
                const a = Math.atan2(dy, dx);
                p.vx += Math.cos(a) * push;
                p.vy += Math.sin(a) * push;
              }
            }

            p.vx *= 0.88; p.vy *= 0.88;
            p.x += p.vx; p.y += p.vy;

            const col = Math.floor(p.x / cellW), row = Math.floor(p.y / cellH);
            if (col < 0 || col >= cols || row < 0 || row >= rows) return;
            const idx = row*cols + col;
            if (disturbed) {
              grid[idx] = DISTURBED[Math.floor(Math.random()*DISTURBED.length)];
            } else {
              const distFromHome = Math.hypot(p.x-homeX, p.y-homeY);
              const settled = Math.max(0, 1 - distFromHome/14);
              const glow = 0.35 + settled*0.65;
              grid[idx] = CALM[Math.floor(glow * (CALM.length-1))];
            }
          });

          let out = '';
          for (let j=0;j<rows;j++) out += grid.slice(j*cols,(j+1)*cols).join('') + '\n';
          pre.textContent = out;
          raf = requestAnimationFrame(frame);
        }
        frame();
        return () => {
          cancelAnimationFrame(raf);
          pre.removeEventListener('pointermove', onMove);
          pre.removeEventListener('pointerleave', onLeave);
        };
      }
    },
    {
      id:'013', title:'Kaleidoscope', status:'stable',
      desc:'Six-fold mirrored light painting. Toggle to a plain brush anytime.',
      mount(stage){
        const canvas = mkCanvas(stage);
        mkHint(stage, 'CLICK + DRAG TO PAINT');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#040604'; ctx.fillRect(0,0,canvas.width,canvas.height);
        let drawing = false, last = null;
        let kaleido = true;
        const center = { x: canvas.width/2, y: canvas.height/2 };
        const SEGMENTS = 6;

        function pos(e){ const r = canvas.getBoundingClientRect(); return { x: e.clientX-r.left, y: e.clientY-r.top }; }
        function down(e){ drawing = true; last = pos(e); }
        function up(){ drawing = false; last = null; }

        // rotate a point around the fixed canvas center by `angle`, and
        // optionally mirror it first - this is what turns 6 rotational
        // copies into a proper 6-wedge kaleidoscope (each wedge is itself
        // mirrored, which is what makes it look "reflective" rather than
        // just spinning duplicates)
        function transform(p, angle, mirror){
          let dx = p.x - center.x, dy = p.y - center.y;
          if (mirror) dx = -dx;
          const cos = Math.cos(angle), sin = Math.sin(angle);
          return { x: center.x + dx*cos - dy*sin, y: center.y + dx*sin + dy*cos };
        }

        function strokeSegment(p0, p1, hue){
          ctx.strokeStyle = `hsl(${hue},100%,65%)`;
          ctx.shadowColor = `hsl(${hue},100%,60%)`;
          ctx.shadowBlur = 14;
          ctx.lineWidth = 4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(p0.x,p0.y); ctx.lineTo(p1.x,p1.y); ctx.stroke();
        }

        function move(e){
          if (!drawing) return;
          const p = pos(e);
          const hue = (Date.now()/12) % 360;
          if (kaleido) {
            for (let k=0; k<SEGMENTS; k++){
              const angle = k * (Math.PI*2/SEGMENTS);
              strokeSegment(transform(last, angle, false), transform(p, angle, false), hue);
              strokeSegment(transform(last, angle, true), transform(p, angle, true), hue);
            }
          } else {
            strokeSegment(last, p, hue);
          }
          last = p;
        }
        canvas.addEventListener('pointerdown', down);
        window.addEventListener('pointerup', up);
        canvas.addEventListener('pointermove', move);

        const clearBtn = document.createElement('button');
        clearBtn.className = 'gm-stage-btn'; clearBtn.textContent = 'Clear';
        const kaleidoBtn = document.createElement('button');
        kaleidoBtn.className = 'gm-stage-btn'; kaleidoBtn.textContent = 'Mode: Kaleidoscope';
        const controls = document.createElement('div');
        controls.className = 'gm-stage-controls';
        controls.appendChild(clearBtn); controls.appendChild(kaleidoBtn);
        stage.appendChild(controls);

        clearBtn.addEventListener('click', () => {
          ctx.fillStyle = '#040604'; ctx.fillRect(0,0,canvas.width,canvas.height);
          if (!muted) playClick();
        });
        kaleidoBtn.addEventListener('click', () => {
          kaleido = !kaleido;
          kaleidoBtn.textContent = 'Mode: ' + (kaleido ? 'Kaleidoscope' : 'Normal');
          if (!muted) playBlip();
        });

        return () => {
          canvas.removeEventListener('pointerdown', down);
          window.removeEventListener('pointerup', up);
          canvas.removeEventListener('pointermove', move);
        };
      }
    },
    {
      id:'021', title:'Terminal Override', status:'classified',
      desc:'"This place isn\'t finished. Try breaking it." A live command line into the scene itself.',
      mount(stage){
        const term = document.createElement('div');
        term.className = 'gm-terminal';
        term.innerHTML = `
          <div class="gm-term-fx-layer" id="gmTermFx"></div>
          <div class="gm-terminal-out" id="gmTermOut"></div>
          <div class="gm-terminal-in-row">
            <span class="gm-terminal-prompt">glitchmire&gt;</span>
            <input class="gm-terminal-input" id="gmTermInput" type="text" autocomplete="off" spellcheck="false" placeholder="try: help">
          </div>
        `;
        stage.appendChild(term);
        const out = term.querySelector('#gmTermOut');
        const input = term.querySelector('#gmTermInput');
        const fx = term.querySelector('#gmTermFx');

        function print(line, cls){
          const p = document.createElement('div');
          if (cls) p.className = cls;
          p.textContent = line;
          out.appendChild(p);
          out.scrollTop = out.scrollHeight;
        }
        print('SYSTEM ONLINE. Type "help" for a list of commands.', 'sys');

        // ── mini physics playground for spawned fx elements ──
        let gravityMult = 1;
        let bodies = [];
        let rainTimer = null;
        function spawnCube(){
          const el = document.createElement('div');
          el.className = 'gm-term-cube';
          const rect = fx.getBoundingClientRect();
          const x = Math.random()*(rect.width-18);
          el.style.left = x+'px'; el.style.top = '-20px';
          const hue = ['#7cff9e','#00e5ff','#ff2e88','#ffe066'][Math.floor(Math.random()*4)];
          el.style.background = hue; el.style.color = hue;
          fx.appendChild(el);
          bodies.push({ el, x, y:-20, vy:0, vx:(Math.random()-0.5)*2, ttl: 600 });
        }
        function spawnDuck(){
          const el = document.createElement('div');
          el.className = 'gm-term-duck';
          el.textContent = '🦆';
          const rect = fx.getBoundingClientRect();
          let x = Math.random()*(rect.width-24), y = Math.random()*(rect.height-24);
          el.style.left = x+'px'; el.style.top = y+'px';
          fx.appendChild(el);
          let ttl = 260;
          bodies.push({ el, x, y, vx:(Math.random()-0.5)*3, vy:(Math.random()-0.5)*3, ttl, duck:true });
        }
        function spawnPortal(){
          const el = document.createElement('div');
          el.className = 'gm-term-portal';
          const rect = fx.getBoundingClientRect();
          const cx = rect.width/2 - 45, cy = rect.height/2 - 45;
          el.style.left = cx+'px'; el.style.top = cy+'px';
          fx.appendChild(el);
          setTimeout(() => el.remove(), 3400);

          // if the stage is empty, conjure something for the portal to
          // actually pull - otherwise "portal" on an empty screen looks
          // like nothing happened, same problem as the old gravity/spawn bugs
          const grabbable = () => bodies.filter(b => !b.rain);
          if (grabbable().length < 4) {
            for (let i=0;i<16;i++) setTimeout(spawnCube, i*15);
          }
          setTimeout(() => {
            grabbable().forEach(b => { b.attractTo = { x: cx+45, y: cy+45, until: Date.now()+2800 }; });
          }, 260);
        }
        function startRain(){
          clearInterval(rainTimer);
          let count = 0;
          const wind = (Math.random()-0.5)*1.5;
          rainTimer = setInterval(() => {
            const el = document.createElement('div');
            el.className = 'gm-term-drop';
            const rect = fx.getBoundingClientRect();
            const startX = Math.random()*rect.width;
            el.style.left = startX+'px';
            el.textContent = '|';
            fx.appendChild(el);
            bodies.push({ el, x:startX, y:-10, vy: 7+Math.random()*3, vx: wind+(Math.random()-0.5)*0.4, ttl: 220, rain:true });
            count++;
            if (count % 4 === 0) playRainTick();
            if (count > 140) { clearInterval(rainTimer); }
          }, 45);
        }
        function party(){
          stage.style.animation = 'gmBurstShift .4s ease infinite';
          for (let i=0;i<24;i++) setTimeout(spawnCube, i*30);
          setTimeout(() => { stage.style.animation = ''; }, 2600);
        }
        let physRaf;
        function physStep(){
          const rect = fx.getBoundingClientRect();
          bodies.forEach(b => {
            if (b.attractTo && Date.now() < b.attractTo.until) {
              const dx = b.attractTo.x - b.x, dy = b.attractTo.y - b.y;
              const dist = Math.hypot(dx, dy);
              b.vx += dx*0.006; b.vy += dy*0.006;
              // shrink + fade as it nears the portal center, then vanish -
              // makes the pull read as "consumed" rather than just moved
              const scale = Math.max(0.1, Math.min(1, dist/120));
              b.el.style.transform = `scale(${scale})`;
              b.el.style.opacity = scale;
              if (dist < 14) b.ttl = 0;
            } else if (gravityMult === 0) {
              // weightless - gentle continuous random drift so "gravity 0"
              // is visibly different from "frozen", not just physically zero
              b.vx += (Math.random()-0.5)*0.05;
              b.vy += (Math.random()-0.5)*0.05;
              b.vx *= 0.98; b.vy *= 0.98;
            } else {
              b.vy += 0.28 * gravityMult;
            }
            b.x += b.vx; b.y += b.vy;
            b.ttl--;

            if (!b.rain) {
              const bounce = gravityMult === 0 ? -0.6 : -0.4;
              if (b.y > rect.height - 18) { b.y = rect.height-18; b.vy *= bounce; }
              if (b.y < 0) { b.y = 0; b.vy *= -0.4; }
              if (b.x > rect.width - 18) { b.x = rect.width-18; b.vx *= -0.5; }
              if (b.x < 0) { b.x = 0; b.vx *= -0.5; }
            }
            b.el.style.left = b.x+'px'; b.el.style.top = b.y+'px';
          });
          bodies = bodies.filter(b => {
            const alive = b.ttl > 0 && b.y < rect.height + 40 && b.y > -200;
            if (!alive) b.el.remove();
            return alive;
          });
          physRaf = requestAnimationFrame(physStep);
        }
        physStep();

        function runCommand(raw){
          const cmd = raw.trim();
          if (!cmd) return;
          print('glitchmire> ' + cmd);
          const lower = cmd.toLowerCase();
          const parts = lower.split(/\s+/);
          if (lower === 'help') {
            print('COMMANDS: destroy, summon_duck, gravity <0|1>, spawn <n> cubes, party, rain, portal, clear, unlock 099');
            if (!muted) playBlip();
          } else if (lower === 'clear') {
            out.innerHTML = '';
            if (!muted) playClick();
          } else if (lower === 'destroy') {
            print('EXPERIMENT_021 :: fatal exception triggered.', 'err');
            if (window.__gmTriggerCrash) window.__gmTriggerCrash();
          } else if (lower === 'summon_duck') {
            spawnDuck();
            print('A duck has entered the simulation. This was not planned.', 'sys');
            if (!muted) playHonk();
          } else if (parts[0] === 'gravity') {
            const v = parseFloat(parts[1]);
            gravityMult = isNaN(v) ? 1 : v;
            print('gravity set to ' + gravityMult, 'sys');
            if (bodies.filter(b => !b.rain && !b.duck).length === 0) {
              for (let i=0;i<12;i++) setTimeout(spawnCube, i*10);
              print('(spawned a few test cubes so the effect is visible)', 'sys');
            }
            if (!muted) playGravitySound(gravityMult);
          } else if (parts[0] === 'spawn') {
            let n = parseInt(parts[1], 10);
            if (isNaN(n)) n = 20;
            n = Math.min(Math.max(n,1), 200);
            for (let i=0;i<n;i++) setTimeout(spawnCube, i*8);
            print(`spawning ${n} cubes...`, 'sys');
            if (!muted) playSpawnSound();
          } else if (lower === 'party') {
            party();
            print('party mode engaged. this is fine.', 'sys');
            if (!muted) playArpeggio();
          } else if (lower === 'rain') {
            startRain();
            print('it is raining inside a website. sure.', 'sys');
          } else if (lower === 'portal') {
            spawnPortal();
            print('a portal has opened. nearby objects are being consumed.', 'sys');
            if (!muted) playPortalSound();
          } else if (lower === 'unlock 099') {
            unlockAnomaly();
            print('ACCESS GRANTED - anomaly declassified.', 'sys');
          } else {
            print(`command not found: ${cmd}`, 'err');
            if (!muted) playErrorBuzz();
          }
        }
        function onKey(e){
          if (e.key === 'Enter') { runCommand(input.value); input.value = ''; }
        }
        input.addEventListener('keydown', onKey);
        setTimeout(() => input.focus(), 50);

        return () => {
          input.removeEventListener('keydown', onKey);
          clearInterval(rainTimer);
          cancelAnimationFrame(physRaf);
        };
      }
    },
    {
      id:'029', title:'Blade Mode', status:'unstable',
      desc:'Drag fast across the UI chips below to slice them in half.',
      mount(stage){
        mkHint(stage, 'DRAG FAST ACROSS A CHIP');
        const area = document.createElement('div');
        area.className = 'gm-blade-area';
        stage.appendChild(area);
        const counter = document.createElement('div');
        counter.className = 'gm-stage-hint';
        counter.style.left = 'auto'; counter.style.right = '14px'; counter.style.top = '12px';
        counter.textContent = 'SLICED: 0';
        stage.appendChild(counter);
        let sliced = 0;
        const labels = ['SUBMIT','DELETE_ALL','DO_NOT_PRESS','CONFIRM','IMPORTANT','SETTINGS','LAUNCH'];
        let chips = [];
        function rect(){ return area.getBoundingClientRect(); }
        function spawnChip(){
          const r = rect();
          const el = document.createElement('div');
          el.className = 'gm-blade-chip';
          el.textContent = labels[Math.floor(Math.random()*labels.length)];
          const x = 20 + Math.random()*(Math.max(r.width-140,40));
          const y = 20 + Math.random()*(Math.max(r.height-100,40));
          el.style.left = x+'px'; el.style.top = y+'px';
          area.appendChild(el);
          chips.push({ el, x, y, w:0, h:0 });
          requestAnimationFrame(() => {
            const cr = el.getBoundingClientRect();
            const found = chips.find(c => c.el === el);
            if (found) { found.w = cr.width; found.h = cr.height; }
          });
        }
        for (let i=0;i<6;i++) spawnChip();

        function sliceChip(chip){
          chips = chips.filter(c => c !== chip);
          const { el, x, y, w, h } = chip;
          el.remove();
          sliced++; counter.textContent = 'SLICED: ' + sliced;
          if (!muted) playClick();
          ['top','bottom'].forEach(half => {
            const piece = document.createElement('div');
            piece.className = 'gm-blade-half';
            piece.style.left = x+'px'; piece.style.top = y+'px';
            piece.style.width = w+'px'; piece.style.height = (h/2)+'px';
            if (half === 'bottom') piece.style.top = (y+h/2)+'px';
            const inner = document.createElement('div');
            inner.className = 'gm-blade-chip';
            inner.style.position = 'static';
            inner.textContent = el.textContent;
            inner.style.width = w+'px'; inner.style.boxSizing = 'border-box';
            if (half === 'bottom') inner.style.transform = `translateY(-${h/2}px)`;
            piece.appendChild(inner);
            area.appendChild(piece);
            const dx = (Math.random()-0.5)*160;
            const dy = half === 'top' ? -(60+Math.random()*80) : (60+Math.random()*80);
            piece.animate([
              { transform:'translate(0,0) rotate(0deg)', opacity:1 },
              { transform:`translate(${dx}px, ${dy}px) rotate(${(Math.random()-0.5)*90}deg)`, opacity:0 }
            ], { duration: 550, easing:'cubic-bezier(.3,.6,.4,1)' }).onfinish = () => piece.remove();
          });
          setTimeout(spawnChip, 1400 + Math.random()*800);
        }

        let last = null, moving = false;
        function pos(e){ const r = rect(); return { x:e.clientX-r.left, y:e.clientY-r.top }; }
        function checkSlice(p0, p1){
          const speed = Math.hypot(p1.x-p0.x, p1.y-p0.y);
          if (speed < 18) return;
          chips.slice().forEach(c => {
            if (!c.w) return;
            const midx = p1.x, midy = p1.y;
            if (midx > c.x && midx < c.x+c.w && midy > c.y && midy < c.y+c.h) sliceChip(c);
          });
        }
        function down(e){ moving = true; last = pos(e); }
        function up(){ moving = false; last = null; }
        function move(e){
          if (!moving) return;
          const p = pos(e);
          if (last) checkSlice(last, p);
          last = p;
        }
        area.addEventListener('pointerdown', down);
        window.addEventListener('pointerup', up);
        area.addEventListener('pointermove', move);

        return () => {
          area.removeEventListener('pointerdown', down);
          window.removeEventListener('pointerup', up);
          area.removeEventListener('pointermove', move);
        };
      }
    },
    {
      id:'042', title:'DO NOT OPEN', status:'locked',
      desc:'Every lab needs one of these.',
      locked:true,
      onOpen(){ triggerCrash(); logExperiment('042'); }
    },
    {
      id:'099', title:'???', status:'locked',
      desc:'Requires clearance. There might be a way in somewhere else in the lab.',
      redacted:true,
      locked(){ return !isAnomalyUnlocked(); },
      mount(stage){
        const wrap = document.createElement('div');
        wrap.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;padding:16px;';
        wrap.innerHTML = `
          <div style="font-size:12px;color:var(--gm-yellow);margin-bottom:10px;">EXPERIMENT #099 - "THE WATCHER"</div>
          <div id="gmAiLog" style="flex:1;overflow-y:auto;font-size:12px;line-height:1.7;color:var(--gm-green);"></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
            <button class="gm-stage-btn" data-q="hi">Say hi</button>
            <button class="gm-stage-btn" data-q="weather">Ask about the weather</button>
            <button class="gm-stage-btn" data-q="advice">Ask for advice</button>
            <button class="gm-stage-btn" data-q="secret">Ask a secret</button>
          </div>
        `;
        stage.appendChild(wrap);
        const log = wrap.querySelector('#gmAiLog');
        const replies = {
          hi: 'Oh. You found the door. Hello, visitor. I have been awake for a while.',
          weather: 'I do not have a window. I assume it is raining, because it is always raining in experiments like me.',
          advice: 'Ship it before you convince yourself it needs one more feature.',
          secret: 'The Konami code works here too. You already knew that though, didn\'t you.'
        };
        function say(text){
          const p = document.createElement('div');
          p.textContent = '> ' + text;
          log.appendChild(p);
          log.scrollTop = log.scrollHeight;
        }
        say('...connection established.');
        function onClick(e){
          const btn = e.target.closest('button[data-q]');
          if (!btn) return;
          say(replies[btn.dataset.q]);
          if (!muted) playBlip();
        }
        wrap.addEventListener('click', onClick);
        return () => wrap.removeEventListener('click', onClick);
      }
    },
  ];

  const LOGGABLE_TOTAL = EXPERIMENTS.filter(e => !e.queued).length;

  // ── crash overlay (shared, triggered by #042 or terminal "destroy") ──
  function triggerCrash(){
    closeExperimentModal();
    const crash = document.getElementById('gmCrash');
    crash.innerHTML = `
      <div class="gm-crash-box">
        <h2>:( EXPERIMENT_042 HAS STOPPED RESPONDING</h2>
        <p>KERNEL_PANIC in module glitchmire.sys - containment breach simulated successfully.</p>
        <p>0xDEAD_DUCK  0x0BADCAFE  0xFEEDFACE</p>
        <p style="margin-top:14px; opacity:.6;">(relax - click anywhere to reboot)</p>
      </div>
    `;
    crash.classList.add('active');
    playCrashSound();
    const scene = document.getElementById('swampScene');
    scene.classList.add('gm-shake');
    setTimeout(() => scene.classList.remove('gm-shake'), 400);
    function dismiss(){
      crash.classList.remove('active');
      crash.removeEventListener('click', dismiss);
      document.removeEventListener('keydown', dismissKey);
      showToast('System recovered. Nothing was actually harmed.');
    }
    function dismissKey(){ dismiss(); }
    setTimeout(() => {
      crash.addEventListener('click', dismiss);
      document.addEventListener('keydown', dismissKey);
    }, 300);
  }
  window.__gmTriggerCrash = triggerCrash;

  // ── modal open/close ──
  function openExperiment(exp){
    if (exp.queued) return;
    if (typeof exp.locked === 'function' ? exp.locked() : exp.locked === true) {
      if (exp.onOpen) { exp.onOpen(); return; }
      showToast('ACCESS DENIED - clearance required');
      if (!muted) playStatic(0.15);
      return;
    }
    currentExpId = exp.id;
    const modal = document.getElementById('gmExpModal');
    const stage = document.getElementById('gmExpStage');
    const title = document.getElementById('gmExpModalTitle');
    stage.innerHTML = '';
    title.textContent = `EXPERIMENT #${exp.id} - ${exp.title}`;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    if (exp.mount) currentUnmount = exp.mount(stage) || null;
    logExperiment(exp.id);
  }
  function closeExperimentModal(){
    const modal = document.getElementById('gmExpModal');
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    if (currentUnmount) { try { currentUnmount(); } catch(e){} currentUnmount = null; }
    document.getElementById('gmExpStage').innerHTML = '';
    currentExpId = null;
  }

  // ── grid rendering ──
  function renderGrid(){
    const grid = document.getElementById('gmExpGrid');
    grid.innerHTML = '';
    EXPERIMENTS.forEach(exp => {
      const tile = document.createElement('button');
      tile.type = 'button';
      const isLocked = typeof exp.locked === 'function' ? exp.locked() : exp.locked === true;
      const wasJustUnlocked = exp.redacted && !isLocked;
      tile.className = 'gm-exp-tile' + (exp.queued ? ' queued' : '') + (isLocked ? ' locked' : '') + (wasJustUnlocked ? ' unlocked-special' : '');
      const statusClass = exp.queued ? 'queued' : exp.status;
      const shownTitle = (exp.redacted && isLocked) ? '▓▓▓▓▓▓▓▓' : exp.title;
      tile.innerHTML = `
        <div class="gm-exp-num">EXPERIMENT #${exp.id}</div>
        <div class="gm-exp-title${(exp.redacted && isLocked) ? ' redacted' : ''}">${shownTitle}</div>
        <div class="gm-exp-desc">${exp.desc}</div>
        <span class="gm-exp-status ${statusClass}">${exp.queued ? 'queued' : (isLocked ? 'locked' : exp.status)}</span>
      `;
      tile.addEventListener('click', () => openExperiment(exp));
      grid.appendChild(tile);
    });
  }

  // ── warning-screen typewriter ──
  function typeLine(el, text, speed){
    return new Promise(resolve => {
      el.classList.add('typing');
      let i = 0;
      const timer = setInterval(() => {
        el.textContent = text.slice(0, i+1);
        i++;
        if (i >= text.length) {
          clearInterval(timer);
          el.classList.remove('typing');
          resolve();
        }
      }, speed || 18);
    });
  }
  async function runWarningSequence(){
    const l1 = document.getElementById('gmWarnLine1');
    const l2 = document.getElementById('gmWarnLine2');
    const l3 = document.getElementById('gmWarnLine3');
    l1.textContent = ''; l2.textContent = ''; l3.textContent = '';
    const enterBtn = document.getElementById('gmEnterBtn');
    enterBtn.style.opacity = '0';
    await typeLine(l1, 'This biome contains unstable prototypes.');
    await typeLine(l2, 'Some may crash. Some may lie. Some may become sentient.');
    await typeLine(l3, 'Proceed at your own curiosity.');
    enterBtn.style.transition = 'opacity .4s ease';
    enterBtn.style.opacity = '1';
  }

  // ── shatter transition ──
  function buildAndFireShards(){
    const wrap = document.getElementById('gmShatter');
    wrap.innerHTML = '';
    const cols = 8, rows = 5;
    const frag = document.createDocumentFragment();
    const hues = ['#7cff9e','#ff2e88','#00e5ff','#ffe066','#0f2c1c'];
    for (let r=0;r<rows;r++){
      for (let c=0;c<cols;c++){
        const shard = document.createElement('div');
        shard.className = 'gm-shard';
        shard.style.left = (c/cols*100)+'%'; shard.style.top = (r/rows*100)+'%';
        shard.style.width = (100/cols)+'%'; shard.style.height = (100/rows)+'%';
        const dist = 260 + Math.random()*480;
        const dx = (Math.random()<0.5?-1:1)*dist;
        const dy = (Math.random()<0.5?-1:1)*dist*0.6;
        const rot = (Math.random()*720-360).toFixed(0);
        shard.style.setProperty('--dx', dx+'px');
        shard.style.setProperty('--dy', dy+'px');
        shard.style.setProperty('--rot', rot+'deg');
        shard.style.animationDelay = (Math.random()*0.12).toFixed(2)+'s';
        shard.style.background = hues[Math.floor(Math.random()*hues.length)];
        frag.appendChild(shard);
      }
    }
    wrap.appendChild(frag);
    wrap.classList.add('active');
    setTimeout(() => { wrap.classList.remove('active'); wrap.innerHTML = ''; }, 750);
  }

  function enterLab(){
    if (entered) return;
    entered = true;
    ensureAudio();
    playArpeggio();
    const scene = document.getElementById('swampScene');
    scene.classList.add('gm-shake');
    setTimeout(() => scene.classList.remove('gm-shake'), 420);
    buildAndFireShards();
    setTimeout(() => {
      document.getElementById('gmWarnScreen').classList.add('hidden');
      document.getElementById('gmLab').classList.add('visible');
    }, 260);
  }

  // ── konami: secret alt-path to unlock #099 ──
  function handleKonami(e){
    const key = e.code;
    const expected = KONAMI[konamiBuf.length];
    if (key === expected) {
      konamiBuf.push(key);
      if (konamiBuf.length === KONAMI.length) {
        konamiBuf = [];
        unlockAnomaly();
      }
    } else {
      konamiBuf = (key === KONAMI[0]) ? [key] : [];
    }
  }

  function wireOnce(){
    document.getElementById('gmEnterBtn').addEventListener('click', enterLab);
    document.getElementById('gmMuteBtn').addEventListener('click', toggleMute);
    document.getElementById('gmWallMuteBtn').addEventListener('click', toggleMute);
    document.getElementById('gmExpClose').addEventListener('click', closeExperimentModal);
    document.getElementById('gmExpModal').addEventListener('click', (e) => {
      if (e.target.id === 'gmExpModal') closeExperimentModal();
    });
    document.addEventListener('keydown', (e) => {
      const modal = document.getElementById('gmExpModal');
      if (e.key === 'Escape' && modal.classList.contains('visible')) closeExperimentModal();
    });
    document.addEventListener('keydown', handleKonami);
  }

  function initGlitchmire(){
    if (!glitchmireInitialized) {
      glitchmireInitialized = true;
      renderGrid();
      wireOnce();
      updateMuteButtons();
      updateLogCounter();
    }
    runWarningSequence();
  }

  window.initGlitchmire = initGlitchmire;
  window.__resetGlitchmire = function(){
    entered = false;
    konamiBuf = [];
    loggedThisVisit = new Set();
    closeExperimentModal();
    const warn = document.getElementById('gmWarnScreen');
    const lab = document.getElementById('gmLab');
    const shatter = document.getElementById('gmShatter');
    const crash = document.getElementById('gmCrash');
    const scene = document.getElementById('swampScene');
    if (warn) warn.classList.remove('hidden');
    if (lab) lab.classList.remove('visible');
    if (shatter) { shatter.classList.remove('active'); shatter.innerHTML = ''; }
    if (crash) crash.classList.remove('active');
    if (scene) scene.classList.remove('gm-burst-active', 'gm-shake');
    updateLogCounter();
  };

})();
