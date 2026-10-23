/* ZERO TRACE — Chapter 1 challenge data (24 missions) */
"use strict";

/* ZERO TRACE — Chapter 1+2 challenge data (40 missions, 8 districts) */
"use strict";


const MODES = [
  {
    id: "logic",
    name: "LOGIC LAB",
    icon: "bi-cpu",
    color: "#22d3ee",
    desc: "Sequence puzzles, conditions, patterns and step-by-step thinking before you touch real code.",
    skills: "LOGIC · ALGORITHMS · CONDITIONS · LOOPS · OPERATORS"
  },
  {
    id: "html",
    name: "HTML RESCUE",
    icon: "bi-filetype-html",
    color: "#fb923c",
    desc: "Repair broken webpages to bring digital facilities back online. Pick the right tags, fix the structure.",
    skills: "TAGS · SEMANTICS · FORMS · LISTS · MEDIA · LINKS"
  },
  {
    id: "css",
    name: "CSS OVERDRIVE",
    icon: "bi-filetype-css",
    color: "#60a5fa",
    desc: "Restore the city's lights and layouts. Style live pages and watch the grid respond instantly.",
    skills: "FLEXBOX · GRID · COLORS · SPACING · TYPOGRAPHY · MOTION"
  },
  {
    id: "js",
    name: "JAVASCRIPT BREACH",
    icon: "bi-filetype-js",
    color: "#facc15",
    desc: "Force broken systems to obey. Wire buttons, doors, loops, arrays and logic back into the network.",
    skills: "VARIABLES · FUNCTIONS · IF/ELSE · LOOPS · ARRAYS · STRINGS"
  },
  {
    id: "python",
    name: "PYTHON PROTOCOL",
    icon: "bi-filetype-py",
    color: "#3776ab",
    desc: "Run real Python inside the grid. Fix scripts executed by a genuine Python runtime in your browser.",
    skills: "FUNCTIONS · LOOPS · LISTS · DICTS · f-STRINGS · PRINT"
  },
  {
    id: "php",
    name: "PHP BACKEND",
    icon: "bi-filetype-php",
    color: "#a78bfa",
    desc: "Repair the city's server scripts. Variables, loops, conditions and echo — the language of the web's backbone.",
    skills: "ECHO · VARIABLES · CONCAT · FOREACH · IF/ELSE · FUNCTIONS"
  },
  {
    id: "sql",
    name: "SQL DATABASE",
    icon: "bi-database",
    color: "#f59e0b",
    desc: "Query live data tables with real SQL. SELECT, filter, sort, update and count — the grid remembers everything.",
    skills: "SELECT · WHERE · ORDER BY · UPDATE · INSERT · COUNT"
  },
  {
    id: "react",
    name: "REACT FORGE",
    icon: "bi-atom",
    color: "#149eca",
    desc: "Rebuild the city's UI with real React components rendered live — JSX, props, lists and state.",
    skills: "COMPONENTS · JSX · PROPS · MAP · useState · EVENTS"
  },
  {
    id: "fullstack",
    name: "FULL STACK MISSION",
    icon: "bi-stack",
    color: "#e879f9",
    desc: "Build a complete mini web app by chaining missions together. Unlocks in Chapter 2.",
    skills: "HTML + CSS + JS · DEBUGGING · PROJECTS",
    locked: true
  }
];

const CHALLENGES = [
  /* ============ LOGIC LAB (6) ============ */
  {
    id: "L1", mode: "logic", type: "mcq", title: "Sequence Sync", difficulty: "Easy", xp: 50,
    story: "The district gate runs on a numeric sequence. Feed it the correct next value or it stays sealed.",
    question: "The gate pattern reads:\n\n    2, 4, 8, 16, ?\n\nWhat number unlocks the gate?",
    options: ["20", "24", "32", "64"], answer: 2,
    hint: "Look between neighbors: 2x2=4, 4x2=8, 8x2=16...",
    explanation: "Each value doubles the previous one (multiply by 2 each step).\n16 x 2 = 32. Loops in code often grow values the same way — spot the pattern, predict the next state."
  },
  {
    id: "L2", mode: "logic", type: "mcq", title: "Condition Gate", difficulty: "Easy", xp: 60,
    story: "A security panel checks one rule before opening. Trace the rule like a machine would.",
    question: "The panel runs this rule:\n\n    IF accessLevel >= 3 THEN open()\n\nA user has accessLevel = 3.\nWhat happens?",
    options: ["The gate stays shut", "The gate opens", "The panel crashes", "It asks for a password"], answer: 1,
    hint: ">= means 'greater than OR equal to'. Is 3 equal to 3?",
    explanation: "The condition accessLevel >= 3 is TRUE when accessLevel is 3, because >= includes equality.\nIn code: if (accessLevel >= 3) { open(); } — the block runs, the gate opens."
  },
  {
    id: "L3", mode: "logic", type: "mcq", title: "Loop Counter", difficulty: "Medium", xp: 70,
    story: "A drone must sweep the sector in repeated passes. Predict exactly how many passes it makes.",
    question: "The drone runs this routine:\n\n    count = 0\n    REPEAT 5 times:\n        count = count + 2\n\nWhat is the final value of count?",
    options: ["5", "7", "10", "12"], answer: 2,
    hint: "Each pass ADDS 2. How many passes, and what is 5 x 2?",
    explanation: "The loop runs 5 times and each iteration adds 2, so count grows 0 -> 2 -> 4 -> 6 -> 8 -> 10.\nExactly like: for (let i = 0; i < 5; i++) { count += 2; }"
  },
  {
    id: "L4", mode: "logic", type: "mcq", title: "Fibonacci Vault", difficulty: "Medium", xp: 80,
    story: "An old vault lock uses a famous mathematical sequence. Crack it.",
    question: "The vault dial shows:\n\n    1, 1, 2, 3, 5, ?\n\nWhat number comes next?",
    options: ["6", "7", "8", "9"], answer: 2,
    hint: "Each number is the SUM of the two before it. What is 3 + 5?",
    explanation: "This is the Fibonacci sequence: each value is the sum of the previous two.\n3 + 5 = 8. Fibonacci patterns appear in loops that remember the last two values — a classic programming exercise."
  },
  {
    id: "L5", mode: "logic", type: "mcq", title: "Operator Override", difficulty: "Medium", xp: 80,
    story: "The reactor computes its output with one expression. Predict it exactly — machines follow precedence rules, not gut feel.",
    question: "The reactor computes:\n\n    result = 2 + 3 * 4\n\nWhat is result?",
    options: ["20", "24", "14", "9"], answer: 2,
    hint: "Multiplication happens BEFORE addition. Do 3 x 4 first, then add 2.",
    explanation: "Multiplication has higher precedence than addition: 2 + (3 x 4) = 2 + 12 = 14.\nIn code, same rule: 2 + 3 * 4 evaluates to 14. Use parentheses (2 + 3) * 4 when you want 20."
  },
  {
    id: "L6", mode: "logic", type: "mcq", title: "Dual-Key Console", difficulty: "Hard", xp: 100,
    story: "The master console needs TWO keys turned at the same time. Model the AND rule.",
    question: "The console opens only if:\n\n    keyA = true AND keyB = true\n\nkeyA is true, keyB is false.\nDoes it open?",
    options: ["Yes, one key is enough", "No, AND needs both true", "Yes, keys average to true", "It opens randomly"], answer: 1,
    hint: "AND is strict: every input must be true. Is every input true here?",
    explanation: "Logical AND (&& in code) returns true ONLY when both sides are true.\ntrue && false = false. Compare with OR (||), which is satisfied by just one true input."
  },

  /* ============ HTML RESCUE (6) ============ */
  {
    id: "H1", mode: "html", type: "code", language: "html", filename: "tower.html",
    title: "Restore the Signal Tower", difficulty: "Easy", xp: 80,
    story: "The broadcast tower's status page lost its main heading. The system only reboots when it detects an <h1> heading that says exactly: SIGNAL ONLINE",
    starterCode:
'<body>\n  <!-- The tower needs ONE main heading -->\n  <p>SIGNAL ONLINE</p>\n</body>',
    testCode:
"setTimeout(function(){\n  var h = document.querySelector('h1');\n  if (!h) return fail('No <h1> heading found. The tower needs a main heading.');\n  if (h.textContent.trim() !== 'SIGNAL ONLINE') return fail('The <h1> must say exactly: SIGNAL ONLINE');\n  pass('Main heading detected. Tower rebooting.');\n}, 80);",
    hint: "Use the top-level heading tag: <h1> ... </h1>. Replace the <p> with it.",
    explanation: "Headings rank from <h1> (most important) to <h6>. Pages should have exactly one <h1> describing the main topic.\nThe tower's scanner looks for h1, so a <p> paragraph — even with the right text — does not count."
  },
  {
    id: "H2", mode: "html", type: "code", language: "html", filename: "archive.html",
    title: "Recover the City Archive Image", difficulty: "Easy", xp: 90,
    story: "The archive's photo of the old city refuses to load cleanly. Something is missing from the image tag. Repair it.",
    starterCode:
'<body>\n  <!-- Fix the broken image below -->\n  <img src="old-city.jpg">\n  <p>The photo should show above this line.</p>\n</body>',
    testCode:
"setTimeout(function(){\n  var imgs = document.querySelectorAll('img');\n  if (imgs.length === 0) return fail('No <img> tag found at all.');\n  var ok = false;\n  imgs.forEach(function(im){ if (im.getAttribute('alt') !== null && im.getAttribute('alt').trim() !== '') ok = true; });\n  if (!ok) return fail('Every image needs a non-empty alt attribute: <img src=\"...\" alt=\"...\">');\n  pass('Image repaired with accessible alt text.');\n}, 80);",
    hint: "A complete image tag looks like: <img src=\"file.jpg\" alt=\"description\">",
    explanation: "The <img> tag needs two things: src (where the image lives) and alt (text shown if the image fails — critical for screen readers and SEO).\nNotice <img> has no closing tag: it is a self-contained (void) element."
  },
  {
    id: "H3", mode: "html", type: "code", language: "html", filename: "network.html",
    title: "Reconnect the Network Portal", difficulty: "Medium", xp: 100,
    story: "Citizens click the portal link but nothing happens — the link has no destination. Wire it to the secure server.",
    starterCode:
'<body>\n  <!-- This link goes nowhere. Point it to https://grid.zero-trace.ph -->\n  <a>Enter the Secure Grid</a>\n</body>',
    testCode:
"setTimeout(function(){\n  var a = document.querySelector('a');\n  if (!a) return fail('No <a> link found.');\n  var href = a.getAttribute('href');\n  if (!href) return fail('The <a> tag has no href attribute. Links need href=\"...\".');\n  if (href.indexOf('grid.zero-trace.ph') === -1) return fail('href must point to grid.zero-trace.ph (got: ' + href + ')');\n  pass('Portal reconnected. Citizens can travel again.');\n}, 80);",
    hint: "Add href inside the opening tag: <a href=\"https://...\">text</a>",
    explanation: "An anchor tag without href renders as plain text — not clickable. The href attribute holds the destination.\nAbsolute URLs like https://grid.zero-trace.ph point anywhere on the web; relative ones like /map.html point inside your own site."
  },
  {
    id: "H4", mode: "html", type: "code", language: "html", filename: "login.html",
    title: "Rebuild the Login Terminal", difficulty: "Medium", xp: 110,
    story: "The login terminal's username field was stripped down to a bare tag. Restore it: an <input> with type=\"text\" and name=\"username\".",
    starterCode:
'<body>\n  <!-- The input lost its attributes. Restore type and name. -->\n  <label>Callsign:</label>\n  <input>\n</body>',
    testCode:
"setTimeout(function(){\n  var inp = document.querySelector('input');\n  if (!inp) return fail('No <input> found.');\n  if (inp.getAttribute('type') !== 'text') return fail('input needs type=\"text\"');\n  if (inp.getAttribute('name') !== 'username') return fail('input needs name=\"username\" so the server can read it');\n  pass('Login terminal rebuilt. Agents can sign in.');\n}, 80);",
    hint: "Attributes live inside the tag: <input type=\"text\" name=\"username\">",
    explanation: "Attributes configure a tag: type=\"text\" makes a one-line text field, and name=\"username\" labels the data when the form is submitted.\nOther input types: password, email, number, checkbox — each gives free browser validation."
  },
  {
    id: "H5", mode: "html", type: "code", language: "html", filename: "manifest.html",
    title: "Repair the Evacuation Manifest", difficulty: "Medium", xp: 110,
    story: "The evacuation roster renders as one run-on sentence. Rebuild it as an UNORDERED list with exactly 3 <li> items: Alpha, Bravo, Charlie.",
    starterCode:
'<body>\n  <!-- This should be a bulleted list with 3 items -->\n  Alpha Bravo Charlie\n</body>',
    testCode:
"setTimeout(function(){\n  var ul = document.querySelector('ul');\n  if (!ul) return fail('Wrap the items in a <ul> unordered list.');\n  var items = ul.querySelectorAll('li');\n  if (items.length !== 3) return fail('Expected 3 <li> items, found ' + items.length);\n  var texts = Array.prototype.map.call(items, function(x){ return x.textContent.trim().toLowerCase(); });\n  if (texts[0] !== 'alpha' || texts[1] !== 'bravo' || texts[2] !== 'charlie') return fail('Items must be Alpha, Bravo, Charlie in order');\n  pass('Manifest rebuilt. Evacuation routes listed.');\n}, 80);",
    hint: "<ul>\n  <li>Alpha</li>\n  <li>Bravo</li>\n  <li>Charlie</li>\n</ul>",
    explanation: "<ul> creates a bulleted (unordered) list; each <li> is one item. Use <ol> when the ORDER matters — it shows numbers instead of bullets.\nLists are the correct tool for any sequence of parallel items, never a run of text."
  },
  {
    id: "H6", mode: "html", type: "code", language: "html", filename: "news.html",
    title: "Restructure the News Feed", difficulty: "Hard", xp: 120,
    story: "The district news page lost its semantic skeleton. The crawler bot demands a proper <header> and <footer>, each with non-empty content.",
    starterCode:
'<body>\n  <!-- Give this page a semantic header and footer -->\n  <div>District Bulletin</div>\n  <p>Power restored to Sector 7.</p>\n  <div>(c) 2026 Zero Trace City</div>\n</body>',
    testCode:
"setTimeout(function(){\n  var h = document.querySelector('header');\n  var f = document.querySelector('footer');\n  if (!h) return fail('No <header> element found. Convert the top div.');\n  if (!f) return fail('No <footer> element found. Convert the bottom div.');\n  if (h.textContent.trim() === '') return fail('<header> needs content.');\n  if (f.textContent.trim() === '') return fail('<footer> needs content.');\n  pass('Semantic structure restored. Crawler satisfied.');\n}, 80);",
    hint: "Replace the top <div> with <header>...</header> and the bottom one with <footer>...</footer>.",
    explanation: "Semantic tags (<header>, <footer>, <nav>, <main>, <article>) describe MEANING, not just looks. Screen readers, search engines and other developers understand them — a <div> tells nobody anything."
  },

  /* ============ CSS OVERDRIVE (6) ============ */
  {
    id: "C1", mode: "css", type: "code", language: "css", filename: "city-lights.css",
    title: "Reboot the City Lights", difficulty: "Easy", xp: 80,
    story: "Every sign in the district renders as plain black text on black. Target the .sign class and bring the neon color back: #22d3ee",
    starterCode:
'/* The signs lost their color. Fix the .sign class. */\n.sign {\n  color: black;\n  font-size: 22px;\n}',
    baseCss: ".wrap{font-family:monospace;padding:18px;background:#0a0e17;color:#8899bb;min-height:120px}",
    testHtml: '<div class="wrap"><div class="sign">NEON DISTRICT</div><div class="sign">GRID MARKET</div></div>',
    testCode:
"setTimeout(function(){\n  var el = document.querySelector('.sign');\n  if (!el) return fail('No .sign element found.');\n  var c = getComputedStyle(el).color.replace(/\\s/g,'');\n  if (c === 'rgb(34,211,238)') return pass('Neon restored across the district.');\n  fail('.sign color must be #22d3ee (currently ' + c + ')');\n}, 80);",
    hint: "#22d3ee is written directly: .sign { color: #22d3ee; }",
    explanation: "CSS rules have the shape: selector { property: value; }.\nThe class selector .sign matches every element with class=\"sign\". color sets text color; hex codes like #22d3ee describe exact colors."
  },
  {
    id: "C2", mode: "css", type: "code", language: "css", filename: "elevator.css",
    title: "Align the Elevator Core", difficulty: "Medium", xp: 100,
    story: "The elevator core module is pinned to the corner of its bay. Center it perfectly — both horizontally AND vertically — using flexbox.",
    starterCode:
'/* The .bay must become a flex container and center .core */\n.bay {\n  height: 140px;\n  border: 1px dashed #334;\n  background: #0d1424;\n}\n.core {\n  width: 60px;\n  height: 60px;\n  background: #e879f9;\n  border-radius: 10px;\n}',
    baseCss: ".wrap{font-family:monospace;padding:14px;background:#0a0e17;color:#8899bb}",
    testHtml: '<div class="wrap"><div class="bay"><div class="core"></div></div></div>',
    testCode:
"setTimeout(function(){\n  var bay = document.querySelector('.bay');\n  var core = document.querySelector('.core');\n  if (!bay || !core) return fail('Missing .bay or .core element.');\n  var b = getComputedStyle(bay);\n  if (b.display !== 'flex') return fail('.bay must use display: flex (got ' + b.display + ')');\n  if (b.justifyContent !== 'center') return fail('Add justify-content: center for horizontal centering.');\n  if (b.alignItems !== 'center') return fail('Add align-items: center for vertical centering.');\n  pass('Elevator core perfectly aligned.');\n}, 80);",
    hint: "Three lines on .bay: display: flex; justify-content: center; align-items: center;",
    explanation: "display: flex turns .bay into a flex container; its children line up on the main axis.\njustify-content centers along the main axis (horizontal, by default) and align-items centers on the cross axis (vertical). Together they dead-center a child."
  },
  {
    id: "C3", mode: "css", type: "code", language: "css", filename: "shield.css",
    title: "Charge the Energy Shield", difficulty: "Medium", xp: 110,
    story: "The district shield sits invisible and lifeless. Give .shield a solid green (#22c55e) background, 90px height, rounded corners and a slow pulse animation.",
    starterCode:
'/* Style the shield below */\n.shield {\n  background: transparent;\n}',
    baseCss: ".wrap{font-family:monospace;padding:14px;background:#0a0e17;color:#8899bb}@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}",
    testHtml: '<div class="wrap"><div class="shield"></div></div>',
    testCode:
"setTimeout(function(){\n  var s = document.querySelector('.shield');\n  if (!s) return fail('No .shield element found.');\n  var c = getComputedStyle(s);\n  if (c.backgroundColor.replace(/\\s/g,'') !== 'rgb(34,197,94)') return fail('background must be #22c55e (got ' + c.backgroundColor + ')');\n  if (parseInt(c.height) < 90) return fail('height must be at least 90px (got ' + c.height + ')');\n  if (parseFloat(c.borderTopLeftRadius) < 10) return fail('Add rounded corners with border-radius.');\n  if (c.animationName.indexOf('pulse') === -1) return fail('Add: animation: pulse 2s infinite; (pulse keyframes are pre-loaded)');\n  pass('Shield charged. District is safe.');\n}, 80);",
    hint: ".shield { background:#22c55e; height:90px; border-radius:14px; animation: pulse 2s infinite; }",
    explanation: "Animations in CSS come in two parts: @keyframes (the frames, already provided here as 'pulse') and the animation property that applies them.\nborder-radius rounds corners; background + height give the shield its body."
  },
  {
    id: "C4", mode: "css", type: "code", language: "css", filename: "solar-grid.css",
    title: "Rebuild the Solar Grid Layout", difficulty: "Medium", xp: 120,
    story: "The solar panels stack vertically in one sad column. Lay them out as a CSS GRID with exactly 3 equal columns (use repeat) and a 12px gap.",
    starterCode:
'/* Turn .grid into a 3-column grid with a 12px gap */\n.grid {\n  background: #0d1424;\n  padding: 10px;\n}\n.panel-cell {\n  height: 50px;\n  background: #fbbf24;\n  border-radius: 8px;\n}',
    baseCss: ".wrap{font-family:monospace;padding:14px;background:#0a0e17;color:#8899bb}",
    testHtml: '<div class="wrap"><div class="grid"><div class="panel-cell"></div><div class="panel-cell"></div><div class="panel-cell"></div><div class="panel-cell"></div><div class="panel-cell"></div><div class="panel-cell"></div></div></div>',
    testCode:
"setTimeout(function(){\n  var g = document.querySelector('.grid');\n  if (!g) return fail('No .grid element found.');\n  var c = getComputedStyle(g);\n  if (c.display !== 'grid') return fail('.grid must use display: grid (got ' + c.display + ')');\n  var cols = c.gridTemplateColumns.split(' ').length;\n  if (cols !== 3) return fail('grid-template-columns must create 3 columns (found ' + cols + '). Try: repeat(3, 1fr)');\n  if (parseInt(c.columnGap) !== 12) return fail('column-gap must be 12px (got ' + c.columnGap + ')');\n  pass('Solar grid reassembled. Power flowing.');\n}, 80);",
    hint: ".grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }",
    explanation: "display: grid switches to grid layout. grid-template-columns defines the columns — repeat(3, 1fr) means 3 equal flexible columns.\n1fr = one fraction of the free space; gap adds spacing between cells without extra markup."
  },
  {
    id: "C5", mode: "css", type: "code", language: "css", filename: "id-card.css",
    title: "Design the Agent ID Card", difficulty: "Medium", xp: 120,
    story: "The new agent ID cards look flat and cramped. Style .card with: dark background #111827, 24px padding, 16px border-radius, and a subtle cyan border (1px solid #22d3ee).",
    starterCode:
'/* Style the ID card */\n.card {\n  color: #dbe7ff;\n}',
    baseCss: ".wrap{font-family:monospace;padding:14px;background:#0a0e17;color:#8899bb}",
    testHtml: '<div class="wrap"><div class="card">AGENT // RK-07</div></div>',
    testCode:
"setTimeout(function(){\n  var c = document.querySelector('.card');\n  if (!c) return fail('No .card element found.');\n  var s = getComputedStyle(c);\n  if (s.backgroundColor.replace(/\\s/g,'') !== 'rgb(17,24,39)') return fail('background must be #111827 (got ' + s.backgroundColor + ')');\n  if (parseInt(s.paddingTop) !== 24) return fail('padding must be 24px (got ' + s.paddingTop + ')');\n  if (parseFloat(s.borderTopLeftRadius) !== 16) return fail('border-radius must be 16px');\n  if (s.borderTopWidth !== '1px') return fail('Add a 1px border');\n  var bc = s.borderTopColor.replace(/\\s/g,'');\n  if (bc !== 'rgb(34,211,238)') return fail('border color must be #22d3ee (got ' + bc + ')');\n  pass('ID cards issued. Looking sharp, agent.');\n}, 80);",
    hint: ".card { background:#111827; padding:24px; border-radius:16px; border:1px solid #22d3ee; }",
    explanation: "The box model: padding = space INSIDE the element, border = the edge, margin = space OUTSIDE.\nShorthand like border: 1px solid #22d3ee sets width, style and color in one line — a pattern you'll see everywhere."
  },
  {
    id: "C6", mode: "css", type: "code", language: "css", filename: "banner.css",
    title: "Ignite the Victory Banner", difficulty: "Hard", xp: 130,
    story: "The victory banner must make an entrance: .banner needs text-transform uppercase, 6px letter-spacing, a bold 28px font size, a glowing cyan text color (#67e8f9), and a drop-shadow filter. Finish with a 1-second fade-in animation using the provided keyframes.",
    starterCode:
'/* Make the banner command attention */\n.banner {\n  color: #556;\n}',
    baseCss: ".wrap{font-family:monospace;padding:16px;background:#0a0e17;color:#8899bb;text-align:center}@keyframes fadeIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}",
    testHtml: '<div class="wrap"><div class="banner">SECTOR CLEARED</div></div>',
    testCode:
"setTimeout(function(){\n  var b = document.querySelector('.banner');\n  if (!b) return fail('No .banner element found.');\n  var s = getComputedStyle(b);\n  if (s.textTransform !== 'uppercase') return fail('Add text-transform: uppercase');\n  if (parseFloat(s.letterSpacing) !== 6) return fail('letter-spacing must be 6px (got ' + s.letterSpacing + ')');\n  if (parseInt(s.fontSize) !== 28) return fail('font-size must be 28px (got ' + s.fontSize + ')');\n  if (s.color.replace(/\\s/g,'') !== 'rgb(103,232,249)') return fail('color must be #67e8f9 (got ' + s.color + ')');\n  if (s.filter.indexOf('drop-shadow') === -1) return fail('Add a filter like: filter: drop-shadow(0 0 10px #67e8f9)');\n  if (s.animationName.indexOf('fadeIn') === -1) return fail('Add: animation: fadeIn 1s ease; (keyframes are pre-loaded)');\n  pass('Banner ignited. The city celebrates.');\n}, 80);",
    hint: ".banner { text-transform:uppercase; letter-spacing:6px; font-size:28px; color:#67e8f9; filter: drop-shadow(0 0 10px #67e8f9); animation: fadeIn 1s ease; }",
    explanation: "Typography properties (text-transform, letter-spacing, font-size) shape readability and mood; filter: drop-shadow() adds glow without images.\nAnimations like fadeIn (keyframes pre-loaded) bring pages to life — always pair animation with transform or opacity for smooth performance."
  },

  /* ============ JAVASCRIPT BREACH (6) ============ */
  {
    id: "J1", mode: "js", type: "mcq", title: "The Security Door Probe", difficulty: "Easy", xp: 100,
    story: "Before you touch the door's real code, the terminal quizzes you. Read the snippet and predict its output — exactly like a debugger would.",
    question: "The door system runs:\n\n    let doorOpen = false;\n\n    function openDoor() {\n      doorOpen = true;\n      return doorOpen;\n    }\n\n    console.log(openDoor());\n\nWhat prints to the console?",
    options: ["false", "true", "undefined", "Error"], answer: 1,
    hint: "openDoor() sets doorOpen = true, then RETURNS it. What does console.log receive?",
    explanation: "Calling openDoor() executes the body: doorOpen becomes true, and return doorOpen hands that value back.\nconsole.log(openDoor()) therefore receives true. A function's return value is its 'answer' to the caller."
  },
  {
    id: "J2", mode: "js", type: "code", language: "js", filename: "door.js",
    title: "Restore the Security Door", difficulty: "Easy", xp: 120,
    story: "Someone sabotaged the door controller — it always returns false. Fix the function so openDoor() flips the door state and returns true.",
    starterCode:
'// SABOTAGED — the door never opens.\nlet doorOpen = false;\n\nfunction openDoor() {\n  doorOpen = false;\n  return doorOpen;\n}\n\nconsole.log("Door state:", openDoor());',
    testCode:
"setTimeout(function(){\n  try {\n    var r = openDoor();\n    if (r === true && doorOpen === true) return pass('Door unlocked. Route cleared.');\n    if (r === true) return fail('openDoor() returned true but doorOpen is still false. Set BOTH.');\n    fail('openDoor() still returns ' + r + '. Flip the sabotaged values to true.');\n  } catch (e) { fail('Error while testing: ' + e.message); }\n}, 80);",
    hint: "Inside openDoor(): set doorOpen = true; and return true;",
    explanation: "A function can update outer state (doorOpen) AND return a value. The sabotage flipped both to false.\nFixed: doorOpen = true; return true; — calling openDoor() flips the system state and reports success."
  },
  {
    id: "J3", mode: "js", type: "code", language: "js", filename: "reactor.js",
    title: "Stabilize the Power Reactor", difficulty: "Medium", xp: 140,
    story: "The reactor's power loop was deleted. Rebuild chargeReactor() so it loops from 1 to 5, ADDING each number to total, then returns total. Expected: 15.",
    starterCode:
'// Rebuild the loop: add every number from 1 to 5.\nfunction chargeReactor() {\n  let total = 0;\n\n  // your loop here\n\n  return total;\n}\n\nconsole.log("Power level:", chargeReactor());',
    testCode:
"setTimeout(function(){\n  try {\n    var t = chargeReactor();\n    if (t === 15) return pass('Reactor stabilized at 15 units.');\n    fail('chargeReactor() returned ' + t + ' — expected 15 (1+2+3+4+5).');\n  } catch (e) { fail('Error while testing: ' + e.message); }\n}, 80);",
    hint: "Use: for (let i = 1; i <= 5; i++) { total += i; }",
    explanation: "A for loop runs its body repeatedly: start (i=1), condition (i<=5), step (i++).\nEach pass adds i to total: 1+2+3+4+5 = 15. Loops are how programs repeat work without rewriting code."
  },
  {
    id: "J4", mode: "js", type: "code", language: "js", filename: "sentinel.js",
    title: "Reprogram the Sentinel AI", difficulty: "Hard", xp: 160,
    story: "The Sentinel must classify intruders. Complete checkAccess(level): if level >= 3 return \"GRANTED\", otherwise return \"DENIED\".",
    starterCode:
'// The Sentinel must return GRANTED or DENIED.\nfunction checkAccess(level) {\n  // your code here\n}\n\nconsole.log(checkAccess(5));  // expect GRANTED\nconsole.log(checkAccess(1));  // expect DENIED',
    testCode:
"setTimeout(function(){\n  try {\n    if (typeof checkAccess !== 'function') return fail('checkAccess() function not found.');\n    if (checkAccess(5) !== 'GRANTED') return fail('checkAccess(5) must return \"GRANTED\"');\n    if (checkAccess(3) !== 'GRANTED') return fail('checkAccess(3) must return \"GRANTED\" (>= includes 3)');\n    if (checkAccess(1) !== 'DENIED') return fail('checkAccess(1) must return \"DENIED\"');\n    pass('Sentinel logic restored. Sectors secured.');\n  } catch (e) { fail('Error while testing: ' + e.message); }\n}, 80);",
    hint: "Use if/else: if (level >= 3) { return \"GRANTED\"; } else { return \"DENIED\"; }",
    explanation: "if/else branches execution based on a condition. return immediately exits the function with a value.\n>= includes equality, so level 3 passes. String values must match exactly, including quotes."
  },
  {
    id: "J5", mode: "js", type: "code", language: "js", filename: "scanner.js",
    title: "Fix the Drone Data Scanner", difficulty: "Medium", xp: 150,
    story: "The survey drone reads 4 sensor values but reports nonsense. Repair averageReading() so it returns the MEAN of the array (sum divided by length). Expected: 25.",
    starterCode:
'// The array logic is broken. Return the average of the readings.\nfunction averageReading(readings) {\n  let sum = 0;\n  // sum up all readings, then divide by how many there are\n  return sum;\n}\n\nconsole.log("Average:", averageReading([10, 20, 30, 40]));  // expect 25',
    testCode:
"setTimeout(function(){\n  try {\n    if (typeof averageReading !== 'function') return fail('averageReading() not found.');\n    if (averageReading([10,20,30,40]) !== 25) return fail('averageReading([10,20,30,40]) must be 25');\n    if (averageReading([5,5]) !== 5) return fail('averageReading([5,5]) must be 5');\n    if (averageReading([2,4]) !== 3) return fail('averageReading([2,4]) must be 3');\n    pass('Scanner calibrated. Readings accurate.');\n  } catch (e) { fail('Error while testing: ' + e.message); }\n}, 80);",
    hint: "Loop through readings adding each to sum (or use for...of), then return sum / readings.length;",
    explanation: "Arrays store lists; .length tells you how many items. The mean = total / count.\nA for...of loop visits each item directly: for (const r of readings) { sum += r; } — then return sum / readings.length."
  },
  {
    id: "J6", mode: "js", type: "code", language: "js", filename: "announcer.js",
    title: "Rewire the Hype Announcer", difficulty: "Hard", xp: 170,
    story: "The arena announcer speaks too softly. Build shout(text) so it returns the text in UPPERCASE with an exclamation mark at the end. \"sector clear\" must become \"SECTOR CLEAR!\".",
    starterCode:
'// Make the announcer LOUD.\nfunction shout(text) {\n  // return the text uppercased + "!" \n}\n\nconsole.log(shout("sector clear"));  // expect: SECTOR CLEAR!\nconsole.log(shout("zero trace"));    // expect: ZERO TRACE!',
    testCode:
"setTimeout(function(){\n  try {\n    if (typeof shout !== 'function') return fail('shout() not found.');\n    if (shout('sector clear') !== 'SECTOR CLEAR!') return fail('shout(\"sector clear\") must be \"SECTOR CLEAR!\"');\n    if (shout('zero trace') !== 'ZERO TRACE!') return fail('shout(\"zero trace\") must be \"ZERO TRACE!\"');\n    if (shout('hi') !== 'HI!') return fail('shout(\"hi\") must be \"HI!\"');\n    pass('Announcer rewired. The crowd goes wild.');\n  } catch (e) { fail('Error while testing: ' + e.message); }\n}, 80);",
    hint: "Use text.toUpperCase() + \"!\"",
    explanation: "Strings carry methods like toUpperCase(), toLowerCase(), trim() and .length — no loop needed for common transforms.\nThe + operator JOINS strings: text.toUpperCase() + \"!\" concatenates the transformed text with the exclamation mark."
  },
  /* ============ PYTHON PROTOCOL (4) ============ */
  {
    id: "P1", mode: "python", type: "code", language: "python", filename: "greet.py",
    title: "Repair the Greeting Drone", difficulty: "Easy", xp: 120,
    story: "A welcome drone should greet every citizen by name. Its Python script is broken — it ignores the name entirely. Fix greet(name) to return: Hello, {name}!",
    starterCode:
'# The greeting drone ignores its parameter.\ndef greet(name):\n    return "Hello"\n\nprint(greet("Trainee"))',
    testCode:
'assert greet("Ada") == "Hello, Ada!", "greet(\'Ada\') should return \'Hello, Ada!\'"\nassert greet("RK-07") == "Hello, RK-07!", "greet(\'RK-07\') failed"\nassert greet("") == "Hello, !", "empty name should give \'Hello, !\'"\nzt_pass("Greeting drone repaired")',
    hint: "Use an f-string: return f\"Hello, {name}!\"",
    explanation: "f-strings let you embed expressions inside strings: f\"Hello, {name}!\".\nWhatever you pass as name gets substituted. Functions in Python are defined with def, and return sends a value back to the caller."
  },
  {
    id: "P2", mode: "python", type: "code", language: "python", filename: "reactor.py",
    title: "Stabilize the Fusion Core", difficulty: "Medium", xp: 150,
    story: "The fusion core needs the total output of units 1 to 10. The loop was deleted from total_power(). Rebuild it — the expected total is 55.",
    starterCode:
'# Sum every unit output from 1 to 10.\ndef total_power():\n    total = 0\n    # your loop here\n    return total\n\nprint("Total power:", total_power())',
    testCode:
'assert total_power() == 55, "total_power() should return 55 (1+2+...+10)"\nzt_pass("Fusion core stabilized")',
    hint: "Use: for i in range(1, 11):\n          total += i",
    explanation: "range(1, 11) generates 1 through 10 (the stop value is excluded).\nEach pass adds i to total: 1+2+...+10 = 55. Indentation (4 spaces) defines the loop body in Python — it is syntax, not style."
  },
  {
    id: "P3", mode: "python", type: "code", language: "python", filename: "filter.py",
    title: "Calibrate the Sensor Filter", difficulty: "Medium", xp: 160,
    story: "Sensors report junk mixed with real readings. even_only(readings) must return a NEW list containing only the even numbers, in order.",
    starterCode:
'# Return a list with ONLY the even numbers.\ndef even_only(readings):\n    result = []\n    # filter the readings\n    return result\n\nprint(even_only([1, 2, 3, 4, 5, 6]))  # expect [2, 4, 6]',
    testCode:
'assert even_only([1,2,3,4,5,6]) == [2,4,6], "expected [2, 4, 6]"\nassert even_only([10,15,20,7]) == [10,20], "expected [10, 20]"\nassert even_only([1,3,5]) == [], "no evens should give []"\nzt_pass("Sensor filter calibrated")',
    hint: "Check each reading with: if r % 2 == 0:  then result.append(r)",
    explanation: "The % operator gives the remainder after division. r % 2 == 0 means r is even.\nLoop through the list, test each item, and result.append(r) adds matches to the new list — the classic filter pattern."
  },
  {
    id: "P4", mode: "python", type: "code", language: "python", filename: "systems.py",
    title: "Read the City Systems Registry", difficulty: "Hard", xp: 180,
    story: "The city status board reads from a Python dictionary. shield_status(systems) must return the value stored under the \"shield\" key.",
    starterCode:
'# Report the shield\'s status from the systems dictionary.\ndef shield_status(systems):\n    # read the "shield" key\n    return "UNKNOWN"\n\nprint(shield_status({"reactor": "ONLINE", "shield": "OFFLINE"}))  # expect OFFLINE',
    testCode:
'assert shield_status({"reactor": "ONLINE", "shield": "OFFLINE"}) == "OFFLINE", "should read the shield value"\nassert shield_status({"shield": "ONLINE", "gate": "OPEN"}) == "ONLINE", "second case failed"\nzt_pass("Registry interface restored")',
    hint: "Dictionaries use square brackets: return systems[\"shield\"]",
    explanation: "Dictionaries store key:value pairs. systems[\"shield\"] looks up the value for the key \"shield\".\nUnlike lists (indexed by position), dicts are indexed by keys — perfect for records like {name: value}."
  },

  /* ============ PHP BACKEND (4) ============ */
  {
    id: "PHP1", mode: "php", type: "code", language: "php", filename: "broadcast.php",
    title: "Restore the Emergency Broadcast", difficulty: "Easy", xp: 110,
    story: "The emergency broadcast script prints SYSTEM DOWN. The city needs SYSTEM ONLINE echoed to every terminal.",
    starterCode:
'<?php\n  // The broadcast must announce the all-clear.\n  echo "SYSTEM DOWN";\n?>',
    checks: [
      { pattern: "echo\\s+[\"']SYSTEM ONLINE[\"']", msg: "echo \"SYSTEM ONLINE\"; — the broadcast text must be exactly SYSTEM ONLINE" }
    ],
    expectedOutput: ["SYSTEM ONLINE"],
    hint: "Change the string to \"SYSTEM ONLINE\"",
    explanation: "echo prints output to the page in PHP. Statements end with a semicolon.\nPHP files live between <?php and ?>. On a real server, this text would appear in every citizen's browser."
  },
  {
    id: "PHP2", mode: "php", type: "code", language: "php", filename: "badge.php",
    title: "Print the Agent Badge", difficulty: "Medium", xp: 130,
    story: "The badge printer drops the agent code — it echoes a bare word instead of the variable. In PHP every variable starts with $.",
    starterCode:
'<?php\n  $agent = "RK-07";\n  // BUG: "agent" without $ is just a word, not the variable\n  echo "Agent: " . agent;\n?>',
    checks: [
      { pattern: "\\.\\s*\\$agent", msg: "Concatenate the VARIABLE: \"Agent: \" . $agent" }
    ],
    expectedOutput: ["Agent: RK-07"],
    hint: "Variables need the dollar sign: $agent",
    explanation: "PHP variables always start with $: $agent. A bare word like agent means nothing.\nThe dot (.) joins strings — PHP's version of string concatenation."
  },
  {
    id: "PHP3", mode: "php", type: "code", language: "php", filename: "readings.php",
    title: "Total the Grid Readings", difficulty: "Medium", xp: 150,
    story: "The power report should sum all readings with a foreach loop. The loop is missing, so the total is always 0.",
    starterCode:
'<?php\n  $readings = [10, 20, 30];\n  $total = 0;\n  // TODO: loop through $readings and add each value to $total\n  echo "Total: " . $total;\n?>',
    checks: [
      { pattern: "foreach\\s*\\(\\s*\\$readings\\s+as\\s+\\$\\w+\\s*\\)", msg: "Add a foreach loop: foreach ($readings as $r) { ... }" },
      { pattern: "\\$total\\s*\\+=", msg: "Inside the loop, add each value: $total += $r;" }
    ],
    expectedOutput: ["Total: 60"],
    hint: "foreach ($readings as $r) {\n  $total += $r;\n}",
    explanation: "foreach ($readings as $r) visits each element, binding it to $r one at a time.\n$total += $r is shorthand for $total = $total + $r. 10+20+30 = 60."
  },
  {
    id: "PHP4", mode: "php", type: "code", language: "php", filename: "sentinel.php",
    title: "Program the Clearance Checker", difficulty: "Hard", xp: 170,
    story: "The clearance function is empty. Make clearLevel($score) return \"CLEARED\" when $score >= 50, otherwise \"FAILED\".",
    starterCode:
'<?php\n  function clearLevel($score) {\n    // return "CLEARED" if $score >= 50, else "FAILED"\n  }\n  echo clearLevel(75);\n  echo " / ";\n  echo clearLevel(20);\n?>',
    checks: [
      { pattern: "if\\s*\\(\\s*\\$score\\s*>=\\s*50\\s*\\)", msg: "Add the condition: if ($score >= 50) {" },
      { pattern: "return\\s+[\"']CLEARED[\"']", msg: "Return \"CLEARED\" inside the if" },
      { pattern: "return\\s+[\"']FAILED[\"']", msg: "Return \"FAILED\" in the else branch" }
    ],
    expectedOutput: ["CLEARED / FAILED"],
    hint: "if ($score >= 50) { return \"CLEARED\"; } else { return \"FAILED\"; }",
    explanation: "PHP if/else works like JavaScript's. return exits the function immediately with a value.\nNote how \"echo\" chains outputs — PHP builds pages one printed piece at a time."
  },

  /* ============ SQL DATABASE (4) ============ */
  {
    id: "Q1", mode: "sql", type: "code", language: "sql", filename: "query.sql",
    title: "Find the Paligsahan Citizens", difficulty: "Easy", xp: 120,
    story: "The relief office needs a list of every citizen in the 'Paligsahan' district. Query the citizens table.",
    starterCode:
"-- Find all citizens whose district is 'Paligsahan'\nSELECT * FROM citizens;",
    tables: {
      citizens: { columns: ["id", "name", "district"], rows: [[1, "Mara", "Paligsahan"], [2, "Jules", "Molo"], [3, "Ana", "Paligsahan"], [4, "Ken", "Jaro"]] }
    },
    expected: [[1, "Mara", "Paligsahan"], [3, "Ana", "Paligsahan"]],
    hint: "Add: WHERE district = 'Paligsahan'  (strings use single quotes)",
    explanation: "SELECT chooses columns (* means all), FROM picks the table, WHERE filters rows.\nStrings in SQL use single quotes: 'Paligsahan'. This one query is the heart of every database report."
  },
  {
    id: "Q2", mode: "sql", type: "code", language: "sql", filename: "query.sql",
    title: "Rank the Power Generators", difficulty: "Medium", xp: 150,
    story: "The grid controller wants the names of generators producing more than 50 units, strongest first.",
    starterCode:
"-- Generators with power > 50, strongest first, names only\nSELECT * FROM generators;",
    tables: {
      generators: { columns: ["name", "power"], rows: [["Solar-1", 40], ["Reactor", 95], ["Wind-9", 62], ["Hydro-2", 30]] }
    },
    expected: [["Reactor"], ["Wind-9"]],
    hint: "SELECT name FROM generators WHERE power > 50 ORDER BY power DESC;",
    explanation: "ORDER BY sorts rows; DESC makes it highest-first.\nChaining clauses — WHERE to filter, ORDER BY to sort, and selecting only the columns you need — is how real reports are built."
  },
  {
    id: "Q3", mode: "sql", type: "code", language: "sql", filename: "query.sql",
    title: "Bring Hub-B Back Online", difficulty: "Medium", xp: 160,
    story: "Network node Hub-B (id 2) just rebooted. UPDATE its status to 'ONLINE', then show the whole nodes table to confirm.",
    starterCode:
"-- 1) Update node 2's status to ONLINE\n-- 2) Then SELECT everything from nodes to verify\nSELECT * FROM nodes;",
    tables: {
      nodes: { columns: ["id", "name", "status"], rows: [[1, "Hub-A", "OFFLINE"], [2, "Hub-B", "OFFLINE"], [3, "Hub-C", "ONLINE"]] }
    },
    expected: [[1, "Hub-A", "OFFLINE"], [2, "Hub-B", "ONLINE"], [3, "Hub-C", "ONLINE"]],
    hint: "UPDATE nodes SET status = 'ONLINE' WHERE id = 2;\nSELECT * FROM nodes;",
    explanation: "UPDATE changes existing rows — always use WHERE, or you change every row!\nSET assigns new values. The final SELECT proves the repair by showing the table's new state."
  },
  {
    id: "Q4", mode: "sql", type: "code", language: "sql", filename: "query.sql",
    title: "Count the Active Drones", difficulty: "Hard", xp: 180,
    story: "Command needs a headcount of active surveillance drones (active = 1). Return a single number using COUNT(*).",
    starterCode:
"-- Count the drones where active = 1\nSELECT * FROM drones;",
    tables: {
      drones: { columns: ["id", "active"], rows: [[1, 1], [2, 0], [3, 1], [4, 1], [5, 0], [6, 1]] }
    },
    expected: [[4]],
    hint: "SELECT COUNT(*) FROM drones WHERE active = 1;",
    explanation: "COUNT(*) tallons matching rows instead of returning them. Add AS total to name the column.\nAggregates (COUNT, SUM, AVG, MAX, MIN) collapse many rows into one summary value."
  },

  /* ============ REACT FORGE (4) ============ */
  {
    id: "R1", mode: "react", type: "code", language: "react", filename: "Status.jsx",
    title: "Restore the Status Board", difficulty: "Easy", xp: 130,
    story: "The city status board component renders the wrong message. Fix the JSX so it shows GRID ONLINE.",
    starterCode:
'function Status() {\n  return <h1>SIGNAL LOST</h1>;\n}\n\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<Status />);',
    testCode:
"setTimeout(function(){\n  var h = document.querySelector('#root h1');\n  if (!h) return fail('Nothing rendered. Check your component and root.render call.');\n  if (h.textContent.trim() !== 'GRID ONLINE') return fail('The h1 must say GRID ONLINE (got: ' + h.textContent.trim() + ')');\n  pass('Status board restored.');\n}, 700);",
    hint: "Change the JSX text to <h1>GRID ONLINE</h1>",
    explanation: "A React component is a function that returns UI description (JSX).\ncreateRoot(...).render(<Status />) mounts it to the page. Change the JSX and the screen updates — that declarative flow is React's core idea."
  },
  {
    id: "R2", mode: "react", type: "code", language: "react", filename: "Badge.jsx",
    title: "Wire the Agent Badge Props", difficulty: "Medium", xp: 150,
    story: "The badge component ignores its level prop and prints a literal question mark. Make it render: LVL {level}.",
    starterCode:
'function Badge(props) {\n  return <div className="badge">LVL ?</div>;\n}\n\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<Badge level={7} />);',
    testCode:
"setTimeout(function(){\n  var b = document.querySelector('#root .badge');\n  if (!b) return fail('No .badge rendered.');\n  if (b.textContent.trim() !== 'LVL 7') return fail('Badge must read LVL 7 (got: ' + b.textContent.trim() + ')');\n  pass('Badge wired to props.');\n}, 700);",
    hint: "Props arrive as an object: use {props.level} inside the JSX",
    explanation: "Props are inputs a parent passes to a component: <Badge level={7} />.\nInside, props.level is 7. Embedding it with {props.level} makes components reusable with different data."
  },
  {
    id: "R3", mode: "react", type: "code", language: "react", filename: "Sectors.jsx",
    title: "Render the Sector List", difficulty: "Medium", xp: 170,
    story: "The sector monitor should list every sector as its own <li>, but it renders one static item. Map over the array.",
    starterCode:
'const sectors = ["ALPHA", "BRAVO", "CHARLIE"];\n\nfunction Sectors() {\n  return (\n    <ul>\n      <li>SECTOR</li>\n    </ul>\n  );\n}\n\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<Sectors />);',
    testCode:
"setTimeout(function(){\n  var items = document.querySelectorAll('#root li');\n  if (items.length !== 3) return fail('Expected 3 <li> items, found ' + items.length + '. Map over the array.');\n  var texts = Array.prototype.map.call(items, function(x){ return x.textContent.trim(); });\n  if (texts[0] !== 'ALPHA' || texts[1] !== 'BRAVO' || texts[2] !== 'CHARLIE') return fail('Items must be ALPHA, BRAVO, CHARLIE (got: ' + texts.join(', ') + ')');\n  pass('Sector monitor online.');\n}, 700);",
    hint: "{sectors.map(s => <li key={s}>{s}</li>)}",
    explanation: "array.map transforms each item into JSX — here each sector string becomes an <li>.\nThe key prop helps React track items. Rendering lists from data is the #1 React pattern."
  },
  {
    id: "R4", mode: "react", type: "code", language: "react", filename: "Counter.jsx",
    title: "Fix the Strike Counter", difficulty: "Hard", xp: 200,
    story: "The strike counter button does nothing when clicked — setCount ignores the increment. Wire the state correctly.",
    starterCode:
'const { useState } = React;\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count)}>\n      Strikes: {count}\n    </button>\n  );\n}\n\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(<Counter />);',
    testCode:
"setTimeout(function(){\n  var btn = document.querySelector('#root button');\n  if (!btn) return fail('No button rendered.');\n  if (btn.textContent.indexOf('0') === -1) return fail('Counter should start at 0');\n  btn.click();\n  setTimeout(function(){\n    if (btn.textContent.indexOf('1') !== -1) return pass('Counter wired to state.');\n    fail('Clicking must increment the count. Check setCount.');\n  }, 150);\n}, 700);",
    hint: "Increment in the handler: setCount(count + 1)",
    explanation: "useState gives you a value and a setter. Calling setCount(count + 1) triggers a re-render with the new value.\nEvents like onClick attach handlers to JSX elements — the click flow: event -> setState -> React re-renders."
  },
  /* ============ BONUS PROBES: 4 per district (problem-solving drills) ============ */
  /* LOGIC LAB */
  {
    id: "L7", mode: "logic", type: "mcq", title: "Memory Swap", difficulty: "Easy", xp: 50,
    story: "A memory chip swaps values between two registers. Trace it exactly.",
    question: "The chip executes:\n\n    x = 5\n    y = 10\n    x = y\n\nWhat is the final value of x?",
    options: ["5", "10", "15", "Error"], answer: 1,
    hint: "x = y COPIES y's value into x. The old value of x is gone.",
    explanation: "Assignment copies the right side into the left: x = y makes x equal to 10.\nThis is exactly how it works in code: let x = 5; let y = 10; x = y; // x is now 10"
  },
  {
    id: "L8", mode: "logic", type: "mcq", title: "Modulo Lock", difficulty: "Medium", xp: 60,
    story: "A rotary lock uses remainders. Compute the correct position.",
    question: "The lock computes:\n\n    17 % 5\n\n(% means 'remainder after division')",
    options: ["3", "2", "4", "3.4"], answer: 1,
    hint: "17 divided by 5 is 3 remainder... what?",
    explanation: "17 = 5 x 3 + 2, so the remainder is 2.\nModulo (%) is everywhere in code: checking even numbers (n % 2), wrapping around lists, and clock arithmetic."
  },
  {
    id: "L9", mode: "logic", type: "mcq", title: "Doubling Pattern", difficulty: "Medium", xp: 65,
    story: "The amplifier doubles the signal each stage. Predict the next reading.",
    question: "The signal reads:\n\n    3, 6, 12, 24, ?",
    options: ["30", "36", "48", "60"], answer: 2,
    hint: "Each value doubles. What is 24 x 2?",
    explanation: "3 -> 6 -> 12 -> 24 -> 48, each step x2.\nDoubling sequences are exponential growth — the same math behind interest, virality, and binary numbers."
  },
  {
    id: "L10", mode: "logic", type: "mcq", title: "Backup Circuit", difficulty: "Hard", xp: 75,
    story: "A backup circuit triggers if EITHER sensor fires. Model the OR rule.",
    question: "The circuit rule:\n\n    alarm = sensorA OR sensorB\n\nsensorA is false, sensorB is true.\nWhat is alarm?",
    options: ["false", "true", "Error", "Unknown"], answer: 1,
    hint: "OR is generous — it needs only ONE true input.",
    explanation: "Logical OR (|| in code) returns true when at least one input is true.\nfalse || true = true. Contrast with AND, which demands both."
  },

  /* HTML RESCUE */
  {
    id: "H7", mode: "html", type: "mcq", title: "Heading Hierarchy", difficulty: "Easy", xp: 45,
    story: "The document outline scanner asks: which tag is the MAIN heading of a page?",
    question: "Which HTML tag creates the most important (largest-rank) heading?",
    options: ["<h6>", "<head>", "<h1>", "<header>"], answer: 2,
    hint: "Rank 1 is the highest — the number says it all.",
    explanation: "<h1> is the top-level heading; <h6> is the lowest. <head> holds metadata (title, links), not visible content, and <header> is a page section — not a heading."
  },
  {
    id: "H8", mode: "html", type: "mcq", title: "Portal Window", difficulty: "Medium", xp: 55,
    story: "Citizens want portal links to open in a NEW browser tab without leaving the city page.",
    question: "Which attribute on an <a> tag opens a link in a new tab?",
    options: ['href="_new"', 'target="_blank"', 'rel="newtab"', 'open="new"'], answer: 1,
    hint: "The attribute name means 'where to target the open'.",
    explanation: 'target="_blank" tells the browser to open the link in a new tab.\nGood practice pairs it with rel="noopener" for security.'
  },
  {
    id: "H9", mode: "html", type: "mcq", title: "Line Break Relay", difficulty: "Easy", xp: 45,
    story: "A telegraph transcript runs all its lines together. Which tag forces a new line?",
    question: "Which HTML tag inserts a single line break?",
    options: ["<lb>", "<break>", "<br>", "<line>"], answer: 2,
    hint: "It's two letters: B-R.",
    explanation: "<br> breaks the line. It is a void element — no closing tag.\nFor real paragraphs, prefer <p>; use <br> only for genuine line breaks like addresses or poems."
  },
  {
    id: "H10", mode: "html", type: "mcq", title: "Contact Portal", difficulty: "Medium", xp: 55,
    story: "The helpdesk link must open the citizen's mail app, addressed to support@zero-trace.ph.",
    question: "Which link opens the user's email app?",
    options: ['<a href="email:support@zero-trace.ph">', '<a mailto="support@zero-trace.ph">', '<a href="mailto:support@zero-trace.ph">', '<email>support@zero-trace.ph</email>'], answer: 2,
    hint: "It goes inside href, and starts with a special scheme...",
    explanation: 'href="mailto:address" triggers the email client. Other schemes: tel: for phone calls, https:// for web pages.\nThere is no <email> tag.'
  },

  /* CSS OVERDRIVE */
  {
    id: "C7", mode: "css", type: "mcq", title: "Color Command", difficulty: "Easy", xp: 45,
    story: "The paint terminal accepts exactly one correct command for text color.",
    question: "Which CSS property changes TEXT color?",
    options: ["color", "font-color", "text-style", "fgcolor"], answer: 0,
    hint: "It is the shortest option — the same word as what it changes.",
    explanation: "The property is simply color: color: crimson;\nThere is no font-color or fgcolor in CSS — a classic beginner trap."
  },
  {
    id: "C8", mode: "css", type: "mcq", title: "Vertical Stack", difficulty: "Medium", xp: 55,
    story: "Dashboard modules must stack VERTICALLY instead of side by side.",
    question: "In a flex container, which declaration stacks items vertically?",
    options: ["flex-wrap: column", "flex-direction: column", "display: column", "grid-flow: column"], answer: 1,
    hint: "You change the direction of the flex flow.",
    explanation: "flex-direction: column makes the main axis vertical, so items stack top-to-bottom.\nrow is the default; row-reverse and column-reverse flip the order."
  },
  {
    id: "C9", mode: "css", type: "mcq", title: "Elastic Unit", difficulty: "Medium", xp: 55,
    question: "Which CSS unit is sized relative to the PARENT element's font size?",
    options: ["px", "em", "vh", "cm"], answer: 1,
    hint: "It's the one named after a letter — and it compounds when nested.",
    explanation: "em multiplies by the parent's font size (2em = twice the parent). Nested ems compound, which surprises people.\nrem (root em) always refers to the root element instead — usually the safer choice."
  },
  {
    id: "C10", mode: "css", type: "mcq", title: "Inside or Outside", difficulty: "Hard", xp: 65,
    story: "A module looks cramped — the text touches the border. Which property adds space INSIDE the box?",
    question: "Which property creates space between an element's CONTENT and its BORDER?",
    options: ["margin", "padding", "border-width", "gap"], answer: 1,
    hint: "Padding pushes from the inside; margin from the outside.",
    explanation: "Padding = inside space; margin = outside space. Remember the box model: content -> padding -> border -> margin.\ngap only exists between items in flex/grid containers."
  },

  /* JAVASCRIPT BREACH */
  {
    id: "J7", mode: "js", type: "mcq", title: "String Trap", difficulty: "Medium", xp: 65,
    story: "A corrupted meter mixes a string with a number. Predict what the console prints.",
    question: 'In JavaScript:\n\n    console.log("5" + 3)\n\nWhat prints?',
    options: ["8", '"53"', "NaN", "Error"], answer: 1,
    hint: "+ with a string CONCATENATES instead of adding.",
    explanation: '"5" is a string, so + joins instead of adds: "5" + 3 = "53".\nWith - or *, JS converts: "5" - 3 = 2. Use parseInt("5") or Number("5") when you really want math.'
  },
  {
    id: "J8", mode: "js", type: "mcq", title: "Constant Breach", difficulty: "Medium", xp: 65,
    story: "Someone tried to overwrite a sealed constant. The system logs the attempt.",
    question: "What happens here?\n\n    const x = 10;\n    x = 5;\n    console.log(x);",
    options: ["Prints 10", "Prints 5", "Prints undefined", "Throws an Error"], answer: 3,
    hint: "const means constant. Can you reassign a constant?",
    explanation: "Reassigning a const throws TypeError: Assignment to constant variable.\nNote: const prevents reassignment, but objects/arrays declared with const can still have their contents changed."
  },
  {
    id: "J9", mode: "js", type: "mcq", title: "Strict Scanner", difficulty: "Hard", xp: 75,
    story: "The identity scanner rejects loose matches. Compare strictly.",
    question: 'What does this print?\n\n    console.log("5" === 5)',
    options: ["true", "false", "NaN", "Error"], answer: 1,
    hint: "=== checks value AND type. A string is not a number.",
    explanation: '"5" is a string, 5 is a number — different types, so === is false.\nLoose == would convert and say true. Rule of thumb: always use === unless you truly want type conversion.'
  },
  {
    id: "J10", mode: "js", type: "mcq", title: "Last Known Value", difficulty: "Easy", xp: 55,
    story: "The archive returns the most recent entry. Index it correctly.",
    question: "What prints?\n\n    const a = [10, 20, 30];\n    console.log(a[a.length - 1]);",
    options: ["10", "20", "30", "undefined"], answer: 2,
    hint: "Indexes start at 0. a.length is 3, so the last index is 2.",
    explanation: "a.length - 1 = 2, and a[2] is 30 — the classic way to grab the last array item.\nNewer shortcut: a.at(-1)."
  },

  /* PYTHON PROTOCOL */
  {
    id: "P5", mode: "python", type: "mcq", title: "Floor Scanner", difficulty: "Medium", xp: 65,
    story: "A drone reports floor-divided distances. Compute its reading.",
    question: "In Python:\n\n    print(10 // 3)",
    options: ["3.33", "4", "3", "3.0"], answer: 2,
    hint: "// is FLOOR division — it drops the decimal part.",
    explanation: "10 / 3 is 3.33, but // floors it down to 3.\nRegular / gives 3.333..., // gives the whole number. Handy for splitting items into groups."
  },
  {
    id: "P6", mode: "python", type: "mcq", title: "Length Check", difficulty: "Easy", xp: 50,
    story: "A password gate checks the length of the call sign ZERO.",
    question: "What does this print?\n\n    print(len(\"ZERO\"))",
    options: ["3", "4", "5", "Error"], answer: 1,
    hint: "Count the letters: Z-E-R-O.",
    explanation: "len() counts items — characters in a string, elements in a list.\nlen(\"ZERO\") = 4. It also works on lists: len([1,2,3]) = 3."
  },
  {
    id: "P7", mode: "python", type: "mcq", title: "Type Detector", difficulty: "Medium", xp: 60,
    story: "The classifier tags every payload with its data type.",
    question: "What does this print?\n\n    print(type([]) == list)",
    options: ["True", "False", "list", "Error"], answer: 0,
    hint: "[] is an empty list — what does type() report?",
    explanation: "[] creates an empty list, and type([]) is <class 'list'>, which equals list → True.\nKnowing your types prevents the classic bugs: \"3\" + 3 fails, 3 + 3 works."
  },
  {
    id: "P8", mode: "python", type: "mcq", title: "Echo Chamber", difficulty: "Hard", xp: 75,
    story: "A beacon repeats its signal. Predict the echo.",
    question: "What does this print?\n\n    print(\"ab\" * 3)",
    options: ["ababab", "ab3", "Error", "a b a b a b"], answer: 0,
    hint: "Multiplying a string REPEATS it.",
    explanation: '"ab" * 3 repeats the string three times: ababab.\nString repetition also builds separators: "-" * 20 gives a 20-dash line.'
  },

  /* PHP BACKEND */
  {
    id: "PHP5", mode: "php", type: "mcq", title: "Dot Confusion", difficulty: "Medium", xp: 60,
    story: "A report merges two readings with the PHP dot operator. Predict the output.",
    question: "<?php\n  echo 5 . 5;\n?>\n\nWhat prints?",
    options: ["10", "55", "Error", "5 5"], answer: 1,
    hint: "In PHP, the dot (.) joins strings — it does NOT add.",
    explanation: "The dot is PHP's concatenation operator, so 5 . 5 becomes the string \"55\".\nTo actually add, use echo 5 + 5; which prints 10."
  },
  {
    id: "PHP6", mode: "php", type: "mcq", title: "Valid Variable", difficulty: "Easy", xp: 45,
    story: "The compiler rejects three of these variable names. Pick the valid one.",
    question: "Which is a VALID PHP variable name?",
    options: ["$score", "score", "$2score", "my-score"], answer: 0,
    hint: "PHP variables need a special symbol first, and cannot start with a number.",
    explanation: "Valid: starts with $ followed by a letter or underscore.\n$2score fails (starts with a number), my-score fails (dash is a minus sign!), and score without $ is just a word."
  },
  {
    id: "PHP7", mode: "php", type: "mcq", title: "Cargo Count", difficulty: "Easy", xp: 50,
    story: "The warehouse tallies crates with a built-in function.",
    question: "<?php\n  echo count([4, 8, 15, 16]);\n?>\n\nWhat prints?",
    options: ["3", "4", "43", "Error"], answer: 1,
    hint: "How many items are in the array?",
    explanation: "count() returns the number of elements: 4.\nIts siblings: count($arr, COUNT_RECURSIVE) counts nested arrays too."
  },
  {
    id: "PHP8", mode: "php", type: "mcq", title: "Loose Comparison", difficulty: "Hard", xp: 75,
    story: "An old lock uses loose comparison. Know what it really returns.",
    question: "<?php\n  var_dump(\"5\" == 5);\n?>\n\nWhat prints?",
    options: ["bool(true)", "bool(false)", "Error", "string(1) \"5\""], answer: 0,
    hint: "== converts types before comparing. \"5\" becomes 5.",
    explanation: "Loose == converts \"5\" to the number 5, so they match: bool(true).\nStrict === compares type too and would say bool(false). In PHP, prefer === when you can."
  },

  /* SQL DATABASE */
  {
    id: "Q5", mode: "sql", type: "mcq", title: "Retrieval Protocol", difficulty: "Easy", xp: 45,
    story: "The archive robot fetches records on command. Name the command.",
    question: "Which SQL statement retrieves data from a table?",
    options: ["GET", "FETCH", "SELECT", "OPEN"], answer: 2,
    hint: "You SELECT what you want.",
    explanation: "SELECT is SQL's read command: SELECT * FROM citizens;\nGET and FETCH exist in other contexts (HTTP GET, cursors) but not for standard queries."
  },
  {
    id: "Q6", mode: "sql", type: "mcq", title: "Row Filter", difficulty: "Easy", xp: 50,
    story: "Millions of rows, but the report needs only a few. Which clause filters them?",
    question: "Which SQL clause keeps only rows matching a condition?",
    options: ["FILTER", "WHERE", "HAVING", "KEEP"], answer: 1,
    hint: "Rows live WHERE the condition is true.",
    explanation: "WHERE filters rows BEFORE any grouping: WHERE district = 'Paligsahan'.\nHAVING filters after GROUP BY — a common interview question."
  },
  {
    id: "Q7", mode: "sql", type: "mcq", title: "Sorting Bay", difficulty: "Easy", xp: 50,
    story: "Shipments leave in priority order. Name the sorting clause.",
    question: "Which SQL clause sorts the results?",
    options: ["SORT BY", "ORDER BY", "GROUP BY", "RANK BY"], answer: 1,
    hint: "You put the rows IN ORDER.",
    explanation: "ORDER BY column ASC (default) or DESC: ORDER BY power DESC.\nGROUP BY is for aggregation, not sorting."
  },
  {
    id: "Q8", mode: "sql", type: "mcq", title: "Wild Pick", difficulty: "Medium", xp: 55,
    story: "The foreman wants EVERY column without naming them all.",
    question: "Which symbol in SELECT returns ALL columns of a table?",
    options: ["%", "_", "*", "#"], answer: 2,
    hint: "It is the same symbol used for multiplication.",
    explanation: "SELECT * FROM t returns every column.\nIn LIKE patterns, % matches anything and _ matches one character — different wildcards for a different job."
  },

  /* REACT FORGE */
  {
    id: "R5", mode: "react", type: "mcq", title: "JSX Expression", difficulty: "Easy", xp: 50,
    story: "The scoreboard must show a live number inside its markup.",
    question: "How do you embed a JavaScript variable inside JSX?",
    options: ["{{score}}", "{score}", "[score]", "$(score)"], answer: 1,
    hint: "Single curly braces open the door to JavaScript.",
    explanation: "JSX uses single braces for expressions: <span>{score}</span>.\nDouble braces {{ }} are for inline objects, like style={{ color: 'red' }}."
  },
  {
    id: "R6", mode: "react", type: "mcq", title: "State Hook", difficulty: "Easy", xp: 50,
    story: "A panel needs memory — a value that persists and updates between renders.",
    question: "Which React hook manages component state?",
    options: ["useEffect", "useState", "useMemo", "useRef"], answer: 1,
    hint: "The name says it: use... STATE.",
    explanation: "useState returns [value, setter]. Calling the setter re-renders the component with the new value.\nuseEffect runs side effects, useMemo caches calculations, useRef holds a mutable box."
  },
  {
    id: "R7", mode: "react", type: "mcq", title: "List Identity", difficulty: "Medium", xp: 65,
    story: "A long list re-renders slowly and items jump around when one changes.",
    question: "What does the key prop do in a list of React elements?",
    options: [
      "Encrypts each item's data",
      "Gives each item a stable identity so React updates efficiently",
      "Sets the CSS keyframes for animation",
      "Locks the item so it cannot be edited"
    ], answer: 1,
    hint: "React asks: which item is which?",
    explanation: "key lets React match old and new items in a list — updating only what changed.\nUsing array index as key works poorly when items are added/removed. Choose stable, unique IDs."
  },
  {
    id: "R8", mode: "react", type: "mcq", title: "Hidden Note", difficulty: "Medium", xp: 60,
    story: "A developer left a note inside JSX without breaking the page.",
    question: "What is the correct way to write a COMMENT inside JSX?",
    options: ["// comment", "<!-- comment -->", "{/* comment */}", "# comment"], answer: 2,
    hint: "JSX compiles to function calls — the comment must be inside braces.",
    explanation: "{/* comment */} works because the braces embed a JavaScript block comment.\n// comments work only OUTSIDE the returned JSX, in regular JS code."
  }
];

const SAVE_KEY = "zerotrace_save_v1";
