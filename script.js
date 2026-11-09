"use strict";

const LEVELS = {
  Easy:   { max: 50,  tries: 10 },
  Medium: { max: 100, tries: 7 },
  Hard:   { max: 500, tries: 9 }
};

let level = "Medium";
let secret, left, over, lo, hi, tried;
let wins = 0;

const $ = id => document.getElementById(id);
const pick = list => list[Math.floor(Math.random() * list.length)];

function getBest() {
  try { return JSON.parse(localStorage.getItem("guess-best") || "{}"); }
  catch (e) { return {}; }
}

function saveBest(best) {
  try { localStorage.setItem("guess-best", JSON.stringify(best)); }
  catch (e) {}
}

function heat(n) {
  const d = Math.abs(n - secret) / LEVELS[level].max;
  if (d < .03) return "Super close!";
  if (d < .08) return "Really close.";
  if (d < .18) return "Getting warm.";
  if (d < .35) return "Still pretty far.";
  return "Ice cold.";
}

function drawLevels() {
  const box = $("levels");
  box.innerHTML = "";
  Object.keys(LEVELS).forEach(name => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = name;
    if (name === level) b.className = "on";
    b.onclick = () => { level = name; start(); };
    box.appendChild(b);
  });
}

function drawBoxes() {
  const total = LEVELS[level].tries;
  const box = $("boxes");
  box.innerHTML = "";
  box.setAttribute("aria-label", left + (left === 1 ? " try left" : " tries left"));
  for (let n = 0; n < total; n++) {
    const s = document.createElement("span");
    s.className = "box" + (n < total - left ? " used" : "");
    box.appendChild(s);
  }
}

function drawInfo() {
  const best = getBest()[level];
  $("best").textContent = best ? "best: " + best : "";
  $("range").textContent = over ? "" : "It\u2019s between " + lo + " and " + hi + ".";
  $("foot").textContent = wins ? "wins this session: " + wins : "";
}

function say(text, cls) {
  $("msg").textContent = text;
  $("msg").className = "msg " + (cls || "");
}

function start() {
  const L = LEVELS[level];
  secret = Math.floor(Math.random() * L.max) + 1;
  left = L.tries;
  over = false;
  lo = 1;
  hi = L.max;
  tried = [];

  $("sub").textContent = "I\u2019m thinking of something from 1 to " + L.max + ".";
  $("num").textContent = "?";
  $("big").className = "big";
  $("list").innerHTML = "";
  $("in").value = "";
  $("in").disabled = false;
  $("go").disabled = false;
  $("again").style.display = "none";
  say("Go on, take a shot.");

  drawLevels();
  drawBoxes();
  drawInfo();
  $("in").focus();
}

function finish() {
  over = true;
  $("in").disabled = true;
  $("go").disabled = true;
  $("again").style.display = "block";
  $("num").textContent = secret;
  drawInfo();
}

function addGuess(n, note, win) {
  const row = document.createElement("div");
  row.className = "g" + (win ? " win" : "");
  const num = document.createElement("b");
  num.textContent = n;
  row.append(num, " " + note);
  $("list").appendChild(row);
}

function guess() {
  if (over) return;

  const L = LEVELS[level];
  const raw = $("in").value.trim();
  const n = /^\d+$/.test(raw) ? parseInt(raw, 10) : NaN;

  if (isNaN(n) || n < 1 || n > L.max) {
    say("Pick a whole number from 1 to " + L.max + ".", "bad");
    return;
  }
  if (tried.includes(n)) {
    say("You already tried " + n + "!", "bad");
    return;
  }

  tried.push(n);
  left--;
  $("in").value = "";

  if (n === secret) {
    const used = L.tries - left;
    wins++;

    const best = getBest();
    if (!best[level] || used < best[level]) {
      best[level] = used;
      saveBest(best);
    }

    if (used === 1) say("First try?! Suspicious.", "good");
    else if (used <= 3) say("Nice, only " + used + " tries!", "good");
    else say("Got it! Took " + used + " tries.", "good");

    addGuess(n, "yes!", true);
    $("big").className = "big circled";
    finish();
  } else {
    const high = n > secret;
    if (high) hi = Math.min(hi, n - 1);
    else lo = Math.max(lo, n + 1);

    addGuess(n, high ? "too high" : "too low");

    if (left === 0) {
      say("Out of tries. It was " + secret + ".", "bad");
      finish();
    } else {
      const dir = high
        ? pick(["Too high.", "Nope, lower.", "Go lower than that."])
        : pick(["Too low.", "Nope, higher.", "Go higher than that."]);
      say(dir + " " + heat(n), "bad");
    }
  }

  drawBoxes();
  drawInfo();
  if (!over) $("in").focus();
}

$("go").onclick = guess;
$("again").onclick = start;

$("in").addEventListener("keydown", e => {
  if (e.key === "Enter") guess();
});

document.addEventListener("keydown", e => {
  if (e.key === "Enter" && over && e.target.tagName !== "BUTTON") start();
});

start();