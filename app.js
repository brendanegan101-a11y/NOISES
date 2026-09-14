const PACKS = {
  free: { id: "free", name: "Starter Chirps", price: 0 },
  classic: { id: "classic", name: "Classic Torture", price: 0.99 },
  brainrot: { id: "brainrot", name: "Brainrot Vocals", price: 1.99 },
  domestic: { id: "domestic", name: "Domestic Hell", price: 1.49 },
  chaos: { id: "chaos", name: "Chaos Pass", price: 4.99 },
};

const SOUNDS = [
  { id: "chirp", pack: "free", name: "Low-battery chirp", emoji: "\uD83D\uDD34", rating: 92, blurb: "3:12 AM classic", type: "synth" },
  { id: "notif", pack: "free", name: "Group-chat pile-on", emoji: "\uD83D\uDCAC", rating: 74, blurb: "7 pings, no mercy", type: "synth" },
  { id: "drip", pack: "free", name: "Midnight drip", emoji: "\uD83D\uDCA7", rating: 68, blurb: "One more drop", type: "synth" },
  { id: "error", pack: "free", name: "Windows error", emoji: "\uD83D\uDCBB", rating: 61, blurb: "Task failed successfully", type: "synth" },
  { id: "t3", pack: "classic", name: "Fire alarm T-3", emoji: "\uD83D\uDEA8", rating: 99, blurb: "3100 Hz Temporal-3", type: "synth" },
  { id: "chalkboard", pack: "classic", name: "Nails / chalkboard", emoji: "\u270F\uFE0F", rating: 97, blurb: "2-5 kHz amygdala bait", type: "synth" },
  { id: "forkglass", pack: "classic", name: "Fork on glass", emoji: "\uD83C\uDF74", rating: 96, blurb: "Science's #2 worst", type: "synth" },
  { id: "drill", pack: "classic", name: "Dentist drill", emoji: "\uD83E\uDDB7", rating: 91, blurb: "High-speed whir", type: "synth" },
  { id: "scream", pack: "classic", name: "Rough scream", emoji: "\uD83D\uDE31", rating: 90, blurb: "40-80 Hz roughness", type: "synth" },
  { id: "brakes", pack: "classic", name: "Squealing brakes", emoji: "\uD83D\uDEB2", rating: 86, blurb: "Metallic protest", type: "synth" },
  { id: "skibidi", pack: "brainrot", name: "SKIBIDI", emoji: "\uD83D\uDEBD", rating: 88, blurb: "Said like a threat", type: "voice", phrase: "skibidi! skibidi toilet!" },
  { id: "sixseven", pack: "brainrot", name: "6-7", emoji: "6-7", rating: 84, blurb: "Word of the year, unfortunately", type: "voice", phrase: "six seven! six seven!" },
  { id: "rizz", pack: "brainrot", name: "RIZZ", emoji: "\uD83D\uDE0F", rating: 79, blurb: "Unearned confidence", type: "voice", phrase: "rizz. rizzler. Ohio rizz." },
  { id: "ohio", pack: "brainrot", name: "That's so Ohio", emoji: "\uD83C\uDF3D", rating: 81, blurb: "Cursed geography", type: "voice", phrase: "that is so Ohio. so Ohio." },
  { id: "sigma", pack: "brainrot", name: "Sigma", emoji: "\uD83D\uDC3A", rating: 73, blurb: "Lone wolf monologue", type: "voice", phrase: "sigma grindset. I am him." },
  { id: "fanum", pack: "brainrot", name: "Fanum tax", emoji: "\uD83C\uDF5F", rating: 77, blurb: "Food crime announcement", type: "voice", phrase: "fanum tax! that's the fanum tax!" },
  { id: "gyatt", pack: "brainrot", name: "GYATT", emoji: "\uD83D\uDCE2", rating: 80, blurb: "Over-projected", type: "voice", phrase: "GYATT. GYAAAATT." },
  { id: "delulu", pack: "brainrot", name: "Delulu", emoji: "\uD83E\uDEE7", rating: 70, blurb: "Unrealistically loud", type: "voice", phrase: "I am delulu. he is so gonna text back." },
  { id: "unc", pack: "brainrot", name: "Unc", emoji: "\uD83D\uDC74", rating: 69, blurb: "You, specifically", type: "voice", phrase: "okay unc. sit down unc." },
  { id: "brainrot", pack: "brainrot", name: "Brainrot dump", emoji: "\uD83E\uDDE0", rating: 93, blurb: "All of it, at once", type: "voice", phrase: "skibidi ohio rizz. six seven. aura. no cap. npc. cooked." },
  { id: "chew", pack: "domestic", name: "Loud chewing", emoji: "\uD83C\uDF6A", rating: 89, blurb: "Open-mouth ASMR crime", type: "synth" },
  { id: "snore", pack: "domestic", name: "Partner snoring", emoji: "\uD83D\uDE34", rating: 85, blurb: "Wet freight train", type: "synth" },
  { id: "yap", pack: "domestic", name: "Small-dog yap", emoji: "\uD83D\uDC15", rating: 94, blurb: "Endless, personal", type: "synth" },
  { id: "fly", pack: "domestic", name: "Fly in the room", emoji: "\uD83E\uDEB0", rating: 78, blurb: "Near your left ear", type: "synth" },
  { id: "plate", pack: "domestic", name: "Knife on plate", emoji: "\uD83C\uDF7D\uFE0F", rating: 87, blurb: "Ceramic scream", type: "synth" },
  { id: "caralarm", pack: "domestic", name: "Car alarm 2am", emoji: "\uD83D\uDE97", rating: 88, blurb: "Nobody is coming", type: "synth" },
  { id: "speakerphone", pack: "domestic", name: "Speakerphone guy", emoji: "\uD83D\uDCF1", rating: 82, blurb: "Whole train car invited", type: "voice", phrase: "HELLO? CAN YOU HEAR ME? I'M ON THE TRAIN." }
];

const storeKey = "irrit8-owned-v1";
let owned = new Set(JSON.parse(localStorage.getItem(storeKey) || '["free"]'));
let audioCtx = null;
let masterGain = null;
let volume = 0.7;
let loopOn = false;
let active = new Map();
let pendingPack = null;
let currentTab = "all";

function saveOwned() {
  localStorage.setItem(storeKey, JSON.stringify([...owned]));
}
function hasPack(id) {
  if (owned.has("chaos")) return true;
  return owned.has(id);
}
function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}
function envGain(duration, peak = 0.35, attack = 0.01, release = 0.05) {
  const g = audioCtx.createGain();
  const t = audioCtx.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.setValueAtTime(peak, t + Math.max(attack, duration - release));
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  g.connect(masterGain);
  return g;
}
function osc(type, freq, dest) {
  const o = audioCtx.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  o.connect(dest);
  return o;
}
function noiseBuffer(seconds = 1) {
  const n = Math.floor(audioCtx.sampleRate * seconds);
  const buf = audioCtx.createBuffer(1, n, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}
function playNoise(dest, duration, filterType, freq, q = 8) {
  const src = audioCtx.createBufferSource();
  src.buffer = noiseBuffer(Math.max(duration, 0.2));
  const f = audioCtx.createBiquadFilter();
  f.type = filterType;
  f.frequency.value = freq;
  f.Q.value = q;
  src.connect(f);
  f.connect(dest);
  src.start();
  src.stop(audioCtx.currentTime + duration);
  return { src, f };
}

const synths = {
  chirp(loop) {
    const run = () => {
      const g = envGain(0.12, 0.45, 0.005, 0.04);
      const o = osc("sine", 3100, g);
      o.start(); o.stop(audioCtx.currentTime + 0.12);
    };
    run();
    if (loop) return setInterval(run, 900);
  },
  notif(loop) {
    const tones = [880, 1175, 880, 1175, 988, 1319, 880];
    const run = () => {
      tones.forEach((f, i) => {
        setTimeout(() => {
          if (!audioCtx) return;
          const g = envGain(0.08, 0.22, 0.005, 0.05);
          const o = osc("triangle", f, g);
          o.start(); o.stop(audioCtx.currentTime + 0.09);
        }, i * 220);
      });
    };
    run();
    if (loop) return setInterval(run, 2000);
  },
  drip(loop) {
    const run = () => {
      const g = envGain(0.18, 0.28, 0.001, 0.12);
      const o = osc("sine", 1400, g);
      o.frequency.exponentialRampToValueAtTime(420, audioCtx.currentTime + 0.16);
      o.start(); o.stop(audioCtx.currentTime + 0.18);
    };
    run();
    if (loop) return setInterval(run, 1100);
  },
  error(loop) {
    const run = () => {
      const g = envGain(0.42, 0.28, 0.01, 0.08);
      const o = osc("square", 196, g);
      o.start(); o.stop(audioCtx.currentTime + 0.18);
      setTimeout(() => {
        const g2 = envGain(0.5, 0.28, 0.01, 0.12);
        const o2 = osc("square", 165, g2);
        o2.start(); o2.stop(audioCtx.currentTime + 0.32);
      }, 180);
    };
    run();
    if (loop) return setInterval(run, 1400);
  },
  t3(loop) {
    const beep = () => {
      const g = envGain(0.5, 0.42, 0.01, 0.04);
      const o = osc("sine", 3100, g);
      o.start(); o.stop(audioCtx.currentTime + 0.5);
    };
    const pattern = () => { beep(); setTimeout(beep, 1000); setTimeout(beep, 2000); };
    pattern();
    if (loop) return setInterval(pattern, 4000);
  },
  chalkboard(loop) {
    const run = () => {
      const g = envGain(1.4, 0.22, 0.02, 0.2);
      const { f } = playNoise(g, 1.4, "bandpass", 2800, 18);
      f.frequency.linearRampToValueAtTime(4200, audioCtx.currentTime + 0.5);
      f.frequency.linearRampToValueAtTime(2200, audioCtx.currentTime + 1.2);
    };
    run();
    if (loop) return setInterval(run, 1600);
  },
  forkglass(loop) {
    const run = () => {
      const g = envGain(1.1, 0.2, 0.002, 0.6);
      [2650, 3180, 4010].forEach((freq, i) => {
        const o = osc("sine", freq, g);
        o.start(); o.stop(audioCtx.currentTime + 1.05 - i * 0.1);
      });
      playNoise(g, 0.15, "highpass", 3000, 4);
    };
    run();
    if (loop) return setInterval(run, 1400);
  },
  drill(loop) {
    const g = audioCtx.createGain();
    g.gain.value = 0.12;
    g.connect(masterGain);
    const carrier = osc("sawtooth", 2400, g);
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 28;
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(carrier.frequency);
    carrier.start(); lfo.start();
    const stop = () => { try { carrier.stop(); lfo.stop(); } catch (e) {} };
    if (!loop) setTimeout(stop, 1600);
    return loop ? { stop } : setTimeout(stop, 1600);
  },
  scream(loop) {
    const run = () => {
      const g = envGain(0.9, 0.2, 0.03, 0.2);
      const o = osc("sawtooth", 780, g);
      o.frequency.linearRampToValueAtTime(980, audioCtx.currentTime + 0.25);
      o.frequency.linearRampToValueAtTime(640, audioCtx.currentTime + 0.85);
      const lfo = audioCtx.createOscillator();
      const lg = audioCtx.createGain();
      lfo.frequency.value = 55;
      lg.gain.value = 40;
      lfo.connect(lg); lg.connect(o.frequency);
      lfo.start(); o.start();
      o.stop(audioCtx.currentTime + 0.9);
      lfo.stop(audioCtx.currentTime + 0.9);
    };
    run();
    if (loop) return setInterval(run, 1200);
  },
  brakes(loop) {
    const run = () => {
      const g = envGain(1.2, 0.16, 0.05, 0.2);
      const o = osc("sawtooth", 1900, g);
      o.frequency.linearRampToValueAtTime(2600, audioCtx.currentTime + 1.1);
      playNoise(g, 1.2, "bandpass", 2200, 12);
      o.start(); o.stop(audioCtx.currentTime + 1.2);
    };
    run();
    if (loop) return setInterval(run, 1500);
  },
  chew(loop) {
    const run = () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const g = envGain(0.08, 0.3, 0.001, 0.05);
          playNoise(g, 0.07, "lowpass", 900, 1);
          const o = osc("sine", 180 + Math.random() * 80, g);
          o.start(); o.stop(audioCtx.currentTime + 0.06);
        }, i * 160);
      }
    };
    run();
    if (loop) return setInterval(run, 1100);
  },
  snore(loop) {
    const run = () => {
      const g = envGain(0.7, 0.28, 0.12, 0.25);
      playNoise(g, 0.7, "lowpass", 280, 0.7);
      const o = osc("sine", 90, g);
      o.frequency.linearRampToValueAtTime(70, audioCtx.currentTime + 0.65);
      o.start(); o.stop(audioCtx.currentTime + 0.7);
    };
    run();
    if (loop) return setInterval(run, 1400);
  },
  yap(loop) {
    const yapOnce = () => {
      const g = envGain(0.12, 0.32, 0.005, 0.05);
      const o = osc("square", 620 + Math.random() * 220, g);
      o.frequency.exponentialRampToValueAtTime(420, audioCtx.currentTime + 0.1);
      playNoise(g, 0.1, "bandpass", 1400, 4);
      o.start(); o.stop(audioCtx.currentTime + 0.12);
    };
    const burst = () => { yapOnce(); setTimeout(yapOnce, 140); setTimeout(yapOnce, 280); };
    burst();
    if (loop) return setInterval(burst, 700);
  },
  fly(loop) {
    const g = audioCtx.createGain();
    g.gain.value = 0.08;
    g.connect(masterGain);
    const o = osc("sawtooth", 260, g);
    const lfo = audioCtx.createOscillator();
    const lg = audioCtx.createGain();
    lfo.frequency.value = 18;
    lg.gain.value = 70;
    lfo.connect(lg); lg.connect(o.frequency);
    const pan = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
    if (pan) {
      g.disconnect();
      g.connect(pan); pan.connect(masterGain);
      const wander = setInterval(() => { pan.pan.value = Math.sin(Date.now() / 240); }, 30);
      o._wander = wander;
    }
    o.start(); lfo.start();
    const stop = () => {
      try { o.stop(); lfo.stop(); } catch (e) {}
      if (o._wander) clearInterval(o._wander);
    };
    if (!loop) setTimeout(stop, 2500);
    return loop ? { stop } : setTimeout(stop, 2500);
  },
  plate(loop) {
    const run = () => {
      const g = envGain(0.55, 0.2, 0.001, 0.2);
      const o = osc("sawtooth", 3400, g);
      o.frequency.linearRampToValueAtTime(4100, audioCtx.currentTime + 0.35);
      playNoise(g, 0.4, "highpass", 2500, 6);
      o.start(); o.stop(audioCtx.currentTime + 0.5);
    };
    run();
    if (loop) return setInterval(run, 800);
  },
  caralarm(loop) {
    let flip = false;
    const beep = () => {
      const g = envGain(0.22, 0.3, 0.005, 0.04);
      const o = osc("square", flip ? 880 : 1240, g);
      flip = !flip;
      o.start(); o.stop(audioCtx.currentTime + 0.2);
    };
    beep();
    const id = setInterval(beep, 230);
    if (!loop) setTimeout(() => clearInterval(id), 2400);
    return id;
  }
};

function speak(phrase, loop) {
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices();
  const pick = voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|google/i.test(v.name))
    || voices.find(v => /en/i.test(v.lang))
    || voices[0];
  const utter = () => {
    const u = new SpeechSynthesisUtterance(phrase);
    if (pick) u.voice = pick;
    u.rate = 1.15 + Math.random() * 0.25;
    u.pitch = 1.4 + Math.random() * 0.5;
    u.volume = Math.min(1, volume + 0.15);
    window.speechSynthesis.speak(u);
  };
  utter();
  if (loop) return setInterval(utter, 2200);
}
function stopAll() {
  active.forEach((handle) => {
    if (typeof handle === "number") clearInterval(handle);
    else if (handle && typeof handle.stop === "function") handle.stop();
  });
  active.clear();
  window.speechSynthesis.cancel();
  document.querySelectorAll(".pad.playing").forEach(el => el.classList.remove("playing"));
}
function playSound(sound, padEl) {
  if (!hasPack(sound.pack)) {
    openStoreHighlight(sound.pack);
    toast("Locked. Buy the " + PACKS[sound.pack].name + " pack.");
    return;
  }
  ensureAudio();
  if (active.has(sound.id) && !loopOn) {
    const handle = active.get(sound.id);
    if (typeof handle === "number") clearInterval(handle);
    else if (handle && handle.stop) handle.stop();
    active.delete(sound.id);
    padEl.classList.remove("playing");
    return;
  }
  padEl.classList.add("playing");
  let handle;
  if (sound.type === "voice") handle = speak(sound.phrase, loopOn);
  else handle = synths[sound.id](loopOn);
  if (handle != null) active.set(sound.id, handle);
  if (!loopOn) setTimeout(() => padEl.classList.remove("playing"), 1600);
}
function filteredSounds() {
  if (currentTab === "all") return SOUNDS.filter(s => hasPack(s.pack));
  if (currentTab === "locked") return SOUNDS.filter(s => !hasPack(s.pack));
  return SOUNDS.filter(s => s.pack === currentTab);
}
function renderBoard() {
  const grid = document.getElementById("grid");
  const list = currentTab === "all" ? SOUNDS : filteredSounds();
  const show = currentTab === "all" ? SOUNDS : list;
  grid.innerHTML = show.map(s => {
    const locked = !hasPack(s.pack);
    return `<button class="pad ${locked ? "locked" : ""}" data-id="${s.id}">
      <span class="emoji">${s.emoji}</span>
      <h3>${s.name}</h3>
      <div class="meta">${s.blurb}</div>
      <div class="rating"><span style="width:${s.rating}%"></span></div>
      ${locked ? `<span class="lock-badge">Locked</span>` : `<span class="owned-badge">${s.rating}</span>`}
    </button>`;
  }).join("");
  grid.querySelectorAll(".pad").forEach(el => {
    el.addEventListener("click", () => {
      const sound = SOUNDS.find(s => s.id === el.dataset.id);
      playSound(sound, el);
    });
  });
}
function renderStore() {
  const chaosOwned = owned.has("chaos");
  const html = Object.values(PACKS).filter(p => p.id !== "free").map(p => {
    const isOwned = chaosOwned || owned.has(p.id);
    const artClass = "pack-art pack-art-" + p.id;
    const count = p.id === "chaos" ? SOUNDS.length : SOUNDS.filter(s => s.pack === p.id).length;
    const desc = {
      classic: "Survey-backed torture: Temporal-3 fire alarm, chalkboard scrape, fork-on-glass, drill, scream roughness, brakes.",
      brainrot: "Gen Z + Gen Alpha slang, shouted. Skibidi, 6-7, rizz, Ohio, sigma, Fanum tax, gyatt, delulu, unc, brainrot dump.",
      domestic: "The household greatest hits: chewing, snoring, yapping, fly, knife-on-plate, 2am car alarm, speakerphone guy.",
      chaos: "Unlock every pack forever. For people who have enemies and a portable speaker.",
    }[p.id];
    return `<article class="pack" id="pack-${p.id}">
      <div class="${artClass}" aria-hidden="true">${p.name}</div>
      <div class="pack-body">
        <h3>${p.name}</h3>
        <div class="price">$${p.price.toFixed(2)} \u00b7 ${count} sounds</div>
        <p>${desc}</p>
        ${isOwned ? `<button class="owned">Owned</button>` : `<button class="buy" data-pack="${p.id}">Unlock pack</button>`}
      </div>
    </article>`;
  }).join("");
  document.getElementById("packs").innerHTML = html;
  document.querySelectorAll(".buy").forEach(btn => {
    btn.addEventListener("click", () => startCheckout(btn.dataset.pack));
  });
}
function startCheckout(packId) {
  pendingPack = packId;
  const pack = PACKS[packId];
  document.getElementById("modalTitle").textContent = pack.name;
  document.getElementById("modalCopy").textContent =
    `This is a demo checkout. No real charge. Unlock ${pack.name} for a simulated $${pack.price.toFixed(2)}.`;
  document.getElementById("modalBg").classList.add("show");
}
function finishCheckout() {
  if (!pendingPack) return;
  if (pendingPack === "chaos") owned = new Set(["free", "classic", "brainrot", "domestic", "chaos"]);
  else owned.add(pendingPack);
  saveOwned();
  document.getElementById("modalBg").classList.remove("show");
  toast(PACKS[pendingPack].name + " unlocked.");
  pendingPack = null;
  renderStore(); renderBoard(); updateWallet();
}
function openStoreHighlight(packId) {
  showView("store");
  setTimeout(() => {
    document.getElementById("pack-" + packId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 50);
}
function showView(name) {
  document.getElementById("board").classList.toggle("hide", name !== "board");
  document.getElementById("store").classList.toggle("show", name === "store");
  document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.view === name || (name === "board" && t.dataset.tab && t.dataset.tab === currentTab)));
  document.getElementById("tab-store").classList.toggle("active", name === "store");
}
function updateWallet() {
  const extras = [...owned].filter(x => x !== "free").length;
  document.getElementById("ownedCount").textContent = extras;
}
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
}
function bind() {
  document.getElementById("vol").addEventListener("input", (e) => {
    volume = Number(e.target.value);
    if (masterGain) masterGain.gain.value = volume;
  });
  document.getElementById("loop").addEventListener("change", (e) => {
    loopOn = e.target.checked;
    if (!loopOn) stopAll();
  });
  document.getElementById("panic").addEventListener("click", stopAll);
  document.querySelectorAll("[data-tab]").forEach(tab => {
    tab.addEventListener("click", () => {
      currentTab = tab.dataset.tab;
      showView("board");
      document.querySelectorAll("[data-tab]").forEach(t => t.classList.toggle("active", t === tab));
      renderBoard();
    });
  });
  document.getElementById("tab-store").addEventListener("click", () => showView("store"));
  document.getElementById("confirmBuy").addEventListener("click", finishCheckout);
  document.getElementById("cancelBuy").addEventListener("click", () => {
    document.getElementById("modalBg").classList.remove("show");
    pendingPack = null;
  });
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

renderBoard();
renderStore();
updateWallet();
bind();
showView("board");
