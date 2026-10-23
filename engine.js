/* ZERO TRACE — game engine (voice + intro + core) */
"use strict";

/* ================= STATE ================= */
let state = {
  xp: 0,
  completed: {},
  failed: {},
  screen: "screen-menu",
  currentMode: null,
  currentChallenge: null,
  awaitingResult: false,
  voiceOn: true
};

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      state.xp = data.xp || 0;
      state.completed = data.completed || {};
      state.failed = data.failed || {};
      state.voiceOn = data.voiceOn !== false;
    }
  } catch (e) { /* fresh start */ }
}
function saveState() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ xp: state.xp, completed: state.completed, failed: state.failed, voiceOn: state.voiceOn }));
  } catch (e) { /* storage unavailable */ }
}

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function escHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function levelFromXp(xp) { return Math.floor(xp / 200) + 1; }
function challengesOf(modeId) { return CHALLENGES.filter(c => c.mode === modeId); }

/* ================= VOICE ================= */
let voice = null;
function pickVoice() {
  if (!("speechSynthesis" in window)) return;
  const voices = speechSynthesis.getVoices();
  voice = voices.find(v => /en[-_]US/i.test(v.lang) && /google/i.test(v.name))
       || voices.find(v => /en/i.test(v.lang))
       || voices[0] || null;
}
if ("speechSynthesis" in window) {
  pickVoice();
  speechSynthesis.onvoiceschanged = pickVoice;
}

function speak(text) {
  if (!state.voiceOn || !("speechSynthesis" in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.rate = 1.02;
    u.pitch = 1.0;
    speechSynthesis.speak(u);
  } catch (e) { /* voice unsupported */ }
}

function speakResult(pass, xpGained) {
  const linesPass = [
    "Correct! System restored.",
    "Well done, trainee. That is the right answer.",
    "Access granted. Excellent work.",
    "Repair confirmed. You are getting stronger."
  ];
  const linesFail = [
    "Incorrect. Try again, trainee.",
    "Access denied. Check your logic and retry.",
    "That is not right. Review the hint and go again.",
    "System still damaged. You can fix this."
  ];
  if (pass && xpGained > 0) {
    speak(linesPass[Math.floor(Math.random() * linesPass.length)] + " You earned " + xpGained + " experience points.");
  } else if (pass) {
    speak("Correct. This sector is already restored.");
  } else {
    speak(linesFail[Math.floor(Math.random() * linesFail.length)]);
  }
}

function refreshVoiceBtn() {
  const btn = $("#btn-voice");
  btn.innerHTML = '<i class="bi ' + (state.voiceOn ? "bi-volume-up-fill" : "bi-volume-mute-fill") + '"></i>';
  btn.style.color = state.voiceOn ? "var(--cyan)" : "var(--text-dim)";
  btn.style.borderColor = state.voiceOn ? "var(--cyan-dim)" : "var(--line)";
}

/* ================= TOASTS / CONFETTI ================= */
function toast(msg, type) {
  const zone = $("#toast-zone");
  const el = document.createElement("div");
  el.className = "zt-toast" + (type ? " " + type : "");
  el.textContent = msg;
  zone.appendChild(el);
  setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 450); }, 2600);
}

function confetti() {
  const zone = $("#confetti-zone");
  const colors = ["#22d3ee", "#e879f9", "#a3e635", "#fbbf24", "#f87171"];
  for (let i = 0; i < 40; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = (Math.random() * 100) + "vw";
    c.style.top = (-10 - Math.random() * 20) + "px";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = (Math.random() * 0.4) + "s";
    zone.appendChild(c);
    setTimeout(() => c.remove(), 2200);
  }
}

/* ================= BACKGROUND ================= */
function initBackground() {
  const canvas = $("#bg-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [], gridOffset = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const COUNT = Math.min(70, Math.floor(W / 22));
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.4,
      hue: Math.random() < 0.85 ? 187 : 290
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    gridOffset = (gridOffset + 0.35) % 44;
    ctx.strokeStyle = "rgba(34,211,238,0.05)";
    ctx.lineWidth = 1;
    for (let x = -44; x < W + 44; x += 44) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = -44; y < H + 44; y += 44) {
      ctx.beginPath(); ctx.moveTo(0, y + gridOffset); ctx.lineTo(W, y + gridOffset); ctx.stroke();
    }
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(" + p.hue + ",90%,65%,0.55)";
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = dx * dx + dy * dy;
        if (d < 120 * 120) {
          ctx.strokeStyle = "rgba(34,211,238," + (0.14 * (1 - d / (120 * 120))) + ")";
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ================= INTRO ADVERTISEMENT ================= */
function runIntro() {
  const intro = $("#intro-screen");
  requestAnimationFrame(() => intro.classList.add("play"));
  let done = false;
  function finish() {
    if (done) return;
    done = true;
    intro.classList.add("hidden");
    setTimeout(() => intro.remove(), 950);
    $("#boot-screen").classList.remove("d-none");
    runBoot();
  }
  $("#intro-skip").addEventListener("click", finish);
  setTimeout(finish, 9500);
}

/* ================= BOOT ================= */
function runBoot() {
  const statuses = [
    "Initializing grid...",
    "Loading district nodes...",
    "Calibrating logic engines...",
    "Mounting code sandbox...",
    "Decrypting city archive...",
    "Systems ready. Welcome, trainee."
  ];
  const fill = $("#boot-bar-fill");
  const statusEl = $("#boot-status");
  const enterBtn = $("#boot-enter");
  let i = 0;

  function step() {
    if (i < statuses.length) {
      statusEl.textContent = "> " + statuses[i];
      fill.style.width = Math.round(((i + 1) / statuses.length) * 100) + "%";
      i++;
      setTimeout(step, 420 + Math.random() * 260);
    } else {
      enterBtn.classList.remove("d-none");
      enterBtn.addEventListener("click", () => {
        $("#boot-screen").classList.add("hidden");
        $("#app").classList.remove("d-none");
        refreshHud();
        speak("Welcome to Zero Trace, trainee. The grid needs you.");
      }, { once: true });
    }
  }
  step();
}

/* ================= NAV / HUD ================= */
function refreshHud() {
  const lvl = levelFromXp(state.xp);
  $("#nav-level").textContent = "LVL " + lvl;
  $("#nav-xp").textContent = state.xp + " XP";
  $("#nav-xp-fill").style.width = ((state.xp % 200) / 200 * 100) + "%";
  const done = Object.keys(state.completed).length;
  $("#stat-completed").textContent = done;
  $("#stat-xp").textContent = state.xp;
  $("#stat-total").textContent = CHALLENGES.length;
}

function showScreen(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $("#" + id).classList.add("active");
  state.screen = id;
  if (id === "screen-map") renderMap();
  if (id === "screen-missions") renderMissions();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ================= MAP ================= */
function renderMap() {
  const grid = $("#map-grid");
  grid.innerHTML = "";
  MODES.forEach((m, idx) => {
    const list = challengesOf(m.id);
    const done = list.filter(c => state.completed[c.id]).length;
    const pct = list.length ? Math.round(done / list.length * 100) : 0;
    const card = document.createElement("div");
    card.className = "district-card" + (m.locked ? " locked" : "");
    card.style.setProperty("--dcol", m.color);
    card.style.setProperty("--dglow", m.color + "44");
    card.style.animationDelay = (idx * 0.07) + "s";
    card.innerHTML =
      '<div class="dc-icon"><i class="bi ' + m.icon + '"></i></div>' +
      (m.locked ? '<div class="dc-lock"><i class="bi bi-lock-fill"></i></div>' : "") +
      '<div class="dc-name">' + m.name + "</div>" +
      '<div class="dc-desc">' + m.desc + "</div>" +
      '<div class="dc-skills">' + m.skills + "</div>" +
      (m.locked
        ? '<div class="dc-progress"><div class="dc-progress-fill" style="width:0%"></div></div><div class="dc-count">0 / 0 missions</div>'
        : '<div class="dc-progress"><div class="dc-progress-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="dc-count">' + done + " / " + list.length + " missions restored</div>");
    card.addEventListener("click", () => {
      if (m.locked) { toast("District encrypted. Unlocks in Chapter 2.", "warn"); return; }
      state.currentMode = m.id;
      showScreen("screen-missions");
    });
    grid.appendChild(card);
  });
}

/* ================= MISSIONS ================= */
function renderMissions() {
  const mode = MODES.find(m => m.id === state.currentMode);
  const first = mode.name.split(" ")[0];
  $("#missions-title").innerHTML = '<span style="color:' + mode.color + '">' + first + "</span> " + escHtml(mode.name.slice(first.length).trim());
  $("#missions-sub").textContent = "Restore " + challengesOf(mode.id).length + " systems to bring this district back online";

  const list = $("#mission-list");
  list.innerHTML = "";
  challengesOf(mode.id).forEach((ch, idx) => {
    const done = !!state.completed[ch.id];
    const failed = !done && !!state.failed[ch.id];
    const item = document.createElement("div");
    item.className = "mission-item";
    item.style.setProperty("--dcol", mode.color);
    item.style.setProperty("--dglow", mode.color + "44");
    item.innerHTML =
      '<div class="mi-num">' + String(idx + 1).padStart(2, "0") + "</div>" +
      '<div class="mi-body">' +
        '<div class="mi-title">' + escHtml(ch.title) + "</div>" +
        '<div class="mi-meta">' +
          '<span class="mi-diff-' + ch.difficulty.toLowerCase() + '">&#9670; ' + ch.difficulty.toUpperCase() + "</span>" +
          '<span class="mi-xp"><i class="bi bi-lightning-charge-fill"></i> ' + ch.xp + " XP</span>" +
          "<span>" + (ch.type === "mcq" ? "LOGIC PROBE" : ch.language.toUpperCase() + " REPAIR") + "</span>" +
        "</div>" +
      "</div>" +
      '<div class="mi-status ' + (done ? "done" : (failed ? "failed" : "todo")) + '"><i class="bi ' + (done ? "bi-check-circle-fill" : (failed ? "bi-x-circle-fill" : "bi-circle")) + '"></i></div>';
    item.addEventListener("click", () => startChallenge(ch));
    list.appendChild(item);
  });
}

/* ================= GAME SCREEN ================= */
function startChallenge(ch) {
  state.currentChallenge = ch;
  state.awaitingResult = false;

  const mode = MODES.find(m => m.id === ch.mode);
  $("#game-tag").textContent = mode.name + " // MISSION " + ch.id;
  $("#game-tag").style.color = mode.color;
  $("#game-title").textContent = ch.title;
  $("#game-diff").textContent = ch.difficulty.toUpperCase();
  $("#game-xp").innerHTML = '<i class="bi bi-lightning-charge-fill"></i> ' + ch.xp + " XP";
  $("#game-story").innerHTML = "<b>&gt; BRIEFING:</b> " + escHtml(ch.story);

  if (ch.type === "mcq") {
    $("#mcq-area").classList.remove("d-none");
    $("#code-area").classList.add("d-none");
    renderMcq(ch);
  } else {
    $("#mcq-area").classList.add("d-none");
    $("#code-area").classList.remove("d-none");
    $("#editor-filename").textContent = ch.filename || ("editor." + ch.language);
    $("#code-editor").value = ch.starterCode;
    updateLineNumbers();
    $("#console-body").innerHTML = '<div class="console-line dim">// Run your code to see output...</div>';
    $("#preview-frame").srcdoc = buildSrcdoc(ch, ch.starterCode, true);
  }
  showScreen("screen-game");
}

function renderMcq(ch) {
  $("#mcq-question").textContent = ch.question;
  const opts = $("#mcq-options");
  opts.innerHTML = "";
  const keys = ["A", "B", "C", "D"];
  let answered = false;
  ch.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.className = "mcq-opt";
    b.innerHTML = '<span class="opt-key">' + keys[i] + "</span><span>" + escHtml(opt) + "</span>";
    b.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const buttons = opts.querySelectorAll(".mcq-opt");
      buttons.forEach(x => x.disabled = true);
      if (i === ch.answer) {
        b.classList.add("correct");
        setTimeout(() => onPass(ch, "Correct. The gate accepts your logic."), 650);
      } else {
        b.classList.add("wrong");
        buttons[ch.answer].classList.add("correct");
        setTimeout(() => onFail(ch, "Incorrect answer. The system rejected your input."), 900);
      }
    });
    opts.appendChild(b);
  });
}

/* ---- sandboxed preview ---- */
function harnessScript() {
  return "<script>" +
    "window.__logs=[];" +
    "function __fmt(v){if(typeof v==='object'){try{return JSON.stringify(v);}catch(e){return String(v);}}return String(v);}" +
    "console.log=function(){var a=[].slice.call(arguments).map(__fmt).join(' ');__logs.push(a);parent.postMessage({type:'zt',kind:'log',text:a},'*');};" +
    "window.onerror=function(m){parent.postMessage({type:'zt',kind:'error',text:String(m)},'*');};" +
    "function pass(m){parent.postMessage({type:'zt',kind:'result',pass:true,msg:m||''},'*');}" +
    "function fail(m){parent.postMessage({type:'zt',kind:'result',pass:false,msg:m||''},'*');}" +
    "<\/script>";
}

function reactCdns() {
  return '<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>' +
         '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>' +
         '<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>';
}

function buildSrcdoc(ch, code, silent) {
  const baseStyle = "body{background:#0a0e17;color:#c9e6ff;font-family:'JetBrains Mono',monospace;padding:14px;margin:0;font-size:14px;}";
  let body = "";
  if (ch.language === "js") {
    body = harnessScript() +
      "<script>try{\n" + code + "\n}catch(e){parent.postMessage({type:'zt',kind:'error',text:String(e)},'*');}<\/script>" +
      (silent ? "" : "<script>try{\n" + ch.testCode + "\n}catch(e){parent.postMessage({type:'zt',kind:'result',pass:false,msg:'Test error: '+e.message},'*');}<\/script>");
  } else if (ch.language === "html") {
    body = "<style>" + baseStyle + "</style>" + harnessScript() + code +
      (silent ? "" : "<script>try{\n" + ch.testCode + "\n}catch(e){parent.postMessage({type:'zt',kind:'result',pass:false,msg:'Test error: '+e.message},'*');}<\/script>");
  } else if (ch.language === "css") {
    body = harnessScript() +
      "<style>" + (ch.baseCss || "") + "\n" + code + "</style>" +
      ch.testHtml +
      (silent ? "" : "<script>try{\n" + ch.testCode + "\n}catch(e){parent.postMessage({type:'zt',kind:'result',pass:false,msg:'Test error: '+e.message},'*');}<\/script>");
  } else if (ch.language === "react") {
    body = reactCdns() + harnessScript() +
      '<div id="root"></div>' +
      '<script type="text/babel" data-presets="react">\n' + code + '\n<\/script>' +
      (silent ? "" : "<script>try{\n" + ch.testCode + "\n}catch(e){parent.postMessage({type:'zt',kind:'result',pass:false,msg:'Test error: '+e.message},'*');}<\/script>");
  } else if (ch.language === "python") {
    body = "<style>" + baseStyle + "</style>" +
      '<div style="text-align:center;padding-top:34px">' +
      '<div style="font-size:44px;color:#3776ab"><i class="bi bi-filetype-py"></i></div>' +
      '<div style="letter-spacing:.25em;color:#7c8db5;font-size:12px">PYTHON RUNTIME READY</div>' +
      '<div style="margin-top:14px;color:#3a4a6e;font-size:11px">Press RUN &amp; VERIFY to execute on the real Python engine</div></div>';
  } else if (ch.language === "sql") {
    body = "<style>" + baseStyle + "table{border-collapse:collapse;margin:10px 0}td,th{border:1px solid #1c2946;padding:5px 12px;font-size:12px}th{color:#22d3ee}</style>" +
      "<div style='color:#7c8db5;font-size:11px;letter-spacing:.2em;margin-bottom:6px'>CITY DATABASE</div>" +
      sqlTablesHtml(ch.tables);
  } else if (ch.language === "php") {
    body = "<style>" + baseStyle + "</style>" +
      "<div style='color:#7c8db5;font-size:11px;letter-spacing:.2em;margin-bottom:8px'>SERVER PREVIEW (simulated)</div>" +
      "<pre style='background:#0d1322;border:1px solid #1c2946;border-radius:10px;padding:14px;color:#a3e635;margin:0'>" +
      escHtml((ch.expectedOutput || []).join("\n")) + "</pre>";
  }
  return "<!DOCTYPE html><html><head><meta charset='utf-8'>" +
    '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">' +
    "</head><body>" + body + "</body></html>";
}

function sqlTablesHtml(tables) {
  let out = "";
  for (const t in tables) {
    const tb = tables[t];
    out += "<div style='color:#f59e0b;font-size:12px;margin:12px 0 4px'>TABLE: " + t + "</div><table><tr>";
    tb.columns.forEach(c => out += "<th>" + escHtml(c) + "</th>");
    out += "</tr>";
    tb.rows.forEach(r => { out += "<tr>"; r.forEach(v => out += "<td>" + escHtml(v) + "</td>"); out += "</tr>"; });
    out += "</table>";
  }
  return out;
}

/* ---- editor helpers ---- */
function updateLineNumbers() {
  const ta = $("#code-editor");
  const count = ta.value.split("\n").length;
  let out = "";
  for (let i = 1; i <= count; i++) out += i + "\n";
  $("#line-numbers").textContent = out;
}

function appendConsole(text, isError) {
  const body = $("#console-body");
  const dim = body.querySelector(".dim");
  if (dim) dim.remove();
  const line = document.createElement("div");
  line.className = "console-line" + (isError ? " err" : "");
  line.textContent = (isError ? "✗ " : "› ") + text;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
}

/* ---- iframe message listener ---- */
window.addEventListener("message", (ev) => {
  const d = ev.data;
  if (!d || d.type !== "zt") return;
  if (d.kind === "log") appendConsole(d.text, false);
  if (d.kind === "error") appendConsole(d.text, true);
  if (d.kind === "result" && state.awaitingResult) {
    state.awaitingResult = false;
    const ch = state.currentChallenge;
    setTimeout(() => { d.pass ? onPass(ch, d.msg) : onFail(ch, d.msg); }, 350);
  }
});

/* ---- run / verify dispatcher ---- */
function runCode() {
  const ch = state.currentChallenge;
  if (!ch || ch.type !== "code") return;
  if (ch.language === "python") return runPython(ch);
  if (ch.language === "sql") return runSql(ch);
  if (ch.language === "php") return runPhp(ch);
  $("#console-body").innerHTML = '<div class="console-line dim">// Executing in sandbox...</div>';
  state.awaitingResult = true;
  $("#preview-frame").srcdoc = buildSrcdoc(ch, $("#code-editor").value, false);
  setTimeout(() => { state.awaitingResult = false; }, 8000);
}

/* ---- PYTHON (Pyodide real runtime) ---- */
let pyodidePromise = null;
function ensurePyodide() {
  if (!pyodidePromise) {
    if (typeof loadPyodide === "undefined") {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
      document.head.appendChild(s);
      pyodidePromise = new Promise((resolve, reject) => {
        s.onload = () => loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" }).then(resolve, reject);
        s.onerror = () => reject(new Error("Could not load the Python engine. Check your internet connection, then try again."));
      });
    } else {
      pyodidePromise = loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    }
  }
  return pyodidePromise;
}

async function runPython(ch) {
  const btn = $("#btn-run");
  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-hourglass-split"></i> PREPARING PYTHON...';
  $("#console-body").innerHTML = '<div class="console-line dim">// Loading Python runtime (first run downloads the engine)...</div>';
  let py;
  try { py = await ensurePyodide(); }
  catch (e) {
    appendConsole(e.message, true);
    btn.disabled = false;
    btn.innerHTML = '<i class="bi bi-play-fill"></i> RUN &amp; VERIFY';
    return;
  }
  btn.disabled = false;
  btn.innerHTML = '<i class="bi bi-play-fill"></i> RUN &amp; VERIFY';
  $("#console-body").innerHTML = '<div class="console-line dim">// Executing Python code...</div>';

  const code = $("#code-editor").value;
  let verdict = null;
  py.globals.set("zt_pass", (m) => { verdict = { pass: true, msg: m || "All checks passed" }; });
  py.globals.set("zt_fail", (m) => { verdict = { pass: false, msg: m || "Check failed" }; });

  try {
    py.runPython("import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = sys.stdout");
    py.runPython(code);
    const out = py.runPython("sys.stdout.getvalue()");
    if (out && out.trim()) out.trim().split("\n").forEach(l => appendConsole(l, false));
    if (!verdict) {
      const indented = ch.testCode.split("\n").map(l => l.trim() === "" ? "" : "    " + l).join("\n");
      try {
        py.runPython("try:\n" + indented + "\nexcept Exception as e:\n    zt_fail(str(e))");
      } catch (e) { verdict = { pass: false, msg: "Test error: " + e.message }; }
    }
  } catch (e) {
    appendConsole(String(e.message || e), true);
    verdict = { pass: false, msg: "Your code crashed. Read the error above and fix it." };
  }

  setTimeout(() => {
    if (!verdict) verdict = { pass: false, msg: "The test produced no verdict — did the required functions run?" };
    verdict.pass ? onPass(ch, verdict.msg) : onFail(ch, verdict.msg);
  }, 400);
}

/* ---- SQL (mini engine over real tables) ---- */
function executeSql(ch, code) {
  const tables = JSON.parse(JSON.stringify(ch.tables));
  const getVal = v => {
    v = v.trim();
    if (/^'.*'$/.test(v)) return v.slice(1, -1);
    const n = Number(v);
    return isNaN(n) ? v : n;
  };
  const parseConds = str => str.trim().split(/\bAND\b/i).map(c => {
    const m = c.match(/^\s*(\w+)\s*(>=|<=|!=|=|>|<)\s*('[^']*'|[\w.-]+)\s*$/);
    return m ? { col: m[1], op: m[2], val: getVal(m[3]) } : null;
  });
  const cmp = (a, op, b) => {
    if (typeof a === "number" && typeof b === "number") {
      switch (op) { case ">": return a > b; case "<": return a < b; case ">=": return a >= b; case "<=": return a <= b; case "=": return a === b; case "!=": return a !== b; }
    }
    const x = String(a), y = String(b);
    switch (op) { case ">": return x > y; case "<": return x < y; case ">=": return x >= y; case "<=": return x <= y; case "=": return x === y; case "!=": return x !== y; }
    return false;
  };
  const clean = code.replace(/--[^\n]*/g, "");
  const stmts = clean.split(";").map(s => s.trim()).filter(Boolean);
  if (!stmts.length) return { error: "No SQL statement found. Write a query ending with ;" };
  let result = null, cols = null;

  try {
    for (const st of stmts) {
      let m;
      if ((m = st.match(/^SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i))) {
        const colsRaw = m[1].trim(), tName = m[2], rest = m[3].trim();
        const table = tables[tName];
        if (!table) throw new Error("Unknown table: " + tName);
        const colIdx = c => { const i = table.columns.indexOf(c); if (i === -1) throw new Error("Unknown column: " + c); return i; };
        let rows = table.rows.map(r => r.slice());
        const isCount = /^COUNT\s*\(\s*\*\s*\)/i.test(colsRaw);
        const wm = rest.match(/\bWHERE\b([\s\S]*?)(?=\bORDER\s+BY\b|\bLIMIT\b|$)/i);
        if (wm) {
          const conds = parseConds(wm[1]);
          if (conds.some(c => !c)) throw new Error("Cannot parse WHERE: " + wm[1].trim());
          rows = rows.filter(r => conds.every(c => cmp(r[colIdx(c.col)], c.op, c.val)));
        }
        const om = rest.match(/\bORDER\s+BY\s+(\w+)(?:\s+(DESC|ASC))?/i);
        if (om) {
          const i = colIdx(om[1]);
          rows = rows.slice().sort((a, b) => {
            const x = a[i], y = b[i];
            return (typeof x === "number" && typeof y === "number") ? x - y : String(x).localeCompare(String(y));
          });
          if ((om[2] || "").toUpperCase() === "DESC") rows.reverse();
        }
        const lm = rest.match(/\bLIMIT\s+(\d+)/i);
        if (lm) rows = rows.slice(0, parseInt(lm[1], 10));
        if (isCount) { result = [[rows.length]]; cols = ["COUNT(*)"]; }
        else {
          const sel = colsRaw === "*" ? table.columns.slice() : colsRaw.split(",").map(s => s.trim());
          const idxs = sel.map(colIdx);
          result = rows.map(r => idxs.map(i => r[i]));
          cols = sel;
        }
      } else if ((m = st.match(/^UPDATE\s+(\w+)\s+SET\s+(\w+)\s*=\s*('[^']*'|[\w.-]+)([\s\S]*)$/i))) {
        const table = tables[m[1]];
        if (!table) throw new Error("Unknown table: " + m[1]);
        const i = table.columns.indexOf(m[2]);
        if (i === -1) throw new Error("Unknown column: " + m[2]);
        const v = getVal(m[3].match(/^('[^']*'|[\w.-]+)/)[1]);
        let targets = table.rows;
        const wm = m[4].match(/\bWHERE\b([\s\S]*)$/i);
        if (wm) {
          const conds = parseConds(wm[1]);
          if (conds.some(c => !c)) throw new Error("Cannot parse WHERE");
          targets = targets.filter(r => conds.every(c => cmp(r[colIdx2(table, c.col)], c.op, c.val)));
        }
        targets.forEach(r => { r[i] = v; });
        function colIdx2(t, c) { const i = t.columns.indexOf(c); if (i === -1) throw new Error("Unknown column: " + c); return i; }
      } else if ((m = st.match(/^INSERT\s+INTO\s+(\w+)\s+VALUES\s*\(([^)]*)\)$/i))) {
        const table = tables[m[1]];
        if (!table) throw new Error("Unknown table: " + m[1]);
        const vals = m[2].split(",").map(getVal);
        if (vals.length !== table.columns.length) throw new Error("INSERT needs " + table.columns.length + " values");
        table.rows.push(vals);
      } else if ((m = st.match(/^DELETE\s+FROM\s+(\w+)([\s\S]*)$/i))) {
        const table = tables[m[1]];
        if (!table) throw new Error("Unknown table: " + m[1]);
        const wm = m[2].match(/\bWHERE\b([\s\S]*)$/i);
        if (!wm) table.rows = [];
        else {
          const conds = parseConds(wm[1]);
          if (conds.some(c => !c)) throw new Error("Cannot parse WHERE");
          const idxOf = c => { const i = table.columns.indexOf(c); if (i === -1) throw new Error("Unknown column: " + c); return i; };
          table.rows = table.rows.filter(r => !conds.every(c => cmp(r[idxOf(c.col)], c.op, c.val)));
        }
      } else {
        throw new Error("Unsupported SQL: " + st.split("\n")[0].slice(0, 50));
      }
    }
  } catch (e) { return { error: e.message }; }
  if (!result) return { error: "Finish with a SELECT so the system can verify your result." };
  return { rows: result, cols: cols, tables: tables };
}

function runSql(ch) {
  $("#console-body").innerHTML = '<div class="console-line dim">// Executing SQL on city database...</div>';
  const res = executeSql(ch, $("#code-editor").value);
  if (res.error) {
    appendConsole(res.error, true);
    onFail(ch, res.error);
    return;
  }
  const eq = JSON.stringify(res.rows) === JSON.stringify(ch.expected);
  $("#preview-frame").srcdoc = "<!DOCTYPE html><html><head><meta charset='utf-8'><style>body{background:#0a0e17;color:#c9e6ff;font-family:'JetBrains Mono',monospace;padding:14px;margin:0;font-size:13px}table{border-collapse:collapse;margin:10px 0}td,th{border:1px solid #1c2946;padding:5px 12px}th{color:#22d3ee}h4{color:#f59e0b;letter-spacing:.15em;font-size:12px}</style></head><body>" +
    sqlTablesHtml(res.tables) +
    "<h4>QUERY RESULT</h4><table><tr>" + res.cols.map(c => "<th>" + escHtml(c) + "</th>").join("") + "</tr>" +
    res.rows.map(r => "<tr>" + r.map(v => "<td>" + escHtml(v) + "</td>").join("") + "</tr>").join("") +
    "</table></body></html>";
  if (eq) onPass(ch, "Query executed. " + res.rows.length + " row(s) returned — matches the expected report.");
  else onFail(ch, "Query ran, but returned the wrong rows. Expected " + JSON.stringify(ch.expected) + ", got " + JSON.stringify(res.rows));
}

/* ---- PHP (server-script validator) ---- */
function runPhp(ch) {
  $("#console-body").innerHTML = '<div class="console-line dim">// Deploying to simulated PHP server...</div>';
  (ch.expectedOutput || []).forEach(l => appendConsole(l, false));
  appendConsole("(expected server output — fix the script to match)", false);
  const code = $("#code-editor").value;
  for (const c of ch.checks) {
    let re;
    try { re = new RegExp(c.pattern); } catch (e) { continue; }
    if (!re.test(code)) {
      onFail(ch, "Script validation failed. Missing: " + c.msg);
      return;
    }
  }
  onPass(ch, "PHP script validated and deployed to the server.");
}

/* ---- results ---- */
function onPass(ch, msg) {
  const firstTime = !state.completed[ch.id];
  let gained = 0;
  if (firstTime) {
    state.completed[ch.id] = true;
    delete state.failed[ch.id];
    state.xp += ch.xp;
    gained = ch.xp;
    saveState();
  }
  refreshHud();
  confetti();
  speakResult(true, gained);
  openResult(true, ch, msg, gained);
}

function onFail(ch, msg) {
  state.failed[ch.id] = true;
  saveState();
  speakResult(false, 0);
  openResult(false, ch, msg, 0);
}

function openResult(pass, ch, msg, gained) {
  const icon = $("#result-icon");
  icon.className = "result-icon " + (pass ? "ok" : "no");
  icon.innerHTML = '<i class="bi ' + (pass ? "bi-check-lg" : "bi-x-lg") + '"></i>';
  $("#result-title").textContent = pass ? "SYSTEM RESTORED" : "REPAIR FAILED";
  $("#result-title").style.color = pass ? "var(--lime)" : "var(--red)";
  $("#result-xp").textContent = pass ? (gained > 0 ? "+" + gained + " XP EARNED" : "ALREADY CLEARED — REPLAY") : "NO XP AWARDED";
  $("#result-msg").textContent = msg || "";
  $("#result-explain").textContent = (pass ? "// DEBRIEF — WHY THIS WORKS\n" : "// DIAGNOSTIC — READ THIS\n") + ch.explanation;

  const next = nextChallenge(ch);
  const nextBtn = $("#result-next");
  if (pass && next) {
    nextBtn.disabled = false;
    nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i> NEXT MISSION';
    nextBtn.onclick = () => { bootstrap.Modal.getInstance($("#resultModal")).hide(); startChallenge(next); };
  } else if (pass) {
    nextBtn.disabled = false;
    nextBtn.innerHTML = '<i class="bi bi-grid-3x3-gap-fill"></i> BACK TO GRID';
    nextBtn.onclick = () => { bootstrap.Modal.getInstance($("#resultModal")).hide(); showScreen("screen-map"); };
  } else if (next) {
    nextBtn.disabled = false;
    nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i> NEXT MISSION';
    nextBtn.onclick = () => { bootstrap.Modal.getInstance($("#resultModal")).hide(); startChallenge(next); };
  } else {
    nextBtn.disabled = false;
    nextBtn.innerHTML = '<i class="bi bi-grid-3x3-gap-fill"></i> BACK TO GRID';
    nextBtn.onclick = () => { bootstrap.Modal.getInstance($("#resultModal")).hide(); showScreen("screen-map"); };
  }
  $("#result-retry").onclick = () => { bootstrap.Modal.getInstance($("#resultModal")).hide(); startChallenge(ch); };

  const modal = new bootstrap.Modal($("#resultModal"));
  modal.show();
}

function nextChallenge(ch) {
  const list = challengesOf(ch.mode);
  const idx = list.findIndex(c => c.id === ch.id);
  return idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;
}

/* ================= WIRING ================= */
function init() {
  loadState();
  initBackground();
  runIntro();
  refreshVoiceBtn();

  $("#nav-home").addEventListener("click", () => showScreen("screen-menu"));
  $("#btn-start").addEventListener("click", () => showScreen("screen-map"));
  $("#btn-how").addEventListener("click", () => new bootstrap.Modal($("#howModal")).show());

  $("#btn-voice").addEventListener("click", () => {
    state.voiceOn = !state.voiceOn;
    saveState();
    refreshVoiceBtn();
    if (state.voiceOn) speak("Voice feedback enabled.");
    else if ("speechSynthesis" in window) speechSynthesis.cancel();
    toast(state.voiceOn ? "Voice feedback ON" : "Voice feedback OFF");
  });

  $$(".btn-back").forEach(b => {
    b.addEventListener("click", () => showScreen(b.getAttribute("data-goto")));
  });

  $("#btn-reset-progress").addEventListener("click", () => {
    if (confirm("Reset all XP and mission progress?")) {
      state.xp = 0;
      state.completed = {};
      saveState();
      refreshHud();
      toast("Progress wiped. The grid forgets you.", "warn");
    }
  });

  const ta = $("#code-editor");
  ta.addEventListener("input", updateLineNumbers);
  ta.addEventListener("scroll", () => { $("#line-numbers").scrollTop = ta.scrollTop; });
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = ta.selectionStart, en = ta.selectionEnd;
      ta.value = ta.value.slice(0, s) + "  " + ta.value.slice(en);
      ta.selectionStart = ta.selectionEnd = s + 2;
      updateLineNumbers();
    }
  });

  $("#btn-run").addEventListener("click", runCode);
  $("#btn-reset-code").addEventListener("click", () => {
    if (state.currentChallenge) {
      ta.value = state.currentChallenge.starterCode;
      updateLineNumbers();
      $("#console-body").innerHTML = '<div class="console-line dim">// Code reset. Run to test again...</div>';
      toast("Code restored to damaged state.");
    }
  });
  $("#btn-hint").addEventListener("click", () => {
    if (!state.currentChallenge) return;
    $("#hint-body").textContent = "> " + state.currentChallenge.hint;
    new bootstrap.Modal($("#hintModal")).show();
  });

  refreshHud();
}

document.addEventListener("DOMContentLoaded", init);
