let villageInitialized = false;
function initVillage(){
  if (villageInitialized) {
    if (window.__resumeVillageFireflies) window.__resumeVillageFireflies();
    if (window.__pendingVillageHouse && window.__villageOpenDevlog) {
      const key = window.__pendingVillageHouse;
      window.__pendingVillageHouse = null;
      window.__villageOpenDevlog(key);
    }
    return;
  }
  villageInitialized = true;
            // ─────────────────────────────────────────────
            // DATA
            // ─────────────────────────────────────────────
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

            const VILLAGE_DATA = {
                cppgym: {
                    title: 'Gym Management System - Console Edition',
                    sub: 'C++ · Console',
                    type: 'Academic Project',
                    tech: ['C++', 'File Handling (fstream)', 'Structures', 'Arrays', 'Dynamic Memory Allocation'],
                    pitch: 'A role-based gym management console app built entirely on structures, file handling, and dynamic memory. On launch it loads members and role credentials from disk, then routes each login into one of three permission levels - Administrator, Manager, or User - each seeing a different slice of the same system.',
                    why: 'This was my Programming Fundamentals semester project and my first real attempt at building a complete application instead of isolated exercises.',
                    story: 'At first the project seemed straightforward: add members, save them to a file, display them again. Then the feature list kept growing - authentication, searching, updating, deleting, workout plans, validation - until the biggest challenge wasn\'t implementing features anymore, it was keeping the code organized.',
                    features: ['Authentication', 'Role-based access', 'Member management (CRUD)', 'Workout plan management',
                        'Recommended calorie calculation', 'Membership tracking', 'Search functionality',
                        'Persistent file storage', 'Input validation'
                    ],
                    learned: ['Organizing larger programs', 'Breaking problems into reusable functions',
                        'Working with persistent data', 'Input validation', 'Managing dynamic memory',
                        'Planning before coding'
                    ],
                    images: ['cppGym_1_welcome', 'cppGym_2_login', 'cppGym_3_menu', 'cppGym_4_addMember',
                        'cppGym_5_viewAllMembers', 'cppGym_6_plan', 'cppGym_7_calcCalories'
                    ],
                    github: 'https://github.com/faizan-ahmed-dev/cpp-Gym-Management-System',
                    accent: '#8ee08a',
                    status: 'complete',
                    date: 'Dec 2025',
                    readingTime: '3 min'
                },
                csharpgym: {
                    title: 'Gym Management System - Desktop Edition',
                    sub: 'C# · WinForms + MySQL',
                    type: 'Desktop Application',
                    tech: ['C#', '.NET WinForms', 'MySQL', 'SQL', 'ADO.NET', 'Visual Studio'],
                    pitch: 'A graphical desktop version of my gym management system, rebuilding the same idea on technology that resembles real desktop software - replacing the console interface and text files with Windows Forms and a relational database.',
                    why: 'After finishing the C++ version, I wanted to rebuild the same idea with tools that resemble real desktop software: forms, buttons, tables, and a proper database instead of typed commands into a console.',
                    story: 'This project changed how I thought about application development. Console programs guide the user step by step; desktop software doesn\'t. Designing the interface became just as important as writing the logic underneath it.',
                    features: ['Login system', 'Role-based access', 'Member management (CRUD)', 'Workout plan management',
                        'Recommended calorie calculation', 'Membership tracking', 'Search functionality', 'Analytics',
                        'Database integration'
                    ],
                    learned: ['Event-driven programming', 'Database design', 'SQL CRUD operations',
                        'Desktop UI development', 'Connecting applications to databases'
                    ],
                    images: ['csharpgym_1_login', 'csharpgym_2_dashboard', 'csharpgym_3_members', 'csharpgym_4_analytics'],
                    github: 'https://github.com/faizan-ahmed-dev/Winforms-Gym-Management-System',
                    accent: '#7bd88f',
                    status: 'complete',
                    date: 'Feb 2026',
                    readingTime: '3 min'
                },
                obe: {
                    title: 'OBE Evaluation System',
                    sub: 'C# · WinForms + MySQL',
                    type: 'Desktop Application',
                    tech: ['C#', 'WinForms', 'MySQL', 'SQL', 'NuGet (MySQL.Data)', 'Visual Studio'],
                    pitch: 'A desktop application built for teachers to manage the entire outcome-based education evaluation workflow from one place - students, Course Learning Outcomes (CLOs), rubrics, rubric levels, assessments, and attendance - plus marking evaluations directly against each student.',
                    why: 'Educational assessment involves repetitive calculations across large amounts of interconnected data. This project explored how software could simplify that workflow.',
                    story: 'Compared to my earlier projects, this one was far more about the relationships between data than the interface. Students belonged to courses. Courses contained assessments. Assessments mapped to learning outcomes. Marks fed into reports.',
                    features: ['Manage Students', 'Manage CLOs', 'Manage Rubrics', 'Manage Rubric Levels',
                        'Manage Assessments', 'Mark evaluations per student', 'Manage Attendance',
                        'CLO-wise class result (PDF)', 'Assessment-wise class result (PDF)',
                        'Student-wise result (PDF)'
                    ],
                    learned: ['Relational database design', 'Managing interconnected data', 'Building administrative software',
                        'Report generation', 'Planning database structures'
                    ],
                    images: ['OBE_1_login', 'OBE_2_dashboard', 'OBE_3_ManageStudents', 'OBE_4_ManageCLOs',
                        'OBE_5_ManageRubrics',
                        'OBE_6_ManageRubricLevels', 'OBE_7_ManageAssessments', 'OBE_8_ManageAssessmentComponents',
                        'OBE_9_MarkEvaluations', 'OBE_10_ManageAttendance', 'OBE_11_Report'
                    ],
                    dbDiagram: 'OBE_12_DatabaseDesign',
                    github: 'https://github.com/faizan-ahmed-dev/OBE-Evaluation-System',
                    accent: '#9fc7e8',
                    status: 'complete',
                    date: 'April 2026',
                    readingTime: '4 min'
                },
                adaptivefitness: {
                    title: 'Adaptive Fitness & Nutrition Management System',
                    sub: 'C# · WinForms + MySQL',
                    type: 'Desktop Application',
                    tech: ['C#', 'WinForms', 'MySQL Workbench', 'SQL', 'NuGet (MySQL.Data)', 'Visual Studio'],
                    pitch: 'A desktop-based fitness center management system built to simplify fitness planning for hostel students through one centralized platform. It generates personalized workout routines and meal plans based on each student\'s objective - weight loss, muscle gain, or general fitness.',
                    why: 'As hostelites ourselves, we personally lived the problem this solves: struggling to maintain a balanced diet, track protein intake, and follow a consistent exercise routine while managing academic responsibilities.',
                    story: 'This project pushed me toward thinking about software logic rather than just CRUD. Different users needed different recommendations - goals mattered, body measurements mattered, progress mattered - and designing those decision-making rules took far more planning than anything I\'d built before.',
                    features: ['Student Management', 'Fitness Goals', 'Workout Planning', 'Nutrition Management',
                        'Allergy Tracking',
                        'Health Progress Tracking', 'Billing', 'Reporting'
                    ],
                    learned: ['Designing recommendation systems', 'User-centered application design',
                        'Structuring larger projects',
                        'Database organization', 'Application architecture'
                    ],
                    images: ['AdaptiveFitness_2_Login', 'AdaptiveFitness_3_Dashboard', 'AdaptiveFitness_4_Workout',
                        'AdaptiveFitness_5_Nutrition', 'AdaptiveFitness_6_Billing', 'AdaptiveFitness_7_Report',
                        'AdaptiveFitness_8_StudentPortal'
                    ],
                    dbDiagram: 'AdaptiveFitness_1_DatabaseDesign',
                    github: 'https://github.com/faizan-ahmed-dev/Adaptive-Fitness-Nutrition-Management-System',
                    accent: '#ffd97a',
                    status: 'complete',
                    date: 'June 2026',
                    readingTime: '4 min'
                }
            };
            const VILLAGE_ORDER = ['cppgym', 'csharpgym', 'obe', 'adaptivefitness'];

            // ── House SVG icons ──
            // 4 distinct architectural styles
            const HOUSE_ICONS = {
                cppgym: `<svg viewBox="0 0 54 50">
            <!-- cottage body -->
            <path d="M3 46 L3 26 L27 4 L51 26 L51 46 Z" fill="#4a3a2e" stroke="#2e2318" stroke-width="1.2"/>
            <rect x="3" y="26" width="48" height="20" fill="#5c4a3a" stroke="#2e2318" stroke-width="1.2"/>
            <!-- roof detail -->
            <path d="M8 26 L27 7 L46 26" fill="none" stroke="#6b5744" stroke-width="1.8" opacity=".3"/>
            <!-- chimney -->
            <rect x="36" y="8" width="8" height="10" class="hm-chimney" fill="#4a3a2e" rx="1" stroke="#2e2318" stroke-width="0.8"/>
            <circle cx="40" cy="6" r="5" class="hm-smoke" fill="rgba(200,200,200,.25)" filter="blur(2px)"/>
            <!-- windows -->
            <rect x="10" y="32" width="8" height="8" class="hm-window lit" rx="1" stroke="#2e2318" stroke-width="0.6"/>
            <rect x="36" y="32" width="8" height="8" class="hm-window" rx="1" stroke="#2e2318" stroke-width="0.6"/>
            <rect x="23" y="30" width="8" height="6" class="hm-window lit" rx="1" stroke="#2e2318" stroke-width="0.6"/>
            <!-- window glows -->
            <rect x="11" y="33" width="6" height="6" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <rect x="24" y="31" width="6" height="4" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <!-- door -->
            <rect x="21" y="36" width="12" height="10" class="hm-door" fill="#2e2318" rx="1" stroke="#1a120c" stroke-width="0.8"/>
            <path d="M21 36 L33 36 L33 46 L21 46 Z" class="hm-door-glow" fill="rgba(255,179,0,.15)" opacity="0"/>
            <circle cx="30" cy="41" r="1" fill="#5c4a3a"/>
            <!-- porch light -->
            <circle cx="27" cy="35" r="2" fill="#FFB300" opacity=".15"/>
          </svg>`,

                csharpgym: `<svg viewBox="0 0 54 50">
            <!-- townhouse body - tall & narrow -->
            <rect x="4" y="8" width="46" height="38" fill="#3d4a40" stroke="#20281f" stroke-width="1.2" rx="1"/>
            <rect x="4" y="8" width="46" height="6" fill="#2a342c" stroke="#20281f" stroke-width="1.2" rx="1"/>
            <!-- roof -->
            <rect x="2" y="6" width="50" height="4" fill="#2a342c" stroke="#20281f" stroke-width="1"/>
            <!-- chimney -->
            <rect x="40" y="2" width="6" height="8" class="hm-chimney" fill="#3d4a40" rx="1" stroke="#20281f" stroke-width="0.8"/>
            <circle cx="43" cy="0" r="4" class="hm-smoke" fill="rgba(200,200,200,.2)" filter="blur(2px)"/>
            <!-- windows -->
            <rect x="10" y="18" width="8" height="8" class="hm-window lit" rx="1" stroke="#20281f" stroke-width="0.6"/>
            <rect x="36" y="18" width="8" height="8" class="hm-window lit" rx="1" stroke="#20281f" stroke-width="0.6"/>
            <rect x="10" y="32" width="8" height="8" class="hm-window" rx="1" stroke="#20281f" stroke-width="0.6"/>
            <rect x="36" y="32" width="8" height="8" class="hm-window" rx="1" stroke="#20281f" stroke-width="0.6"/>
            <rect x="23" y="18" width="8" height="6" class="hm-window lit" rx="1" stroke="#20281f" stroke-width="0.6"/>
            <!-- glows -->
            <rect x="11" y="19" width="6" height="6" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <rect x="37" y="19" width="6" height="6" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <rect x="24" y="19" width="6" height="4" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <!-- door -->
            <rect x="21" y="36" width="12" height="10" class="hm-door" fill="#20281f" rx="1" stroke="#141a14" stroke-width="0.8"/>
            <path d="M21 36 L33 36 L33 46 L21 46 Z" class="hm-door-glow" fill="rgba(255,179,0,.15)" opacity="0"/>
            <circle cx="30" cy="41" r="1" fill="#3d4a40"/>
          </svg>`,

                obe: `<svg viewBox="0 0 54 50">
            <!-- A-frame body -->
            <path d="M2 46 L27 4 L52 46 Z" fill="#3d4a5c" stroke="#1c232e" stroke-width="1.2"/>
            <!-- lower wall -->
            <rect x="6" y="30" width="42" height="16" fill="#465470" stroke="#1c232e" stroke-width="1.2"/>
            <!-- chimney -->
            <rect x="32" y="10" width="6" height="8" class="hm-chimney" fill="#3d4a5c" rx="1" stroke="#1c232e" stroke-width="0.8"/>
            <circle cx="35" cy="8" r="4" class="hm-smoke" fill="rgba(200,200,200,.2)" filter="blur(2px)"/>
            <!-- large central window -->
            <path d="M16 32 L27 16 L38 32 Z" class="hm-window lit" fill="rgba(159,199,232,.3)" stroke="#1c232e" stroke-width="0.8"/>
            <path d="M17 32 L27 18 L37 32 Z" class="hm-window-glow" fill="#FFE082" opacity="0"/>
            <!-- side windows -->
            <rect x="10" y="36" width="6" height="6" class="hm-window" rx="1" stroke="#1c232e" stroke-width="0.6"/>
            <rect x="38" y="36" width="6" height="6" class="hm-window" rx="1" stroke="#1c232e" stroke-width="0.6"/>
            <rect x="11" y="37" width="4" height="4" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <rect x="39" y="37" width="4" height="4" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <!-- door -->
            <rect x="21" y="38" width="12" height="8" class="hm-door" fill="#1c232e" rx="1" stroke="#0f141c" stroke-width="0.8"/>
            <path d="M21 38 L33 38 L33 46 L21 46 Z" class="hm-door-glow" fill="rgba(255,179,0,.15)" opacity="0"/>
            <circle cx="30" cy="42" r="1" fill="#465470"/>
          </svg>`,

                adaptivefitness: `<svg viewBox="0 0 54 50">
            <!-- workshop / greenhouse body -->
            <rect x="4" y="14" width="46" height="32" fill="#5c4a3a" stroke="#332a18" stroke-width="1.2" rx="1"/>
            <!-- glass roof -->
            <path d="M4 14 L27 2 L50 14 Z" fill="#6b5a3a" stroke="#332a18" stroke-width="1.2"/>
            <path d="M10 14 L27 4 L44 14" fill="none" stroke="#7c6944" stroke-width="1.2" opacity=".4"/>
            <path d="M17 14 L27 6 L37 14" fill="none" stroke="#7c6944" stroke-width="1.2" opacity=".4"/>
            <!-- chimney -->
            <rect x="38" y="6" width="6" height="8" class="hm-chimney" fill="#5c4a3a" rx="1" stroke="#332a18" stroke-width="0.8"/>
            <circle cx="41" cy="4" r="4" class="hm-smoke" fill="rgba(200,200,200,.2)" filter="blur(2px)"/>
            <!-- large garage-style windows -->
            <rect x="8" y="20" width="14" height="10" class="hm-window lit" rx="1" stroke="#332a18" stroke-width="0.6"/>
            <rect x="32" y="20" width="14" height="10" class="hm-window lit" rx="1" stroke="#332a18" stroke-width="0.6"/>
            <rect x="9" y="21" width="12" height="8" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <rect x="33" y="21" width="12" height="8" class="hm-window-glow" fill="#FFE082" opacity="0" rx="1"/>
            <!-- small upper windows -->
            <rect x="14" y="16" width="6" height="4" class="hm-window lit" rx="1" stroke="#332a18" stroke-width="0.6"/>
            <rect x="34" y="16" width="6" height="4" class="hm-window lit" rx="1" stroke="#332a18" stroke-width="0.6"/>
            <!-- door -->
            <rect x="21" y="36" width="12" height="10" class="hm-door" fill="#332a18" rx="1" stroke="#1a140c" stroke-width="0.8"/>
            <path d="M21 36 L33 36 L33 46 L21 46 Z" class="hm-door-glow" fill="rgba(255,179,0,.15)" opacity="0"/>
            <circle cx="30" cy="41" r="1" fill="#5c4a3a"/>
            <!-- workshop sign -->
            <rect x="22" y="14" width="10" height="2" fill="#7c6944" opacity=".4" rx="0.5"/>
          </svg>`
            };

            // ── Robust viewport height (fixes mobile address-bar reflow jumping
            //     the intro text / houses around) ──
            function setViewportUnit() {
                document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
            }
            setViewportUnit();
            window.addEventListener('resize', setViewportUnit);
            window.addEventListener('orientationchange', setViewportUnit);
            if (window.visualViewport) {
                window.visualViewport.addEventListener('resize', setViewportUnit);
            }

            // ── State ──
            let readHouses = new Set();
            let currentHouseKey = null;
            let houseKeys = [];
            let isOverlayOpen = false;

            // ── DOM refs ──
            const streetTrack = document.getElementById('streetTrack');
            const overlay = document.getElementById('devlogOverlay');
            const article = document.getElementById('devlogArticle');
            const progress = document.getElementById('devlogProgress');
            const closeBtn = document.getElementById('devlogClose');
            const prevBtn = document.getElementById('devlogPrev');
            const nextBtn = document.getElementById('devlogNext');
            const returnBtn = document.getElementById('villageReturnBtn');
            const backBtn = document.getElementById('devlogBack');
            const canvas = document.getElementById('firefliesCanvas');
            const ctx = canvas.getContext('2d');
            const wrap = document.getElementById('parallaxWrap');

            // ── Resize canvas ──
            function resizeCanvas() {
                const rect = wrap.getBoundingClientRect();
                // Capped via PERF_DPR: on a DPR-3 phone this is a 9x smaller
                // backing store than raw devicePixelRatio would give us,
                // which is most of the fireflies-canvas cost on mobile.
                canvas.width = rect.width * PERF_DPR;
                canvas.height = rect.height * PERF_DPR;
                canvas.style.width = rect.width + 'px';
                canvas.style.height = rect.height + 'px';
                ctx.scale(PERF_DPR, PERF_DPR);
            }
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // ── Stars ──
            (function createStars() {
                const container = document.getElementById('starsContainer');
                for (let i = 0; i < (PERF_MODE ? 15 : 40); i++) {
                    const s = document.createElement('div');
                    s.className = 'star';
                    s.style.left = (Math.random() * 96 + 2) + '%';
                    s.style.top = (Math.random() * 50 + 2) + '%';
                    s.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
                    s.style.width = (1 + Math.random() * 2) + 'px';
                    s.style.height = s.style.width;
                    s.style.opacity = 0.15 + Math.random() * 0.35;
                    container.appendChild(s);
                }
            })();

            // ── String Lights ──
            (function createLights() {
                const container = document.getElementById('stringLights');
                const numBulbs = 16;
                const positions = [];
                for (let i = 0; i < numBulbs; i++) {
                    positions.push(4 + (i / (numBulbs - 1)) * 92);
                }
                // wire
                const wire = document.createElement('div');
                wire.className = 'wire';
                container.appendChild(wire);
                // bulbs
                positions.forEach((pct, i) => {
                    const bulb = document.createElement('div');
                    bulb.className = 'bulb';
                    bulb.style.left = pct + '%';
                    bulb.style.setProperty('--dur', (1.8 + Math.random() * 2.4) + 's');
                    bulb.style.animationDelay = (Math.random() * 3) + 's';
                    // slight vertical sag variation
                    const sag = -2 + Math.random() * 6;
                    bulb.style.top = (-4 + sag) + 'px';
                    container.appendChild(bulb);
                });
            })();

            // ── Build Houses ──
            function buildHouses() {
                streetTrack.innerHTML = '';
                houseKeys = VILLAGE_ORDER;
                houseKeys.forEach((key, idx) => {
                    const h = VILLAGE_DATA[key];
                    const btn = document.createElement('button');
                    btn.className = 'house-marker';
                    btn.dataset.house = key;
                    btn.setAttribute('aria-label', 'Open devlog for ' + h.title);
                    btn.innerHTML = `
                  <div class="house-svg-wrap">${HOUSE_ICONS[key]}</div>
                  <span class="hm-read">✦ read</span>
                  <span class="hm-label">${h.title}</span>
                  <span class="hm-sub">${h.sub}</span>
                `;
                    if (readHouses.has(key)) btn.classList.add('read');
                    btn.addEventListener('click', () => openDevlog(key));
                    btn.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openDevlog(key);
                        }
                    });
                    streetTrack.appendChild(btn);
                    // stagger animation
                    btn.style.opacity = '0';
                    btn.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        btn.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(.3,.6,.4,1.8)';
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateY(0)';
                    }, 200 + idx * 120);
                });
            }
            buildHouses();

            // ── Update read state ──
            function updateReadState(key) {
                readHouses.add(key);
                const btns = streetTrack.querySelectorAll('.house-marker');
                btns.forEach(b => {
                    if (b.dataset.house === key) b.classList.add('read');
                });
            }

            // ── Get house element ──
            function getHouseEl(key) {
                return streetTrack.querySelector(`.house-marker[data-house="${key}"]`);
            }

            // ── Show/hide the back button ──
            function setBackButtonVisible(visible) {
                backBtn.classList.toggle('visible', visible);
            }

            // ── Open Devlog ──
            function openDevlog(key) {
                const d = VILLAGE_DATA[key];
                if (!d) return;
                currentHouseKey = key;
                if (window.__setRoute) window.__setRoute('village', key);
                updateReadState(key);
                isOverlayOpen = true;
                setBackButtonVisible(true);

                const section = (label, body) => body ? (
                    '<div class="da-section"><h3>' + label + '</h3>' + body + '</div>'
                ) : '';

                const paragraphs = txt => txt.split('\n\n').map(p => '<p>' + p + '</p>').join('');

                const galleryImgs = d.images ? d.images.map(k =>
                    '<div class="da-shot-wrap"><img src="' + VILLAGE_IMG[k] + '" alt="' + d.title +
                    ' screenshot" loading="lazy"></div>'
                ).join('') : '';

                const dbSection = d.dbDiagram ? (
                    '<div class="da-section"><h3>Database Design</h3>' +
                    '<div class="da-shot-wrap"><img src="' + VILLAGE_IMG[d.dbDiagram] + '" alt="' + d.title +
                    ' database diagram" loading="lazy"></div>' +
                    '</div>'
                ) : '';

                const githubBtn = d.github ?
                    '<a class="da-github live" href="' + d.github +
                    '" target="_blank" rel="noopener">View on GitHub →</a>' :
                    '<span class="da-github pending">GitHub link coming soon</span>';

                const statusLabel = d.status === 'complete' ? '✅ Complete' :
                    d.status === 'inprogress' ? '🔄 In Progress' : '📦 Archived';

                const ornament = '<div class="da-ornament">' +
                    '<span>✦</span></div>';

                article.innerHTML = `
                <div class="da-hero" style="--accent:${d.accent || '#FFB300'}">
                  <div class="da-hero-icon">${HOUSE_ICONS[key] || ''}</div>
                  <div class="da-eyebrow">${d.type}</div>
                  <h2 class="da-title">${d.title}</h2>
                  <div class="da-sub">${d.sub}</div>
                  <div class="da-meta">
                    <span>📅 ${d.date || '2025'}</span>
                    <span>📖 ${d.readingTime || '3 min'} read</span>
                    <span>🏷️ ${statusLabel}</span>
                  </div>
                  <div class="da-tags">${d.tech.map(t => '<span class="da-tag">' + t + '</span>').join('')}</div>
                </div>
                ${section('The Pitch', '<p class="hook">' + d.pitch + '</p>')}
                ${section('Why I Built It', '<p>' + d.why + '</p>')}
                ${ornament}
                ${section('The Story', paragraphs(d.story))}
                ${section('Features', '<ul class="da-list">' + d.features.map(f => '<li>' + f + '</li>').join('') + '</ul>')}
                ${section('Tools on the Workbench', '<div class="da-tech">' + d.tech.map(t => '<span>' + t + '</span>').join('') + '</div>')}
                ${section('What I Learned', '<ul class="da-list">' + d.learned.map(f => '<li>' + f + '</li>').join('') + '</ul>')}
                ${dbSection}
                ${d.images && d.images.length ? section('Screenshots', '<div class="da-gallery">' + galleryImgs + '</div>') : ''}
                <div class="da-links">${githubBtn}</div>
              `;

                overlay.classList.add('show');
                overlay.scrollTop = 0;
                progress.style.width = '0%';
                overlay.removeAttribute('inert');
                // focus close button
                setTimeout(() => closeBtn.focus(), 100);
                // lock body
                document.body.style.overflow = 'hidden';

                // Reveal sections as they scroll into view
                observeReveals();
            }

            // ── Scroll-reveal for article sections ──
            let revealObserver = null;

            function observeReveals() {
                if (revealObserver) revealObserver.disconnect();
                revealObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view');
                            revealObserver.unobserve(entry.target);
                        }
                    });
                }, { root: overlay, rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
                article.querySelectorAll('.da-section, .da-links, .da-ornament').forEach(el => {
                    revealObserver.observe(el);
                });
            }

            // ── Close Devlog ──
            function closeDevlog() {
                overlay.classList.remove('show');
                overlay.setAttribute('inert', '');
                isOverlayOpen = false;
                setBackButtonVisible(false);
                document.body.style.overflow = '';
                if (window.__setRoute) window.__setRoute('village');
                // return focus to house
                if (currentHouseKey) {
                    const el = getHouseEl(currentHouseKey);
                    if (el) setTimeout(() => el.focus(), 50);
                }
            }

            // ── Navigate houses ──
            function navigateHouse(dir) {
                if (!currentHouseKey) return;
                const idx = houseKeys.indexOf(currentHouseKey);
                const nextIdx = (idx + dir + houseKeys.length) % houseKeys.length;
                const nextKey = houseKeys[nextIdx];
                if (nextKey) openDevlog(nextKey);
            }

            // ── Overlay controls ──
            closeBtn.addEventListener('click', closeDevlog);
            backBtn.addEventListener('click', closeDevlog);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeDevlog();
            });
            prevBtn.addEventListener('click', () => navigateHouse(-1));
            nextBtn.addEventListener('click', () => navigateHouse(1));

            // keyboard: Escape to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isOverlayOpen) {
                    closeDevlog();
                }
                // left/right arrows when overlay is open
                if (isOverlayOpen) {
                    if (e.key === 'ArrowLeft') { e.preventDefault();
                        navigateHouse(-1); }
                    if (e.key === 'ArrowRight') { e.preventDefault();
                        navigateHouse(1); }
                }
            });

            // ── Reading progress ──
            overlay.addEventListener('scroll', () => {
                const scrollTop = overlay.scrollTop;
                const scrollHeight = overlay.scrollHeight - overlay.clientHeight;
                const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
                progress.style.width = Math.min(100, pct) + '%';
            });

            // ── Return button ── (exits the whole Village biome back to the
            // Overworld hub when the article overlay is closed; closes the
            // article first if it happens to be open, same as elsewhere on
            // the site - closeDest is the shared exit fn used by every biome)
            returnBtn.addEventListener('click', () => {
                if (isOverlayOpen) closeDevlog();
                else if (window.closeDest) {
                    window.closeDest();
                }
            });

            // ─────────────────────────────────────────────
            // FIREFLIES - Canvas Particle System
            // ─────────────────────────────────────────────
            let fireflies = [];
            const NUM_FIREFLIES = PERF_MODE ? 8 : 18;
            let mouseX = -9999,
                mouseY = -9999;
            let isMouseOnCanvas = false;

            class Firefly {
                constructor(w, h) {
                    this.reset(w, h);
                    this.phase = Math.random() * Math.PI * 2;
                    this.speed = 0.3 + Math.random() * 0.5;
                    this.wobble = 0.5 + Math.random() * 1.2;
                    this.size = 2 + Math.random() * 3;
                    this.glow = 0.3 + Math.random() * 0.4;
                }
                reset(w, h) {
                    this.x = 2 + Math.random() * (w - 4);
                    this.y = 5 + Math.random() * (h * 0.6);
                    this.vx = (Math.random() - 0.5) * 0.4;
                    this.vy = (Math.random() - 0.5) * 0.4;
                    this.phase = Math.random() * Math.PI * 2;
                    this.life = 0.5 + Math.random() * 0.5;
                    this.targetX = this.x;
                    this.targetY = this.y;
                }
                update(w, h, time) {
                    this.phase += 0.008 * this.speed;
                    this.x += Math.sin(time * 0.001 + this.phase) * 0.08 * this.speed;
                    this.y += Math.cos(time * 0.0013 + this.phase * 0.6) * 0.06 * this.speed;
                    if (isMouseOnCanvas) {
                        const dx = this.x - mouseX;
                        const dy = this.y - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 120 && dist > 0) {
                            const force = (120 - dist) / 120 * 0.6;
                            this.x += (dx / dist) * force * 0.8;
                            this.y += (dy / dist) * force * 0.8;
                        }
                    }
                    if (this.x < 0) this.x = 0;
                    if (this.x > w) this.x = w;
                    if (this.y < 0) this.y = 0;
                    if (this.y > h * 0.8) this.y = h * 0.8;
                    this.life = 0.6 + Math.sin(time * 0.002 + this.phase) * 0.3;
                }
                draw(ctx) {
                    const alpha = (0.4 + this.life * 0.5) * this.glow;
                    const r = this.size;
                    // createRadialGradient() + shadowBlur are both re-created/
                    // re-rasterized every frame for every firefly - fine for a
                    // handful on desktop, expensive at 60fps on a phone GPU.
                    // Perf mode swaps the gradient halo for a flat translucent
                    // fill and drops the shadow blur; still glows, just cheaper.
                    if (PERF_MODE) {
                        ctx.fillStyle = `rgba(255, 195, 90, ${alpha * 0.35})`;
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, r * 2.2, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.fillStyle = `rgba(255, 240, 200, ${alpha * 0.9})`;
                        ctx.beginPath();
                        ctx.arc(this.x, this.y, r * 0.6, 0, Math.PI * 2);
                        ctx.fill();
                        return;
                    }
                    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4);
                    grad.addColorStop(0, `rgba(255, 210, 120, ${alpha * 0.9})`);
                    grad.addColorStop(0.3, `rgba(255, 190, 80, ${alpha * 0.5})`);
                    grad.addColorStop(1, `rgba(255, 180, 60, 0)`);
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = `rgba(255, 240, 200, ${alpha * 0.9})`;
                    ctx.shadowColor = `rgba(255, 200, 100, ${alpha * 0.5})`;
                    ctx.shadowBlur = r * 3;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, r * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = `rgba(255, 255, 240, ${alpha * 0.5})`;
                    ctx.beginPath();
                    ctx.arc(this.x - r * 0.15, this.y - r * 0.15, r * 0.25, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            function initFireflies() {
                const rect = wrap.getBoundingClientRect();
                const w = rect.width;
                const h = rect.height;
                fireflies = [];
                for (let i = 0; i < NUM_FIREFLIES; i++) {
                    fireflies.push(new Firefly(w, h));
                }
            }
            initFireflies();

            // Same issue as Mastery Peak's cloud loop and Castle's ambient
            // tick: nothing ever stopped this, so once Village was opened
            // the first time it kept calling getBoundingClientRect() (a
            // forced layout read) and redrawing the canvas every single
            // frame for the rest of the session, even after navigating away.
            // fireflyLoopActive lets closeDest() pause it and lets
            // reopening Village resume the same loop.
            let fireflyLoopActive = true;
            function drawFireflies(time) {
                if (!fireflyLoopActive) return;
                const rect = wrap.getBoundingClientRect();
                const w = rect.width;
                const h = rect.height;
                ctx.clearRect(0, 0, w, h);
                fireflies.forEach(ff => {
                    ff.update(w, h, time);
                    ff.draw(ctx);
                });
                requestAnimationFrame(drawFireflies);
            }
            requestAnimationFrame(drawFireflies);

            window.__pauseVillageFireflies = function() { fireflyLoopActive = false; };
            window.__resumeVillageFireflies = function() {
                if (fireflyLoopActive) return;
                fireflyLoopActive = true;
                requestAnimationFrame(drawFireflies);
            };

            wrap.addEventListener('mousemove', (e) => {
                const rect = wrap.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                isMouseOnCanvas = true;
            });
            wrap.addEventListener('mouseleave', () => {
                isMouseOnCanvas = false;
            });

            window.addEventListener('resize', () => {
                resizeCanvas();
                initFireflies();
            });

            // ── Parallax scroll ──
            // Driven by real horizontal scrollLeft on #streetLayer (native
            // touch swipe / trackpad / click-drag / wheel), instead of the
            // page's vertical scroll. The village-scene container never had
            // enough vertical content to produce a scrollbar, so on any
            // viewport too narrow to fit all houses at once, houses past
            // the fold were previously unreachable.
            const streetLayerEl = document.getElementById('streetLayer');
            function updateParallax() {
                const streetTrack = document.getElementById('streetTrack');
                const maxScroll = streetLayerEl.scrollWidth - streetLayerEl.clientWidth;
                const progress = maxScroll > 0 ? Math.min(1, streetLayerEl.scrollLeft / maxScroll) : 0;
                const hills = document.getElementById('hillsLayer');
                const hillOffset = progress * 30;
                hills.style.transform = `translate3d(${-hillOffset * 0.3}px, 0, 0)`;
                const ground = document.getElementById('groundLayer');
                if (ground) ground.style.transform = `translate3d(${-hillOffset * 0.55}px, 0, 0)`;
                const treesMid = document.getElementById('treesMidLayer');
                if (treesMid) treesMid.style.transform = `translate3d(${-progress * 60}px, 0, 0)`;
                const lights = document.getElementById('stringLights');
                const lightOffset = progress * 8;
                lights.style.transform = `translate3d(${-lightOffset * 0.15}px, 0, 0)`;
                const hint = document.querySelector('.scroll-hint');
                if (hint) {
                    if (progress > 0.05) {
                        hint.style.opacity = Math.max(0, 1 - progress * 10);
                    } else {
                        hint.style.opacity = 1;
                    }
                }
                const introEl = document.querySelector('.village-intro');
                if (introEl) {
                    introEl.classList.toggle('faded', progress > 0.03);
                }
            }

            // Let a plain vertical mouse wheel move the street too, since
            // that's the gesture the on-screen hint describes and it's the
            // natural desktop instinct even though touch/trackpad users get
            // native horizontal scrolling for free.
            streetLayerEl.addEventListener('wheel', (e) => {
                const maxScroll = streetLayerEl.scrollWidth - streetLayerEl.clientWidth;
                if (maxScroll <= 0) return;
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    streetLayerEl.scrollLeft += e.deltaY;
                    e.preventDefault();
                }
            }, { passive: false });

            streetLayerEl.addEventListener('scroll', updateParallax, { passive: true });
            window.addEventListener('resize', updateParallax, { passive: true });
            setTimeout(updateParallax, 100);

            const origClose = closeDevlog;
            closeDevlog = function() {
                origClose();
                setTimeout(updateParallax, 50);
            };

            updateParallax();
            setBackButtonVisible(false);

            // ── Keyboard navigation for houses ──
            document.addEventListener('keydown', (e) => {
                if (isOverlayOpen) return;
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const btns = streetTrack.querySelectorAll('.house-marker');
                    let currentIdx = -1;
                    btns.forEach((b, i) => { if (b === document.activeElement) currentIdx = i; });
                    if (currentIdx === -1) {
                        btns[0]?.focus();
                    } else {
                        const next = (currentIdx + 1) % btns.length;
                        btns[next]?.focus();
                    }
                }
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const btns = streetTrack.querySelectorAll('.house-marker');
                    let currentIdx = -1;
                    btns.forEach((b, i) => { if (b === document.activeElement) currentIdx = i; });
                    if (currentIdx === -1) {
                        btns[btns.length - 1]?.focus();
                    } else {
                        const prev = (currentIdx - 1 + btns.length) % btns.length;
                        btns[prev]?.focus();
                    }
                }
            });

            setTimeout(() => {
                const first = streetTrack.querySelector('.house-marker');
                if (first) first.focus();
            }, 800);

            window.__closeVillageDevlog = closeDevlog;
            window.__villageOpenDevlog = openDevlog;
            if (window.__pendingVillageHouse) {
                const key = window.__pendingVillageHouse;
                window.__pendingVillageHouse = null;
                setTimeout(() => openDevlog(key), 300);
            }
    console.log('🏘️ Devlog Village - cozy edition loaded.');
            console.log('✨ Walk up to a house, press Enter, and step inside.');

}

