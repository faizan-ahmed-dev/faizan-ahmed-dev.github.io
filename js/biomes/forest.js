        (function() {
            'use strict';

            // ----- ILLUSTRATIONS (extracted to static object) -----
            const ILLUSTRATIONS = {
                'player-one': `<svg class="ill-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="transparent"/>
  <g fill="none" stroke="#3d2b17" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.82">
    <!-- CRT monitor body -->
    <rect x="95" y="70" width="210" height="160" rx="10"/>
    <rect x="118" y="92" width="164" height="116" rx="4"/>
    <!-- stand -->
    <path d="M175 230 L165 258 L235 258 L225 230"/>
    <line x1="150" y1="258" x2="250" y2="258"/>
  </g>
  <!-- screen scene -->
  <g opacity="0.6">
    <circle cx="235" cy="130" r="16" fill="#c9a86a" opacity="0.55"/>
    <path d="M118 190 L160 150 L195 178 L228 138 L282 190 Z" fill="#2d5a27" opacity="0.5"/>
  </g>
  <!-- game controller -->
  <g fill="none" stroke="#3d2b17" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.82">
    <path d="M120 300 Q120 278 145 278 L255 278 Q280 278 280 300 L276 322 Q272 336 256 332 L244 312 L156 312 L144 332 Q128 336 124 322 Z"/>
    <line x1="150" y1="286" x2="150" y2="304"/>
    <line x1="141" y1="295" x2="159" y2="295"/>
  </g>
  <circle cx="245" cy="290" r="5" fill="#c9a86a" opacity="0.7"/>
  <circle cx="262" cy="300" r="5" fill="#c9a86a" opacity="0.55"/>
  <circle cx="245" cy="310" r="5" fill="#c9a86a" opacity="0.4"/>
  <!-- sparkles -->
  <text x="330" y="70" font-size="22" fill="#c9a86a" opacity="0.55">✦</text>
  <text x="55" y="110" font-size="15" fill="#c9a86a" opacity="0.4">✦</text>
  <text x="320" y="330" font-size="18" fill="#c9a86a" opacity="0.45">✦</text>
</svg>`,
                'mentor': `<svg class="ill-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="transparent"/>
  <g fill="none" stroke="#3d2b17" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.82">
    <!-- laptop screen -->
    <rect x="110" y="90" width="180" height="130" rx="8"/>
    <!-- laptop base -->
    <path d="M90 240 L310 240 L296 220 L104 220 Z"/>
    <line x1="70" y1="240" x2="330" y2="240"/>
  </g>
  <!-- screen content: play button -->
  <circle cx="200" cy="155" r="34" fill="#2d5a27" opacity="0.45"/>
  <path d="M190 138 L222 155 L190 172 Z" fill="#f4ede4" opacity="0.85"/>
  <!-- little devlog progress bar -->
  <rect x="130" y="195" width="140" height="6" rx="3" fill="#3d2b17" opacity="0.25"/>
  <rect x="130" y="195" width="80" height="6" rx="3" fill="#c9a86a" opacity="0.65"/>
  <!-- speech / idea bubble to the side -->
  <g fill="none" stroke="#c9a86a" stroke-width="2.4" opacity="0.55">
    <path d="M300 100 Q330 100 330 128 Q330 150 305 152 L296 168 L298 150 Q272 146 272 124 Q272 100 300 100Z"/>
  </g>
  <text x="292" y="132" font-size="20" fill="#c9a86a" opacity="0.6">?</text>
  <!-- sparkles -->
  <text x="60" y="90" font-size="20" fill="#c9a86a" opacity="0.4">✦</text>
  <text x="330" y="290" font-size="16" fill="#c9a86a" opacity="0.4">✦</text>
  <text x="70" y="290" font-size="14" fill="#c9a86a" opacity="0.35">✦</text>
</svg>`,
                'process': `<svg class="ill-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="transparent"/>
  <g fill="none" stroke="#3d2b17" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.82">
    <!-- game viewport window -->
    <rect x="90" y="110" width="180" height="140" rx="8"/>
    <line x1="90" y1="134" x2="270" y2="134"/>
    <circle cx="106" cy="122" r="4" fill="#3d2b17" opacity="0.5" stroke="none"/>
    <circle cx="120" cy="122" r="4" fill="#3d2b17" opacity="0.5" stroke="none"/>
  </g>
  <!-- little character block hopping -->
  <rect x="130" y="195" width="26" height="26" rx="4" fill="#2d5a27" opacity="0.5"/>
  <path d="M100 221 L280 221" stroke="#3d2b17" stroke-width="2.4" opacity="0.35"/>
  <rect x="200" y="205" width="18" height="16" rx="2" fill="#c9a86a" opacity="0.5"/>
  <!-- gear (the "engine" / building process) -->
  <g fill="none" stroke="#c9a86a" stroke-width="3" opacity="0.6">
    <circle cx="300" cy="290" r="26"/>
    <circle cx="300" cy="290" r="10"/>
    <g stroke-linecap="round">
      <line x1="300" y1="256" x2="300" y2="266"/>
      <line x1="300" y1="314" x2="300" y2="324"/>
      <line x1="266" y1="290" x2="276" y2="290"/>
      <line x1="324" y1="290" x2="334" y2="290"/>
      <line x1="277" y1="267" x2="284" y2="274"/>
      <line x1="316" y1="306" x2="323" y2="313"/>
      <line x1="323" y1="267" x2="316" y2="274"/>
      <line x1="284" y1="306" x2="277" y2="313"/>
    </g>
  </g>
  <!-- sparkles -->
  <text x="335" y="110" font-size="18" fill="#c9a86a" opacity="0.5">✦</text>
  <text x="55" y="150" font-size="14" fill="#c9a86a" opacity="0.4">✦</text>
  <text x="70" y="320" font-size="16" fill="#c9a86a" opacity="0.35">✦</text>
</svg>`,
                'ricochet': `<svg class="ill-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="transparent"/>
  <g fill="none" stroke="#3d2b17" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.8">
    <rect x="70" y="70" width="260" height="260" rx="6"/>
  </g>
  <!-- ricochet path -->
  <polyline points="105,240 165,140 235,240 300,150" fill="none" stroke="#2d5a27" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.68" stroke-dasharray="2 10"/>
  <!-- bounce points -->
  <circle cx="165" cy="140" r="7" fill="#c9a86a" opacity="0.75"/>
  <circle cx="235" cy="240" r="7" fill="#c9a86a" opacity="0.75"/>
  <!-- start (player) -->
  <circle cx="105" cy="240" r="10" fill="#3d2b17" opacity="0.6"/>
  <!-- end burst (impact) -->
  <g stroke="#3d2b17" stroke-width="2.6" stroke-linecap="round" opacity="0.6">
    <line x1="300" y1="150" x2="316" y2="134"/>
    <line x1="300" y1="150" x2="320" y2="150"/>
    <line x1="300" y1="150" x2="316" y2="166"/>
  </g>
  <!-- small OOP brackets motif -->
  <text x="90" y="330" font-size="26" font-family="Georgia, serif" fill="#3d2b17" opacity="0.4">{ }</text>
  <text x="330" y="90" font-size="20" fill="#c9a86a" opacity="0.5">✦</text>
  <text x="60" y="90" font-size="14" fill="#c9a86a" opacity="0.4">✦</text>
</svg>`,
                'curious': `<svg class="ill-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="transparent"/>
  <!-- window being examined -->
  <g fill="none" stroke="#3d2b17" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.75">
    <rect x="90" y="150" width="180" height="130" rx="8"/>
    <line x1="90" y1="174" x2="270" y2="174"/>
  </g>
  <rect x="108" y="188" width="90" height="8" rx="3" fill="#2d5a27" opacity="0.4"/>
  <rect x="108" y="204" width="130" height="8" rx="3" fill="#3d2b17" opacity="0.22"/>
  <rect x="108" y="220" width="70" height="8" rx="3" fill="#3d2b17" opacity="0.22"/>
  <rect x="108" y="236" width="110" height="8" rx="3" fill="#c9a86a" opacity="0.4"/>
  <!-- magnifying glass, large and central -->
  <g fill="none" stroke="#c9a86a" stroke-width="4" stroke-linecap="round">
    <circle cx="255" cy="150" r="44" opacity="0.75"/>
    <line x1="286" y1="181" x2="320" y2="215" opacity="0.75"/>
  </g>
  <circle cx="255" cy="150" r="44" fill="#f4ede4" opacity="0.5"/>
  <text x="238" y="162" font-size="34" fill="#3d2b17" opacity="0.5">?</text>
  <!-- sparkles -->
  <text x="60" y="100" font-size="22" fill="#c9a86a" opacity="0.4">✦</text>
  <text x="330" y="270" font-size="18" fill="#c9a86a" opacity="0.4">✦</text>
  <text x="70" y="320" font-size="14" fill="#c9a86a" opacity="0.35">✦</text>
</svg>`,
                'ocean': `<svg class="ill-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="transparent"/>
  <!-- horizon -->
  <line x1="50" y1="190" x2="350" y2="190" stroke="#3d2b17" stroke-width="2" opacity="0.3"/>
  <!-- sun/moon -->
  <circle cx="300" cy="130" r="26" fill="#c9a86a" opacity="0.5"/>
  <!-- waves -->
  <g fill="none" stroke="#2d5a27" stroke-width="3" stroke-linecap="round" opacity="0.55">
    <path d="M50 220 Q90 200 130 220 Q170 240 210 220 Q250 200 290 220 Q320 235 350 220"/>
    <path d="M50 255 Q95 235 140 255 Q185 275 230 255 Q275 235 350 255" opacity="0.75"/>
  </g>
  <g fill="none" stroke="#3d2b17" stroke-width="3" stroke-linecap="round" opacity="0.4">
    <path d="M50 290 Q100 272 150 290 Q200 308 250 290 Q300 272 350 290"/>
  </g>
  <!-- tiny boat riding a wave -->
  <g stroke="#3d2b17" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.75">
    <path d="M168 244 L232 244 L218 260 L182 260 Z"/>
    <line x1="200" y1="244" x2="200" y2="215"/>
    <path d="M200 217 L226 232 L200 238 Z" fill="#c9a86a" opacity="0.6" stroke="none"/>
  </g>
  <!-- single drop above, falling toward the ocean -->
  <path d="M300 60 Q312 78 312 90 Q312 104 300 104 Q288 104 288 90 Q288 78 300 60Z" fill="#c9a86a" opacity="0.6"/>
  <!-- sparkles -->
  <text x="70" y="90" font-size="16" fill="#c9a86a" opacity="0.4">✦</text>
  <text x="140" y="70" font-size="12" fill="#c9a86a" opacity="0.35">✦</text>
  <text x="60" y="330" font-size="18" fill="#c9a86a" opacity="0.35">∞</text>
</svg>`
            };

            // ----- CHAPTER DATA -----
            const CHAPTERS = [{
                id: 'ch1',
                title: 'Player One',
                text: `<p>Ever since I was a kid, I have loved video games. I played them all the day during my weekends. I grew up on games like GTA vice city, Plants vs Zombies, Metal Slug, Project IGI, Mario, Need for Speed etc. I still play games like Call of Duty, GTA V, Just Cause 3, Watch Dogs, Sleeping Dogs, Batman Arkham City. Basically, I have played games my whole life and I absolutely adore story games. I love the art, story, cinematics, soundtracks and physics mechanics and ragdolls.</p>`,
                illustration: 'player-one'
            }, {
                id: 'ch2',
                title: 'Someone Who Changed My Life',
                text: `<p>Somewhere along the way, I realized I did not just want to play video games, I wanted to create them. And then I discovered someone that changed my life. A youtuber named Dani. He used to make video games in 2D and 3D and he loved ragdolls. I really liked his devlogs and his sense of humor. I watched all of his old videos in a matter of days. I downloaded and played his games. In fact, I studied them. </p><p>It was then I had decided that my life goal is to become a game developer. I planned what I had to do. I chose Computer Science in High School. After that, I applied for Bachelors in Computer Science to all the major universities in Pakistan. I got accepted in all four in which I had applied. And thus began my journey…</p>`,
                illustration: 'mentor'
            }, {
                id: 'ch3',
                title: 'The Process, Not the Prize',
                text: `<p>One day I was browsing YouTube and stumbled upon a video titled “How to make a Video Game - Godot Beginner Tutorial.” It was then when I discovered the second biggest influence on my career, Brackeys. He had uploaded many tutorials on Unity. It was his first Godot tutorial. I clicked on the video, downloaded Godot and followed it all the way through.</p><p>I enjoyed the process of making the game so much that it was that moment when I realized that this is actually what I genuinely love and want to do for the rest of my life. At the completion of the game, it didn’t matter to me how the game turned out. What mattered to me was the process and journey of making it.</p>`,
                illustration: 'process'
            }, {
                id: 'ch4',
                title: 'Bullets That Bounce Back',
                text: `<p>Nothing really broke me, but one game pushed me to the limits of what I knew about game mechanics at the time. We were tasked with a video game project for our Object-Oriented Programming course, with a twist: no game engine allowed. It had to be built in WinForms, in C#, following OOP principles.</p><p>The teacher had only shown us how to make a basic space shooter. I didn't want to copy that. I thought about it for a couple of days and landed on an idea: bullets that ricochet off walls, and can hurt the player who fired them. It sounded good in theory. Implementing it was hell. We got Eid holidays before the deadline, and I worked through them anyway, because underneath the difficulty, it was genuinely fun.</p>`,
                illustration: 'ricochet',
                hasLink: true
            }, {
                id: 'ch5',
                title: 'A Different Kind of Curious',
                text: `<p>My first year taught me more than I had expected. I faced constant deadlines for assignments and projects. Still, I wanted to learn more stuff on my own. It was hard, but looking back, the hours spent on these projects were well worth it. I learned teamwork and discipline. </p><p>I have always been somewhat curious. When I started, whenever I looked at a website, a game or a system, I wondered how it was made. Now, I think, how I can make something like that and then I get to making it.</p>`,
                illustration: 'curious'
            }, {
                id: 'finale',
                title: 'A Drop in the Ocean',
                text: `<p>Everything I have learned in my first year is a drop in the ocean. There is still much more to learn. The road ahead is long and demanding but I WILL keep learning. Being a solo game dev will not be easy. I will have to be: a modeler, a programmer, a game designer, a musician, a level designer, an animator, a texture artist, a playtester, a concept artist, a writer, but the most importantly… a GAMER.</p>`,
                illustration: 'ocean',
                isFinale: true
            }];

            // ----- STATE -----
            let currentSpread = 0;
            let totalSpreads = 0;
            let isFlipping = false;
            let lastTurnEndTime = 0;
            let isOpen = false;
            let isVisible = false;
            let focusTrapElements = [];

            // DOM refs
            const scene = document.getElementById('forestScene');
            const bookEl = document.getElementById('forestBook');
            const coverEl = document.getElementById('forestCover');
            const spreadContainer = document.getElementById('forestSpreadContainer');
            const flipPage = document.getElementById('forestFlipPage');
            const flipFront = document.getElementById('forestFlipFront');
            const flipBack = document.getElementById('forestFlipBack');
            const prevBtn = document.getElementById('forestPrevBtn');
            const nextBtn = document.getElementById('forestNextBtn');
            const currentPageEl = document.getElementById('forestCurrentPage');
            const chapterAnnouncer = document.getElementById('forestChapterAnnouncer');
            const totalPagesEl = document.getElementById('forestTotalPages');
            const closeBtn = document.getElementById('forestCloseBtn');
            const bookmark = document.getElementById('forestBookmark');
            const cornerHint = document.getElementById('forestCornerHint');

            // Focus trap elements
            const trapStart = document.querySelector('.focus-trap-start');
            const trapEnd = document.querySelector('.focus-trap-end');

            // Cache spreads
            let spreadElements = [];

            // ----- ROMAN NUMERALS -----
            function toRoman(num) {
                const roman = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
                return roman[num] || num;
            }

            // ----- BUILD SPREADS -----
            function buildSpreads() {
                totalSpreads = CHAPTERS.length;
                spreadContainer.innerHTML = '';

                CHAPTERS.forEach((chapter, idx) => {
                    const div = document.createElement('div');
                    div.className = 'spread' + (idx === 0 ? ' active' : '');
                    div.dataset.index = idx;

                    // Left: illustration
                    const leftDiv = document.createElement('div');
                    leftDiv.className = 'page-left';
                    const leftInner = document.createElement('div');
                    leftInner.className = 'illustration-wrap';
                    leftInner.setAttribute('aria-hidden', 'true');
                    leftInner.innerHTML = ILLUSTRATIONS[chapter.illustration] || ILLUSTRATIONS['player-one'];
                    leftDiv.appendChild(leftInner);

                    const numSpan = document.createElement('div');
                    numSpan.className = 'chapter-number';
                    numSpan.textContent = toRoman(idx + 1);
                    leftDiv.appendChild(numSpan);
                    div.appendChild(leftDiv);

                    // Right: text
                    const rightDiv = document.createElement('div');
                    rightDiv.className = 'page-right';

                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'chapter-title';
                    titleDiv.textContent = chapter.title;
                    const badge = document.createElement('span');
                    badge.className = 'chapter-badge';
                    badge.textContent = `CH. ${idx + 1}`;
                    titleDiv.appendChild(badge);
                    rightDiv.appendChild(titleDiv);

                    const textDiv = document.createElement('div');
                    textDiv.className = 'chapter-text';
                    textDiv.innerHTML = chapter.text;

                    // Ricochet link
                    if (chapter.hasLink) {
                        const link = document.createElement('a');
                        link.className = 'ricochet-link';
                        link.textContent = 'Play Ricochet in the Castle of Games';
                        link.addEventListener('click', (e) => {
                            e.preventDefault();
                            handleRicochetTravel();
                        });
                        textDiv.appendChild(link);
                    }

                    // Finale: "still being written" cue + stamps
                    if (chapter.isFinale) {
                        // "still being written" cue
                        const cue = document.createElement('span');
                        cue.className = 'continues-cue';
                        cue.innerHTML = `… <span class="trail">· · ·</span>`;
                        textDiv.appendChild(cue);

                        // Role stamps
                        const stamps = document.createElement('div');
                        stamps.className = 'role-stamps';
                        const roles = ['Modeler', 'Programmer', 'Game Designer', 'Musician',
                            'Level Designer', 'Animator', 'Texture Artist', 'Playtester',
                            'Concept Artist', 'Writer', 'GAMER'
                        ];
                        roles.forEach(role => {
                            const span = document.createElement('span');
                            span.className = 'stamp' + (role === 'GAMER' ? ' gamer' : '');
                            span.textContent = role;
                            stamps.appendChild(span);
                        });
                        textDiv.appendChild(stamps);
                    }

                    rightDiv.appendChild(textDiv);
                    div.appendChild(rightDiv);
                    spreadContainer.appendChild(div);
                });

                // Cache spread elements
                spreadElements = spreadContainer.querySelectorAll('.spread');

                // Set total pages in indicator
                totalPagesEl.textContent = totalSpreads;
                updateIndicator();
            }

            // ----- UPDATE INDICATOR -----
            function updateIndicator() {
                const cur = currentSpread + 1;
                currentPageEl.textContent = cur;
                prevBtn.disabled = currentSpread === 0;
                nextBtn.disabled = currentSpread >= totalSpreads - 1;

                const chTitle = CHAPTERS[currentSpread] ? CHAPTERS[currentSpread].title : '';
                if (chapterAnnouncer) {
                    chapterAnnouncer.textContent = `Page ${cur} of ${totalSpreads}: ${chTitle}`;
                }

                // Update bookmark progress - a clearly visible slide down the ribbon,
                // plus a brief pulse so the change itself is easy to notice.
                const progress = totalSpreads > 1 ? (currentSpread / (totalSpreads - 1)) : 0;
                const offset = progress * 34;
                bookmark.style.transform = `translateY(${offset}px) scale(1)`;
                bookmark.classList.remove('bookmark-pulse');
                void bookmark.offsetHeight; // restart the pulse animation every time
                bookmark.classList.add('bookmark-pulse');
            }

            // ----- SHOW SPREAD -----
            function showSpread(index, instant) {
                if (index < 0 || index >= totalSpreads) return;
                spreadElements.forEach((s, i) => {
                    s.classList.toggle('active', i === index);
                    s.classList.remove('leaving');
                    // Ensure left page visibility
                    const left = s.querySelector('.page-left');
                    if (left) left.style.opacity = (i === index) ? '1' : '';
                });
                currentSpread = index;
                updateIndicator();
            }

            // ----- PAGE TURN (3D flip for both directions) -----
            function turnPage(direction) {
                if (isFlipping) return;
                if (Date.now() - lastTurnEndTime < 120) return; // debounce rapid re-clicks
                const toIdx = currentSpread + (direction === 'next' ? 1 : -1);
                if (toIdx < 0 || toIdx >= totalSpreads) return;

                const fromIdx = currentSpread;
                const fromSpread = spreadElements[fromIdx];
                const toSpread = spreadElements[toIdx];

                if (!fromSpread || !toSpread) return;

                // Reduced motion: instant swap
                const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (prefersReduced) {
                    showSpread(toIdx);
                    return;
                }

                isFlipping = true;

                // Determine which page to flip based on direction
                // 'next': flip the right page of 'from' to reveal left of 'to'
                // 'prev': flip the left page of 'from' (from right to left) - we do this
                // by flipping the right page of the *previous* spread, but it's simpler:
                // for prev, we do a reverse flip using the left page of 'from' and right of 'to'

                const isForward = direction === 'next';

                // Get the source content (right page of from for forward, left page of from for reverse)
                let sourceEl, targetEl;
                if (isForward) {
                    sourceEl = fromSpread.querySelector('.page-right');
                    targetEl = toSpread.querySelector('.page-left');
                } else {
                    // Reverse: we flip the left page of 'from' (which is on the left side)
                    // but we need to show the right page of 'to' as the back face
                    sourceEl = fromSpread.querySelector('.page-left');
                    targetEl = toSpread.querySelector('.page-right');
                }

                if (!sourceEl || !targetEl) {
                    showSpread(toIdx);
                    isFlipping = false;
                    return;
                }

                // Populate flip page
                flipFront.innerHTML = '';
                const sourceClone = sourceEl.cloneNode(true);
                // Remove any extra elements from source clone if needed
                flipFront.appendChild(sourceClone);

                flipBack.innerHTML = '';
                const targetClone = targetEl.cloneNode(true);
                // For forward: target is left page (illustration), keep illustration wrap
                // For reverse: target is right page (text), keep the text
                if (isForward) {
                    // Keep only illustration
                    const wrap = targetClone.querySelector('.illustration-wrap');
                    if (wrap) {
                        flipBack.innerHTML = '';
                        const newWrap = document.createElement('div');
                        newWrap.className = 'illustration-wrap';
                        newWrap.setAttribute('aria-hidden', 'true');
                        newWrap.innerHTML = wrap.innerHTML;
                        flipBack.appendChild(newWrap);
                    } else {
                        const wrap2 = document.createElement('div');
                        wrap2.className = 'illustration-wrap';
                        wrap2.setAttribute('aria-hidden', 'true');
                        const ch = CHAPTERS[toIdx];
                        if (ch) wrap2.innerHTML = ILLUSTRATIONS[ch.illustration] || ILLUSTRATIONS['player-one'];
                        flipBack.appendChild(wrap2);
                    }
                } else {
                    // Reverse: keep the text content
                    // But we need to clean it up (remove any extra elements like stamps, etc.)
                    // For simplicity, just clone the whole thing
                    flipBack.innerHTML = '';
                    // We'll clone the target right page but remove role stamps & cue for clean back
                    const cleanClone = targetClone.cloneNode(true);
                    // Remove stamps and cue from the back face for reverse flip
                    const stampsEl = cleanClone.querySelector('.role-stamps');
                    if (stampsEl) stampsEl.remove();
                    const cueEl = cleanClone.querySelector('.continues-cue');
                    if (cueEl) cueEl.remove();
                    flipBack.appendChild(cleanClone);
                }

                // Position flip page
                if (isForward) {
                    // Flip from right side: covers the right half
                    flipPage.style.left = '50%';
                    flipPage.style.width = '50%';
                    flipPage.style.transformOrigin = 'left center';
                } else {
                    // Reverse: flip from left side
                    flipPage.style.left = '0';
                    flipPage.style.width = '50%';
                    flipPage.style.transformOrigin = 'right center';
                }

                flipPage.style.display = 'block';
                flipPage.style.pointerEvents = 'none';
                flipPage.classList.remove('flip-forward-anim', 'flip-backward-anim');

                // Hide source page in from spread
                if (isForward) {
                    sourceEl.style.opacity = '0';
                    sourceEl.style.transition = 'opacity 0.15s';
                    // Show toSpread but hide its left page
                    toSpread.classList.add('active');
                    const toLeft = toSpread.querySelector('.page-left');
                    if (toLeft) toLeft.style.opacity = '0';
                } else {
                    // For reverse: hide the left page of from, show toSpread with right hidden
                    sourceEl.style.opacity = '0';
                    sourceEl.style.transition = 'opacity 0.15s';
                    toSpread.classList.add('active');
                    const toRight = toSpread.querySelector('.page-right');
                    if (toRight) toRight.style.opacity = '0';
                }

                // Force reflow so the class we're about to add always (re)starts the
                // keyframe animation from the beginning, even if one just finished.
                void flipPage.offsetHeight;

                // Declarative keyframe animation - reliably plays in every browser,
                // unlike a JS-timed transition which can get skipped depending on
                // paint/coalescing timing.
                let cleanedUp = false;
                const cleanup = () => {
                    if (cleanedUp) return;
                    cleanedUp = true;
                    flipPage.removeEventListener('animationend', onAnimEnd);
                    clearTimeout(fallbackTimer);

                    flipPage.style.display = 'none';
                    flipPage.classList.remove('flip-forward-anim', 'flip-backward-anim');

                    // Show the new spread fully
                    showSpread(toIdx);

                    // Restore opacities
                    if (isForward) {
                        const oldRight = fromSpread.querySelector('.page-right');
                        if (oldRight) oldRight.style.opacity = '1';
                        const newLeft = toSpread.querySelector('.page-left');
                        if (newLeft) newLeft.style.opacity = '1';
                    } else {
                        const oldLeft = fromSpread.querySelector('.page-left');
                        if (oldLeft) oldLeft.style.opacity = '1';
                        const newRight = toSpread.querySelector('.page-right');
                        if (newRight) newRight.style.opacity = '1';
                    }

                    fromSpread.classList.remove('active');
                    fromSpread.classList.add('leaving');

                    isFlipping = false;
                    lastTurnEndTime = Date.now();
                };
                const onAnimEnd = (e) => {
                    if (e.target !== flipPage) return;
                    cleanup();
                };
                flipPage.addEventListener('animationend', onAnimEnd);
                // Safety fallback: if animationend never fires for any reason (tab
                // backgrounded, interrupted style recalculation, etc.), don't leave
                // isFlipping stuck true and the book permanently frozen.
                const fallbackTimer = setTimeout(cleanup, 900);

                flipPage.classList.add(isForward ? 'flip-forward-anim' : 'flip-backward-anim');
            }

            // ----- NAVIGATION -----
            function goNext() {
                if (isFlipping) return;
                if (currentSpread >= totalSpreads - 1) return;
                turnPage('next');
            }

            function goPrev() {
                if (isFlipping) return;
                if (currentSpread <= 0) return;
                turnPage('prev');
            }

            // ----- OPEN COVER -----
            function openCover() {
                if (isOpen) return;
                isOpen = true;
                bookEl.classList.remove('cover-closed');
                bookEl.classList.add('cover-open');

                setTimeout(() => {
                    showSpread(0);
                    const first = spreadElements[0];
                    if (first) {
                        const left = first.querySelector('.page-left');
                        if (left) left.style.opacity = '1';
                    }
                }, 1200);
            }

            // ----- RICOCHET TRAVEL (injectable) -----
            function handleRicochetTravel() {
                // Allow external override
                if (window.__forestRicochetHandler) {
                    window.__forestRicochetHandler();
                    return;
                }
                // Default: elegant close + alert
                closeJournal(() => {
                    alert('⚔️ This would navigate to the Castle of Games and select Ricochet in the full site.');
                });
            }

            // ----- CLOSE JOURNAL -----
            function closeJournal(callback) {
                isVisible = false;
                scene.classList.remove('visible');
                scene.style.opacity = '0';
                setTimeout(() => {
                    scene.style.display = 'none';
                    if (callback) callback();
                }, 500);
            }

            // ----- FOCUS TRAP -----
            function trapFocus(e) {
                const focusable = [closeBtn, prevBtn, nextBtn];
                // Also any interactive inside the spread (like ricochet link)
                const activeSpread = spreadElements[currentSpread];
                if (activeSpread) {
                    const links = activeSpread.querySelectorAll('a, button, [tabindex="0"]');
                    links.forEach(el => {
                        if (el.tabIndex >= 0) focusable.push(el);
                    });
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (!first || !last) return;

                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                }
            }

            // ----- KEYBOARD -----
            function handleKeydown(e) {
                if (!isVisible) return;
                if (isFlipping) return;

                if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
                    e.preventDefault();
                    goNext();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    goPrev();
                } else if (e.key === 'Escape') {
                    closeJournal(window.closeDest);
                } else if (e.key === 'Tab') {
                    trapFocus(e);
                }
            }

            // ----- TOUCH SWIPE -----
            let touchStartX = 0;
            let touchStartY = 0;
            let isSwiping = false;

            function handleTouchStart(e) {
                const touch = e.touches[0];
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                isSwiping = false;
            }

            function handleTouchEnd(e) {
                if (!touchStartX) return;
                const touch = e.changedTouches[0];
                const deltaX = touch.clientX - touchStartX;
                const deltaY = touch.clientY - touchStartY;

                // Only trigger if horizontal swipe is dominant
                if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                    if (deltaX < 0) goNext();
                    else goPrev();
                }
                touchStartX = 0;
            }

            // ----- INIT -----
            function initForest() {
                buildSpreads();

                // Show scene
                scene.style.display = 'flex';
                scene.classList.add('visible');
                scene.style.opacity = '1';
                isVisible = true;

                // Open cover after a delay
                setTimeout(openCover, 400);

                // Event listeners
                nextBtn.addEventListener('click', goNext);
                prevBtn.addEventListener('click', goPrev);
                closeBtn.addEventListener('click', () => closeJournal(window.closeDest));
                document.addEventListener('keydown', handleKeydown);

                // Touch support on the book
                const bookWrapper = document.querySelector('.book-wrapper');
                bookWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
                bookWrapper.addEventListener('touchend', handleTouchEnd, { passive: true });

                // Focus trap (boundary bounce-back only; trapFocus() in handleKeydown
                // already does the real forward/backward wrapping between real controls)
                trapStart.addEventListener('focus', () => {
                    closeBtn.focus();
                });
                trapEnd.addEventListener('focus', () => {
                    closeBtn.focus();
                });

                // Give the dialog sensible initial keyboard focus
                closeBtn.focus();

                // Corner hint click: advance to next page
                cornerHint.addEventListener('click', goNext);

                // Reduced motion
                const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
                if (prefersReduced.matches) {
                    bookEl.style.transition = 'transform 0.3s ease';
                }

                // Expose cleanup
                window.__forestCleanup = function() {
                    document.removeEventListener('keydown', handleKeydown);
                    bookWrapper.removeEventListener('touchstart', handleTouchStart);
                    bookWrapper.removeEventListener('touchend', handleTouchEnd);
                };
            }

            // NOTE: the standalone preview page auto-initialized here on
            // DOMContentLoaded. That's removed for the integrated site -
            // Forest must stay hidden until the visitor actually clicks the
            // forest marker, exactly like every other biome. initForest is
            // called lazily instead, from openForestJournal() in the site's
            // main script (guarded there so it only ever runs once).

            // Expose for lazy invocation from the parent site (per architecture:
            // "a lazy initForest() function called once on first visit")
            window.initForest = initForest;

            // Expose the ricochet handler override
            window.__forestSetRicochetHandler = function(fn) {
                window.__forestRicochetHandler = fn;
            };

        })();

  