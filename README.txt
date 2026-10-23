ZERO TRACE: Code to Survive — Chapter 1: The Broken Web
=========================================================

A cyberpunk educational programming game. Repair a broken digital city by
solving real coding missions across EIGHT districts — Logic, HTML, CSS,
JavaScript, Python, PHP, SQL and React — with live validation, voice
feedback, XP progression, hints and debrief explanations.

FILES
-----
index.html            Main game shell (cinematic intro, boot, screens, modals)
assets/css/style.css  Cyberpunk theme, glitch + cinematic intro animations
assets/js/data.js     9 districts + 40 missions
assets/js/engine.js   Game engine: sandbox runners, voice, XP, particles

HOW TO RUN
----------
1. Extract the zip.
2. Open index.html in any modern browser (Chrome / Edge / Firefox).
   No server or build step required.
3. Python and React missions load their engines from CDN the first time
   (internet needed for those missions).

RUNTIMES PER DISTRICT
---------------------
Logic Lab      Multiple-choice probes (instant)
HTML Rescue    Sandboxed iframe + DOM tests
CSS Overdrive  Sandboxed iframe + computed-style tests
JavaScript     Sandcoded iframe + console/result tests
Python         Real CPython via Pyodide (WebAssembly)
PHP            Server-script validator + simulated output
SQL            Mini SQL engine: SELECT/WHERE/ORDER BY/LIMIT/UPDATE/INSERT/DELETE/COUNT
React          Real React 18 + Babel JSX in sandbox

FEATURES
--------
- Cinematic advertisement intro: sponsor, developer, tech stack, tagline
- Animated boot sequence, glitch logo, particle network background
- City Grid map with 8 playable districts (Full Stack locked for Ch.2)
- Code editor with line numbers + Tab support, live preview, console output
- Voice feedback (Web Speech API) for correct/wrong answers, toggleable
- XP, levels, autosave via localStorage, hints, explanations, replay
- Responsive (Bootstrap 5), works on Android & PC browsers

Developed by Roniel Nyke Gonzales — BS INFO TECH 2-B
Sponsor: ILOILO TECH COMPANY
