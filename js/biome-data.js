// ---------- BIOME METADATA ----------
const BIOME_INFO = {
  forest:    { icon:'🌲', desc:'The origin story: how the journey into code began.' },
  mountain:  { icon:'⛰️', desc:'Skills & mastery, charted like a climb to the summit.' },
  castle:    { icon:'🏰', desc:'The games library: playable projects behind these walls.' },
  village:   { icon:'🏘️', desc:'The devlog: workshop notes, one house per entry.' },
  lighthouse:{ icon:'🗼', desc:'Contact & about, the fastest way to reach me.' },
  swamp:     { icon:'🌀', desc:'The Glitchmire: pure chaos, fandoms, and experiments.' },
  siteseeing:{ icon:'🧭', desc:'Shipped websites: a row of signposts to live work.' },
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------- PERFORMANCE MODE ----------
// Mobile phones run the same canvas/particle/blur-heavy scene as desktop,
// which is what causes the lag. PERF_MODE auto-detects a phone-class device
// (touch-primary + narrow viewport, or touch-primary + few CPU cores for
// older/budget phones) and is used everywhere as a "turn it down, don't turn
// it off" switch: fewer particles, lower spawn rates, capped canvas
// resolution, no backdrop blur. Nothing is hidden or removed - every biome,
// section and piece of content still renders exactly the same on mobile,
// only the background animation *load* is reduced. Desktop/laptop browsers
// are completely unaffected since this only ever evaluates true on
// touch + small-screen or touch + low-core devices.
const PERF_MODE = (() => {
  // QA override: ?perf=1 forces it on (test on desktop without a phone),
  // ?perf=0 forces it off (test the full-fat scene on a phone). Anything
  // else falls back to real auto-detection.
  try {
    const override = new URLSearchParams(location.search).get('perf');
    if (override === '1') return true;
    if (override === '0') return false;
  } catch (e) { /* ignore malformed URL, fall through to auto-detect */ }

  try {
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (!coarsePointer) return false; // never trims a mouse/trackpad (desktop/laptop) session
    const narrowViewport = window.matchMedia('(max-width: 900px)').matches;
    const lowCores = (navigator.hardwareConcurrency || 8) <= 4;
    return narrowViewport || lowCores;
  } catch (e) {
    return false;
  }
})();
document.documentElement.classList.toggle('perf-mode', PERF_MODE);

// Effective devicePixelRatio to render canvases at. Mobile GPUs redraw
// canvas backing stores every frame, and cost scales with pixel count
// (~DPR^2), so a DPR-3 phone can be doing 9x the fill-rate work of a
// DPR-1 canvas for the same visual size. Cap it hard in perf mode.
const PERF_DPR = PERF_MODE ? 1 : Math.min(window.devicePixelRatio || 1, 2);