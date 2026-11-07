const LEVELS = {
  Easy:   { max: 50,  tries: 10 },
  Medium: { max: 100, tries: 7 },
  Hard:   { max: 500, tries: 9 },
};

let level = "Medium";
let secret, left, over, guesses = [];

const $ = (id) => document.getElementById(id);

function getBest() {
  try { return JSON.parse(localStorage.getItem("ngg-best") || "{}"); }
  catch (e) { return {}; }
}
function setBest(v) {
  try { localStorage.setItem("ngg-best", JSON.stringify(v)); }
  catch (e) {}
}

function renderLevels() {
  $("levels").innerHTML = "";
  Object.keys(LEVELS).forEach((k) => {
    const b = document.createElement("button");
    b.textContent = k;
    b.className = k === level ? "on" : "";
    b.onclick = () => { level = k; start(); };
    $("levels").appendChild(b);
  });
}

function start() {
  const L = LEVELS[level];
  secret = Math.floor(Math.random() * L.max) + 1;
  left = L.tries;
  over = false;
  guesses = [];
  $("sub").textContent = "I'm thinking of a number between 1 and " + L.max + ".";
  $("in").disabled = false;
  $("go").disabled = false;
  $("in").value = "";
  $("again").style.display = "none";
  $("hist").innerHTML = "";
  setMsg("Make your first guess!", "");
  renderLevels();
  update();
  $("in").focus();
}

function update() {
  $("left").textContent = "Tries left: " + left;
  const b = getBest()[level];
  $("best").textContent = b ? "Best: " + b + " tries" : "Best: -";
}

function setMsg(text, cls) {
  $("msg").textContent = text;
  $("msg").className = "msg " + cls;
}

function end() {
  over = true;
  $("in").disabled = true;
  $("go").disabled = true;
  $("again").style.display = "block";
}

function guess() {
  if (over) return;
  const L = LEVELS[level];
  const n = parseInt($("in").value, 10);

  if (isNaN(n) || n < 1 || n > L.max) {
    setMsg("Enter a number from 1 to " + L.max + ".", "bad");
    return;
  }
  if (guesses.includes(n)) {
    setMsg("You already tried " + n + ".", "bad");
    return;
  }

  left--;
  const chip = document.createElement("span");
  chip.className = "chip";

  if (n === secret) {
    const used = L.tries - left;
    setMsg("Correct! You got it in " + used + (used === 1 ? " try." : " tries."), "good");
    const best = getBest();
    if (!best[level] || used < best[level]) {
      best[level] = used;
      setBest(best);
    }
    chip.textContent = n + " ✓";
    end();
  } else {
    const high = n > secret;
    chip.textContent = n + (high ? " ↓" : " ↑");
    chip.className = "chip " + (high ? "hi" : "lo");
    if (left === 0) {
      setMsg("Out of tries! The number was " + secret + ".", "bad");
      end();
    } else {
      setMsg(high ? "Too high. Go lower." : "Too low. Go higher.", "bad");
    }
  }

  guesses.push(n);
  $("hist").appendChild(chip);
  $("in").value = "";
  update();
  if (!over) $("in").focus();
}

$("go").onclick = guess;
$("in").addEventListener("keydown", (e) => { if (e.key === "Enter") guess(); });
$("again").onclick = start;

start();