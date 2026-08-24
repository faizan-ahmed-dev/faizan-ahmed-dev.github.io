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