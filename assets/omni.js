/* 0mni site v2 */
(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nf = (n, d = 0) => n == null || isNaN(n) ? '—' : (+n).toLocaleString('en-US', { maximumFractionDigits: d });
const usd = v => v == null || isNaN(v) ? '—' : '$' + (v >= 1e6 ? nf(v / 1e6, 2) + 'M' : v >= 1e4 ? nf(v / 1e3, 1) + 'K' : nf(v, 0));
const age = iso => { if (!iso) return '—'; const s = (Date.now() - Date.parse(iso)) / 1000; return s < 60 ? Math.max(1, Math.round(s)) + 's' : s < 3600 ? Math.round(s / 60) + 'm' : Math.round(s / 3600) + 'h'; };
const clamp = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
const hex = h => [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
const mix = (a, b, k) => `rgb(${a[0] + (b[0] - a[0]) * k | 0},${a[1] + (b[1] - a[1]) * k | 0},${a[2] + (b[2] - a[2]) * k | 0})`;
const GLY = '!<>-_\\/[]{}=+*^?#01';
gsap.registerPlugin(ScrollTrigger);
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
const RPX = {"x0":30,"y0":21,"w":68,"h":62,"p":[["0c0f0d","0f1310"],["96969e","1c1c20"],["9a9aa2","202024"],["9b5cff","9b5cff"],["aeaeb6","1e1e22"],["c6ff3d","c6ff3d"],["c9c9cf","2b2b30"],["dcdce1","3a3a41"],["ececf0","4d4d55"],["f3ba2f","f3ba2f"]],"d":"..............................JJJJ................................................................JJJJ................................................................JJJJ................................................................JJJJ.................................................................EE..................................................................EE..................................................DDDD............EE............FFFF..................................DDDD............EE............FFFF..................................DDDD............EE............FFFF..................................DDDD............EE............FFFF...................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE....................................EE.............EE.............EE..............................HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHB.........HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHBB........HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHBBB.......HHHHHHCHHCHHCHHCHHCHHCHHCHHCHHCHHCHHHHHHHHHHHHHHHHHHHHHHHBBBB......HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHBBBBB.....HHHHHHCHHCHHCHHCHHCHHCHHCHHCHHCHHCHHHHHHHHHHHHHHHHHHHHHHHBBBBBB....HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHBBBBBBB...HHHHHHCHHCHHCHHCHHCHHCHHCHHCHHCHHCHHHHHHHHHHHHHHHHHHHHHHHBBBBBBBB..HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHBBBBBBBBB.HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHBBBBBBBBBBIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBGGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBGGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBGGGGGAAAAAFFFAAAAAAAAAAAFAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBBBBGGGGGAAAAAFAFAFFFFAAFFAAAAAAAAAAGGGGGDDDGGGJJJGGGFFFGGGGGBBBBBBBBBBBGGGGGAAAAAFAFAFAFAFAFAFAFAAAAAAAGGGGGDDDGGGJJJGGGFFFGGGGGBBBBBBBBBBBGGGGGAAAAAFAFAFAFAFAFAFAFAAAAAAAGGGGGDDDGGGJJJGGGFFFGGGGGBBBBBBBBBB.GGGGGAAAAAFFFAFAFAFAFAFAFAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBBB..GGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBBB...GGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBBB....GGGGGAAAAAAAAAAAAAAAAAAAAAAAAAAAGGGGGGGGGGGGGGGGGGGGGGGGGBBBBBB.....GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGBBBBB......GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGBBBB.......GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGBBB........GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBGBB.........GBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBGB.........."};

// ------------------------------------------------ code drifting behind the hero
const CODE = ["const route = { sol: 'jito', bnb: 'private-rpc', hood: 'sequencer' }", "", "async function launch(coin, { chain, burner }) {", "  const w = burner ?? await wallet.fresh(chain)", "  if (await opsec(w).linkedTo(main)) warn('this wallet points back to you')", "  const tx = await build.launch(coin, { chain, firstBuy: true })", "  return send(tx, { via: route[chain], mempool: false })", "}", "", "async function trade(side, coin, size, chain) {", "  const tx = await build.swap(side, coin, size, { chain })", "  return send(tx, { via: route[chain], mempool: false })", "}", "", "for (const chain of ['sol', 'bnb', 'hood'])", "  watch(chain).on('launch', coin => scan(coin.dev))", "", "export const trace = null", ""];
const hl = l => esc(l).replace(/(&#39;[^&]*&#39;)/g, '<span class="s">$1</span>').replace(/\b(const|async|function|await|return|if|for|of|export|null)\b/g, '<span class="k">$1</span>');
const block = Array.from({ length: 4 }, () => CODE.map(hl).join('\n')).join('\n'); $('#codebg').innerHTML = block + '\n' + block;

// ------------------------------------------------ marquee
const M = [['sol', 'Solana', 'Jito bundles'], ['bnb', 'BNB Chain', 'private RPC'], ['hood', 'Robinhood Chain', 'the sequencer']];
const mq = M.map(([k, n, r]) => `<span><svg class="lg ${k}"><use href="#l-${k}"/></svg>${n}<em>· ${r}</em></span>`).join('') + '<span>every chain<em>· no trace</em></span>';
$('#marq').innerHTML = mq + mq + mq + mq;

// ------------------------------------------------ smooth scroll
let lenis = null;
if (window.Lenis && !reduced) { lenis = new Lenis({ duration: 1.15, smoothWheel: true }); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
const go = id => { const el = id === 'top' ? 0 : document.getElementById(id); if (el == null) return; document.body.classList.remove('menu'); lenis ? lenis.scrollTo(el, { offset: id === 'top' ? 0 : -70, duration: 1.4 }) : (el === 0 ? scrollTo(0, 0) : el.scrollIntoView({ behavior: 'smooth' })); };
document.addEventListener('click', e => { const a = e.target.closest('[data-go]'); if (a) { e.preventDefault(); go(a.dataset.go); } });
$('#burger').onclick = () => document.body.classList.toggle('menu');

// ------------------------------------------------ nav, progress, active link
const nav = $('#nav');
ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => { nav.classList.toggle('solid', s.scroll() > 30); gsap.set('#prog', { scaleX: s.progress }); } });
$$('.links a').forEach(a => { const sec = document.getElementById(a.dataset.go); if (sec) ScrollTrigger.create({ trigger: sec, start: 'top 45%', end: 'bottom 45%', onToggle: s => a.classList.toggle('on', s.isActive) }); });

// ------------------------------------------------ headings split into words that rise
$$('.split').forEach(h => { h.innerHTML = h.innerHTML.split(/(<br>)/).map(part => part === '<br>' ? part : part.split(' ').filter(Boolean).map(w => `<span class="wd"><span>${w}</span></span>`).join(' ')).join(''); });
if (!reduced) gsap.set('.split .wd > span', { yPercent: 110 });

// ------------------------------------------------ text scramble
function scramble(el, dur = .7) {
  const txt = el.dataset.t || (el.dataset.t = el.textContent); const t0 = performance.now();
  (function f(n) { const k = clamp((n - t0) / (dur * 1000)), r = Math.floor(k * txt.length);
    el.textContent = txt.slice(0, r) + txt.slice(r).replace(/[^\s·]/g, () => GLY[Math.random() * GLY.length | 0]); if (k < 1) requestAnimationFrame(f); })(t0);
}

// ------------------------------------------------ intro (white, no text): one pixel splits into three chains, they print the router, it flies into the hero
function intro(done) {
  const el = $('#intro'), force = /[?&]intro/.test(location.search);
  const seen = !force && (() => { try { return sessionStorage.getItem('0mni5') === '1'; } catch { return false; } })();
  if (reduced || seen) { el.remove(); return done(false); }
  document.body.classList.add('intro'); scrollTo(0, 0); lenis && lenis.stop();
  const c = $('#ic'), x = c.getContext('2d'), d = Math.min(2, devicePixelRatio || 1); let W, H, cs, ox, oy, CY;
  const IL = $$('#ilogos .il');
  const SRC = [() => [W * .14, CY], () => [W * .5, H * .87], () => [W * .86, CY]];
  const size = () => { W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; CY = H * .45;
    cs = Math.max(3, Math.floor(Math.min(W * .6, H * .42, 450) / RPX.w)); ox = Math.round(W / 2 - (RPX.x0 + RPX.w / 2) * cs); oy = Math.round(CY - (RPX.y0 + RPX.h / 2) * cs);
    IL.forEach((l, i) => { const [a, b] = SRC[i](); gsap.set(l, { xPercent: -50, yPercent: -50, x: a, y: b }); }); };
  IL.forEach(l => gsap.set(l, { opacity: 0, scale: .2 })); size(); addEventListener('resize', size);
  // the shadow, cut out of the page's own router image so the hand-off matches pixel for pixel
  const shade = document.createElement('canvas'); shade.width = shade.height = 125; const img = new Image(); img.src = '/assets/router.png';
  img.onload = () => { const s = shade.getContext('2d'); s.imageSmoothingEnabled = false; s.drawImage(img, 0, 0, 125, 125); const id = s.getImageData(0, 0, 125, 125);
    for (let i = 3; i < id.data.length; i += 4) if (id.data[i] > 200) id.data[i] = 0; s.putImageData(id, 0, 0); };
  // pixels: printed bottom-up, each one flying in a ribbon from its chain and landing as graphite
  const COL = [hex('9945ff'), hex('f0b90b'), hex('8fbf1c')], BEND = [.22, .16, -.22], LCD = hex('0f1310'), WHITE = [255, 255, 255], P = [];
  for (let i = 0; i < RPX.d.length; i++) { const ch = RPX.d[i]; if (ch === '.') continue; const [, l] = RPX.p['ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(ch)];
    const gx = RPX.x0 + i % RPX.w, gy = RPX.y0 + (i / RPX.w | 0), yf = (gy - RPX.y0) / RPX.h; let k = gx < 53 ? 0 : gx < 74 ? 1 : 2; if (Math.random() < .15) k = Math.random() * 3 | 0;
    P.push({ gx, gy, l: hex(l), ink: l === 'c6ff3d', k, del: .8 + (1 - yf) * .95 + Math.random() * .22, dur: .45 + Math.random() * .2, bend: BEND[k] + (Math.random() - .5) * .14, sx: null }); }
  const built = Math.max(...P.map(p => p.del + p.dur));
  let t0 = 0, te = built + .9, ex = null, fin = false, popped = false;
  const skip = () => { const t = (performance.now() - t0) / 1000; if (t < te) te = Math.max(t, .3); };
  el.addEventListener('pointerdown', skip); addEventListener('keydown', skip, { once: true });
  const ease = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2, e4 = u => u < .5 ? 8 * u ** 4 : 1 - Math.pow(-2 * u + 2, 4) / 2, eo = u => 1 - Math.pow(1 - u, 3);
  const centre = l => { const r = l.querySelector('svg').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  function exit() {
    gsap.set('.chainrow', { y: 0, opacity: 1 }); gsap.killTweensOf(IL); IL.forEach(l => gsap.set(l, { opacity: 1, scale: 1 })); const L0 = IL.map(centre);
    const r = $('.router').getBoundingClientRect(); ex = { r, hc: r.width / 125, ox, oy, cs };
    P.forEach(p => { if (p.ps) { p.fx = p.px; p.fy = p.py; p.fs = p.ps; } else { [p.fx, p.fy] = L0[p.k]; p.fs = .01; } p.xd = (p.gy - RPX.y0) / RPX.h * .06; });
    const CR = $$('.chainrow svg');
    IL.forEach((l, i) => { const a = l.querySelector('svg').getBoundingClientRect(), b = CR[i].getBoundingClientRect(); gsap.set(l, { transformOrigin: '0 0' }); gsap.to(l, { x: '+=' + (b.left - a.left), y: '+=' + (b.top - a.top), scale: b.width / a.width, duration: .95, ease: 'expo.inOut', delay: .05 + i * .04 }); });
  }
  function frame(now) {
    if (fin) return; const t = (now - t0) / 1000;
    if (t >= te && !ex) exit();
    const xt = ex ? t - te : -1, sw = t - built;
    // a slow push-in: the scene settles from 1.045 to 1 by the time the router stands
    const z = ex ? 1 : 1 + .045 * (1 - eo(clamp(t / (built + .25)))), zc = (v, cc) => (v - cc) / z + cc;
    x.setTransform(d, 0, 0, d, 0, 0); x.clearRect(0, 0, W, H); x.setTransform(d * z, 0, 0, d * z, d * (W / 2) * (1 - z), d * CY * (1 - z));
    // dot grid, darkening along the ring when the router is complete
    const R = sw * 1300, ga = ex ? Math.max(0, 1 - xt * 2.5) : Math.min(1, t * 1.6);
    if (ga > 0) for (let gy = 14; gy < H; gy += 26) for (let gx = 14; gx < W; gx += 26) { let a = .12; if (sw > 0 && sw < 1.4) { const dd = Math.abs(Math.hypot(gx - W / 2, gy - CY) - R); if (dd < 44) a += (1 - dd / 44) * .5 * (1 - sw / 1.4); }
      x.fillStyle = `rgba(20,20,24,${a * ga})`; x.fillRect(gx, gy, 1.6, 1.6); }
    // opening: one lime pixel blinks, splits into three, each opens into a chain logo
    const L = IL.map(centre).map(([a, b]) => [zc(a, W / 2), zc(b, CY)]);
    if (!ex && t < .95) { const ps = Math.max(8, cs * 2);
      if (t < .42) { if (Math.floor(t / .1) % 2 === 0 || t > .3) { x.fillStyle = '#c6ff3d'; x.fillRect(W / 2 - ps / 2, CY - ps / 2, ps, ps); x.strokeStyle = 'rgba(20,20,24,.85)'; x.lineWidth = 1.5; x.strokeRect(W / 2 - ps / 2, CY - ps / 2, ps, ps); } }
      else { const u = eo(clamp((t - .42) / .34)); L.forEach(([lx, ly], i) => { if (u >= 1) return; const px = W / 2 + (lx - W / 2) * u, py = CY + (ly - CY) * u, s = ps * (1 - u * .5);
        x.strokeStyle = `rgba(${COL[i]},.35)`; x.lineWidth = 2; x.beginPath(); x.moveTo(W / 2 + (lx - W / 2) * Math.max(0, u - .25), CY + (ly - CY) * Math.max(0, u - .25)); x.lineTo(px, py); x.stroke();
        x.fillStyle = `rgb(${COL[i]})`; x.fillRect(px - s / 2, py - s / 2, s, s); });
        if (u >= 1 && !popped) { popped = true; gsap.to(IL, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2.4)', stagger: .04 }); } } }
    // soft halos behind the logos while they send
    if (!ex && t > .7 && sw < .5) L.forEach(([lx, ly], i) => { const a = clamp((t - .7) / .3) * clamp((.5 - sw) / .5) * (.55 + .45 * Math.sin(t * 7 + i)); const g = x.createRadialGradient(lx, ly, 0, lx, ly, 70);
      g.addColorStop(0, `rgba(${COL[i]},${.22 * a})`); g.addColorStop(1, `rgba(${COL[i]},0)`); x.fillStyle = g; x.fillRect(lx - 70, ly - 70, 140, 140); });
    // ring when it stands
    if (sw > 0 && sw < 1 && !ex) { x.strokeStyle = `rgba(20,20,24,${.2 * (1 - sw)})`; x.lineWidth = 1.5; x.beginPath(); x.arc(W / 2, CY, R, 0, 7); x.stroke(); }
    // the long shadow sweeps out, then travels with the router on exit
    const sk = clamp((t - built + .05) / .55); if (sk > 0) {
      let sox = ox, soy = oy, scs = cs; if (ex) { const u = e4(clamp((xt - .03) / .9)); sox = ex.ox + (ex.r.left - ex.ox) * u; soy = ex.oy + (ex.r.top - ex.oy) * u; scs = ex.cs + (ex.hc - ex.cs) * u; }
      x.save(); x.beginPath(); const s0 = (RPX.x0 + RPX.y0 + 30) * scs + (250 - RPX.x0 - RPX.y0 - 30) * scs * (ex ? 1 : ease(sk)); x.moveTo(sox, soy); x.lineTo(sox + s0, soy); x.lineTo(sox, soy + s0); x.closePath(); x.clip();
      x.imageSmoothingEnabled = false; x.drawImage(shade, sox, soy, 125 * scs, 125 * scs); x.restore(); }
    // pixels
    const streak = [[], [], []], sheen = sw > .15 && sw < .8 && !ex ? 40 + (sw - .15) / .65 * 170 : -99, lcdOn = sw > .5 || (sw > .25 && Math.floor(sw * 22) % 2 === 0);
    for (const p of P) {
      if (!ex) { const tx = ox + p.gx * cs, ty = oy + p.gy * cs, u = clamp((t - p.del) / p.dur); if (u <= 0) continue; if (p.sx == null) { [p.sx, p.sy] = L[p.k]; p.px = p.sx; p.py = p.sy; }
        const e = ease(u), mx = (p.sx + tx) / 2 - (ty - p.sy) * p.bend, my = (p.sy + ty) / 2 + (tx - p.sx) * p.bend;
        const nx = (1 - e) ** 2 * p.sx + 2 * (1 - e) * e * mx + e * e * tx, ny = (1 - e) ** 2 * p.sy + 2 * (1 - e) * e * my + e * e * ty;
        if (u < 1) streak[p.k].push(p.px, p.py, nx, ny);
        const since = t - p.del - p.dur; let col = p.ink && !lcdOn && u >= 1 ? LCD : p.l;
        if (u < 1) p.pc = `rgb(${COL[p.k]})`; else if (since < .3) p.pc = mix(COL[p.k], col, since / .3);
        else { const b = sheen > 0 ? Math.exp(-(((p.gx + p.gy) - sheen) ** 2) / 90) * .55 : 0; p.pc = b > .02 ? mix(col, WHITE, b) : `rgb(${col})`; }
        p.px = nx; p.py = ny; p.ps = u < 1 ? Math.max(2, cs * (.4 + .6 * e)) : cs; }
      else { if (!p.fs) continue; const u = e4(clamp((xt - p.xd) / .9)), hx = ex.r.left + p.gx * ex.hc, hy = ex.r.top + p.gy * ex.hc;
        p.px = p.fx + (hx - p.fx) * u; p.py = p.fy + (hy - p.fy) * u; p.ps = p.fs + (ex.hc - p.fs) * u; p.pc = `rgb(${p.l})`; }
      x.fillStyle = p.pc; const pz = ex ? p.ps + 1 : p.ps + .4; x.fillRect(p.px, p.py, pz, pz);
    }
    x.lineWidth = 1.2; streak.forEach((a, k) => { if (!a.length) return; x.strokeStyle = `rgba(${COL[k]},.38)`; x.beginPath(); for (let i = 0; i < a.length; i += 4) { x.moveTo(a[i], a[i + 1]); x.lineTo(a[i] + (a[i] - a[i + 2]) * 2.8, a[i + 1] + (a[i + 1] - a[i + 3]) * 2.8); } x.stroke(); });
    // antenna tips ping, one chain after another
    if (sw > .1 && !ex) [[47, 28.5, 0], [62, 22.5, 1], [77, 28.5, 2]].forEach(([gx, gy, k], i) => { const q = sw - .1 - i * .12; if (q < 0) return; const ph = (q * .9) % 1; x.strokeStyle = `rgba(${COL[k]},${.85 * (1 - ph)})`; x.lineWidth = 2; x.beginPath(); x.arc(ox + gx * cs, oy + gy * cs, cs * (2 + ph * 12), 0, 7); x.stroke(); });
    // hand-over: router and logos are in their hero spots, so swap the intro for the real page in one frame
    if (ex && xt > 1.02) { fin = true; removeEventListener('resize', size);
      const hold = $$('.router, .chainrow'); hold.forEach(e => e.style.transition = 'none');
      document.body.classList.remove('intro'); void document.body.offsetHeight; el.remove(); lenis && lenis.start(); try { sessionStorage.setItem('0mni5', '1'); } catch { }
      requestAnimationFrame(() => hold.forEach(e => e.style.transition = '')); done(true); return; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(n => { t0 = n; frame(n); });
}

// ------------------------------------------------ hero numbers
function counters() { $$('.hstats b').forEach((b, i) => { const n = +b.dataset.n, o = { v: n ? 0 : 99 }; gsap.to(o, { v: n, duration: n ? 1.2 : 1.6, delay: .2 + i * .12, ease: 'power3.out', onUpdate: () => b.textContent = Math.round(o.v) }); }); }

// ------------------------------------------------ reveals, magnetic buttons, tilt
function motion(fromIntro) {
  gsap.to('.hero h1 .wd > span', { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .07, delay: fromIntro ? .05 : 0 });
  ScrollTrigger.batch('.rv', { start: 'top 90%', once: true, onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .08 }) });
  $$('.split').forEach(h => { if (h.closest('.hero')) return; gsap.to(h.querySelectorAll('.wd > span'), { yPercent: 0, duration: 1, ease: 'expo.out', stagger: .05, scrollTrigger: { trigger: h, start: 'top 88%', once: true } }); });
  $$('.eyebrow').forEach(e => ScrollTrigger.create({ trigger: e, start: 'top 92%', once: true, onEnter: () => scramble(e) }));
  counters();
  ScrollTrigger.addEventListener('scrollEnd', () => $$('.rv').forEach(el => { if (+getComputedStyle(el).opacity < .05 && el.getBoundingClientRect().top < innerHeight) gsap.to(el, { opacity: 1, y: 0, duration: .8, ease: 'expo.out' }); }));
  gsap.to('.router', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.code-bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('#bigw', { backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%', ease: 'none', scrollTrigger: { trigger: '#bigw', start: 'top bottom', end: 'max', scrub: true } });
  gsap.fromTo('#rlFill', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#road', start: 'top 80%', end: 'bottom 60%', scrub: true } });
  ['#opsec', '#cta'].forEach(s => gsap.fromTo(s, { clipPath: 'inset(0% 4% 0% 4% round 44px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 20%', scrub: true } }));
  if (fine && !reduced) {
    $$('.mag').forEach(b => { b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .4, ease: 'power3.out' }); }); b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' })); });
    $$('.tilt').forEach(c => { c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; gsap.to(c, { rotateY: px * 7, rotateX: -py * 7, y: -4, transformPerspective: 900, duration: .5, ease: 'power3.out' }); }); c.addEventListener('pointerleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, y: 0, duration: .8, ease: 'expo.out' })); });
    const art = $('#art'); addEventListener('pointermove', e => { const px = e.clientX / innerWidth - .5, py = e.clientY / innerHeight - .5; gsap.to(art, { x: px * 18, y: py * 14, rotate: px * 2, duration: 1.2, ease: 'power3.out' }); });
  }
}

// ------------------------------------------------ the duel: the same buy through the public mempool and through 0mni
function duel() {
  const pub = $('.lane.pub'), prv = $('.lane.prv'), q = (r, s) => r.querySelector(s);
  const A = { you: q(pub, '[data-k=you]'), b1: q(pub, '[data-k=b1]'), b2: q(pub, '[data-k=b2]'), beam: q(pub, '.beam'), tag: q(pub, '.etag'), res: q(pub, '.res') };
  const B = { you: q(prv, '[data-k=you]'), beam: q(prv, '.beam'), tag: q(prv, '.etag'), res: q(prv, '.res'), pk: q(prv, '.pk') };
  gsap.set([A.you, B.you], { '--x': '7%', '--y': '55%' }); gsap.set(A.b1, { '--x': '58%', '--y': '55%', scale: .4 }); gsap.set(A.b2, { '--x': '24%', '--y': '55%', scale: .4 });
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });
  tl.to([A.you, B.you], { '--x': (i) => i ? '21%' : '41%', duration: 1.6 }, 0)
    .to(B.you, { opacity: 0, duration: .3 }, 1.1).to(B.pk, { opacity: 1, duration: .2 }, 1.2).to(B.pk, { left: '92%', duration: 3.2, ease: 'power1.inOut' }, 1.2).to(B.pk, { opacity: 0, duration: .2 }, 4.3)
    .to([A.beam, B.beam], { opacity: 1, duration: .3 }, 1.6).to([A.beam, B.beam], { left: '55%', duration: 2.2, ease: 'none' }, 1.6).to([A.beam, B.beam], { opacity: 0, duration: .3 }, 3.6)
    .to(A.you, { '--spot': 1, duration: .3 }, 2.55).to(A.tag, { opacity: 1, duration: .3 }, 2.55).to(B.tag, { opacity: 1, duration: .3 }, 3.6)
    .to([A.b1, A.b2], { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)', stagger: .2 }, 3.3)
    .to(A.b1, { '--x': '84.5%', '--y': '29%', duration: 1.1 }, 4.6).to(A.you, { '--x': '84.5%', '--y': '53%', duration: 1.1 }, 5).to(A.b2, { '--x': '84.5%', '--y': '77%', duration: 1.1 }, 5.4)
    .set(B.you, { '--x': '84.5%', '--y': '29%', scale: .6 }, 4.5).to(B.you, { opacity: 1, scale: 1, duration: .6, ease: 'back.out(2)' }, 4.5)
    .to([A.res, B.res], { opacity: 1, duration: .6 }, 6.6).to({}, { duration: .6 });
  if (innerWidth > 860 && !reduced) ScrollTrigger.create({ trigger: '#duelPin', start: () => $('#duelPin').offsetHeight + 100 < innerHeight ? 'top 76px' : 'center center', end: '+=1500', pin: true, scrub: .6, animation: tl, refreshPriority: 2 });
  else { tl.repeat(-1).repeatDelay(2.2); ScrollTrigger.create({ trigger: '#duelW', start: 'top 75%', end: 'bottom top', onToggle: s => s.isActive ? tl.play() : tl.pause() }); }
}

// ------------------------------------------------ chain panels stack on top of each other
function panels() {
  if (innerWidth <= 860) return; const P = $$('.panel'); P.forEach((p, i) => { if (i === P.length - 1) return;
    gsap.to(p, { scale: .94, '--cover': .55, ease: 'none', scrollTrigger: { trigger: P[i + 1], start: 'top bottom', end: () => 'top ' + (parseFloat(getComputedStyle(P[i + 1]).top) || 100) + 'px', scrub: true } }); });
}

// ------------------------------------------------ closing: three streams that vanish in the middle
function ctaStreams() {
  const c = $('#ctaC'); if (!c || reduced) return; const x = c.getContext('2d'), d = Math.min(2, devicePixelRatio || 1); let W, H, on = false, parts = [];
  const size = () => { const r = c.getBoundingClientRect(); W = r.width; H = r.height; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0); }; size(); addEventListener('resize', size);
  const CC = ['153,69,255', '240,185,11', '184,230,0'], O = [() => [-20, H * .3 + Math.random() * H * .4], () => [W * .3 + Math.random() * W * .4, H + 20], () => [W + 20, H * .3 + Math.random() * H * .4]];
  const spawn = () => { const k = Math.random() * 3 | 0, [sx, sy] = O[k](); parts.push({ k, sx, sy, t: 0, sp: .25 + Math.random() * .35, b: (Math.random() - .5) * .6, px: sx, py: sy }); };
  new IntersectionObserver(es => { on = es[0].isIntersecting; if (on) requestAnimationFrame(f); }).observe(c);
  let last = performance.now();
  function f(now) { if (!on) return; const dt = Math.min(.05, (now - last) / 1000); last = now; x.clearRect(0, 0, W, H);
    for (let gy = 14; gy < H; gy += 28) for (let gx = 14; gx < W; gx += 28) { x.fillStyle = 'rgba(120,124,116,.13)'; x.fillRect(gx, gy, 1.5, 1.5); }
    for (let i = 0; i < 4; i++) if (parts.length < 230) spawn();
    const cx = W / 2, cy = H * .46; x.lineWidth = 1.5;
    parts = parts.filter(p => { p.t += dt * p.sp; if (p.t >= 1) return false; const e = p.t, mx = (p.sx + cx) / 2 - (cy - p.sy) * p.b, my = (p.sy + cy) / 2 + (cx - p.sx) * p.b;
      const nx = (1 - e) ** 2 * p.sx + 2 * (1 - e) * e * mx + e * e * cx, ny = (1 - e) ** 2 * p.sy + 2 * (1 - e) * e * my + e * e * cy, a = Math.min(1, e * 4) * (1 - e) ** 1.4;
      x.lineWidth = 2; x.strokeStyle = `rgba(${CC[p.k]},${a * .9})`; x.beginPath(); x.moveTo(p.px, p.py); x.lineTo(nx, ny); x.stroke(); x.fillStyle = `rgba(${CC[p.k]},${a})`; x.fillRect(nx - 1.5, ny - 1.5, 3, 3); p.px = nx; p.py = ny; return true; });
    requestAnimationFrame(f); }
}

// ------------------------------------------------ how it works: a terminal that follows the steps
const P = '<span class="p">anon@0mni ~ %</span> ';
const STEP = [
  [['chain sol', ['<span class="ok">✓</span> solana · route <span class="c">jito bundles</span>']], ['chain bnb', ['<span class="ok">✓</span> bnb chain · route <span class="c">private rpc</span>']], ['chain hood', ['<span class="ok">✓</span> robinhood chain · route <span class="c">sequencer</span>']]],
  [['burner new', ['<span class="ok">✓</span> fresh wallet, made in this browser', '  address  <span class="bl">xxxxxxxxxxxxxxxxxxxx</span>', '  keys     <span class="m">only here. you sign everything</span>']]],
  [['opsec burner', ['<span class="m">reading names, funding, clock, clusters…</span>', '<span class="ok">✓</span> no names', '<span class="ok">✓</span> no shared hours with your main', '<span class="w">!</span> <span class="w">funded by your main wallet</span>', '  <span class="m">0mni shows the link before you sign. it never hides it.</span>']]],
  [['launch $COIN --buy', ['<span class="m">building launch + first buy…</span>', '<span class="ok">✓</span> one bundle · sent to the block engine', '<span class="ok">✓</span> landed together · nothing to snipe']]],
  [['buy $COIN', ['<span class="ok">✓</span> private route · no public queue']], ['sell $COIN 50%', ['<span class="ok">✓</span> private route · no sandwich']]],
];
const CHAINS = ['0:sol*', '0:sol*', '0:sol*', '0:sol*', '0:sol*']; let cur = -1, typing = null;
function setStep(i) {
  if (i === cur) return; cur = i; $$('#steps li').forEach(li => li.classList.toggle('on', +li.dataset.i === i)); $('#tchain').textContent = CHAINS[i];
  const tb = $('#tbody'); clearTimeout(typing); let html = '', q = [];
  STEP[i].forEach(([c, out]) => { q.push({ c }); out.forEach(o => q.push({ o })); });
  const run = () => { const it = q.shift(); if (!it) { tb.innerHTML = html + P + '<span class="cur"></span>'; return; }
    if (it.c) { let k = 0; const ty = () => { k++; tb.innerHTML = html + P + '<span class="c">' + esc(it.c.slice(0, k)) + '</span><span class="cur"></span>'; if (k < it.c.length) typing = setTimeout(ty, reduced ? 0 : 26); else { html += P + '<span class="c">' + esc(it.c) + '</span>\n'; typing = setTimeout(run, 220); } }; ty(); }
    else { html += it.o + '\n'; tb.innerHTML = html + '<span class="cur"></span>'; typing = setTimeout(run, reduced ? 0 : 160); } };
  run();
}
$$('#steps li').forEach(li => li.addEventListener('click', () => setStep(+li.dataset.i)));
function howPin() {
  if (innerWidth > 860 && !reduced) ScrollTrigger.create({ trigger: '#howIn', start: 'center center', end: '+=2000', pin: true, refreshPriority: 1, onUpdate: s => setStep(Math.min(4, Math.floor(s.progress * 5))) });
  else { ScrollTrigger.create({ trigger: '#howIn', start: 'top 70%', once: true, onEnter: () => setStep(0) }); let i = 0; setInterval(() => { if (document.hidden) return; i = (i + 1) % 5; setStep(i); }, 4200); }
  setStep(0);
}

// ------------------------------------------------ live: new pump.fun launches
const seenM = new Set(); let lastAt = 0;
async function live() {
  try { const r = await fetch('/api/o?a=trenches&tab=new'); const j = await r.json(); if (!r.ok || j.error) throw new Error(j.error || r.status);
    const C = (j.coins || []).sort((a, b) => Date.parse(b.created || 0) - Date.parse(a.created || 0)).slice(0, 8); lastAt = Date.now();
    $('#lrows').innerHTML = (C.length ? '<div class="lrow lhd"><span></span><span>coin · age</span><span>mcap</span><span>holders</span><span>dev</span></div>' : '') + C.map(c => { const a = c.audit || {}, fresh = seenM.size && !seenM.has(c.mint) ? ' fresh' : ''; const bd = a.devMints > 20 ? `<span class="bd r">serial · ${nf(a.devMints)} coins</span>` : a.devMints != null && a.devMints <= 1 ? '<span class="bd g">first coin</span>' : a.devMints != null ? `<span class="bd">${a.devMints} coins</span>` : '<span class="bd">dev unknown</span>';
      return `<a class="lrow${fresh}" href="#opsec" data-scan="${esc(c.dev || '')}" title="scan this dev">${c.icon ? `<img src="${esc(c.icon)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;ci&quot;>${esc((c.sym || '?')[0])}</span>'">` : `<span class="ci">${esc((c.sym || '?')[0])}</span>`}<span class="nm"><b>${esc(c.name || c.sym || '?')}</b><span>$${esc(c.sym || '?')} · ${age(c.created)}</span></span><span>${usd(c.mcap)}</span><span>${nf(c.holders)}</span>${bd}</a>`; }).join('') || '<p class="muted">waiting for the next launch…</p>';
    C.forEach(c => seenM.add(c.mint)); }
  catch { if (!lastAt) $('#lrows').innerHTML = '<p class="muted">pump.fun data is not answering right now. retrying…</p>'; }
}
setInterval(() => { $('#lts').textContent = lastAt ? 'updated ' + Math.round((Date.now() - lastAt) / 1000) + 's ago' : ''; }, 1000);
let liveOn = false; ScrollTrigger.create({ trigger: '#live', start: 'top 120%', onEnter: () => { if (liveOn) return; liveOn = true; live(); setInterval(() => { if (!document.hidden) live(); }, 8000); } });

// ------------------------------------------------ opsec scan, right on the page
const short = w => w.slice(0, 4) + '…' + w.slice(-4), pad2 = n => String(n).padStart(2, '0');
const getj = async q => { const r = await fetch('/api/o?' + q); const j = await r.json().catch(() => ({ error: 'the scanner sent a bad answer' })); if (!r.ok || (j && j.error)) throw new Error((j && j.error) || 'error ' + r.status); return j; };
const row = (k, cls, html) => { const li = $(`.checks li[data-k="${k}"]`); li.classList.remove('wait', 'ok', 'warn', 'bad', 'na'); li.classList.add(cls); li.querySelector('.a').innerHTML = html; };
let scanId = 0;
function scan(w) {
  const id = ++scanId, live = () => id === scanId, hits = { bad: 0, warn: 0 }, flag = c => { if (c in hits) hits[c]++; };
  $('.rep').classList.add('on'); gsap.set('.checks li', { opacity: 1, y: 0 });
  $$('.checks li').forEach(li => { li.classList.remove('ok', 'warn', 'bad', 'na'); li.classList.add('wait'); li.querySelector('.a').innerHTML = '<i class="ldots"><i></i><i></i><i></i></i>'; });
  const sum = $('#sumr'); sum.className = 'sumr on'; sum.innerHTML = `scanning <b>${short(w)}</b>`;
  const fail = (ks, e) => { if (live()) ks.forEach(k => row(k, 'na', esc(e.message))); };
  const jobs = [
    getj('a=acct&w=' + w).then(a => { if (!live()) return; const N = (a.names && a.names.names) || [];
      if (N.length) { row('names', 'bad', `<b>${N.length} name${N.length > 1 ? 's' : ''}</b> ${N.length > 1 ? 'point' : 'points'} here: ${N.slice(0, 3).map(esc).join(', ')}`); flag('bad'); } else row('names', 'ok', 'no .sol names point here');
      const top = (a.tokens || []).filter(t => t.usd > 1).slice(0, 3).map(t => '$' + esc(t.sym || '?')).join(' · ');
      row('bags', 'na', `<b>${nf(a.sol, 2)} SOL</b> · ${usd(a.usd)} in view${a.tokenCount ? ` · ${nf(a.tokenCount)} tokens` : ''}${top ? ` · top ${top}` : ''}`); }).catch(e => fail(['names', 'bags'], e)),
    getj('a=trace&w=' + w).then(ch => { if (!live()) return; const f = ch[0] || {};
      if (f.busy) return row('funding', 'na', `too much history to trace back (${nf(f.count)}+ transactions)`);
      if (!f.funder) return row('funding', 'ok', 'no incoming SOL found in its first transactions');
      const hops = ch.filter(h => h.funder).length, end = ch[ch.length - 1], cex = !!(end && end.busy);
      row('funding', cex ? 'bad' : 'warn', `first SOL came from <b>${short(f.funder)}</b>${hops > 1 ? ` · traced ${hops} hops back` : ''}${cex ? ' · the trail ends at a very busy wallet, likely an exchange' : ''}`); flag(cex ? 'bad' : 'warn'); }).catch(e => fail(['funding'], e)),
    getj('a=sigs&w=' + w + '&limit=1000').then(S => { if (!live()) return; const T = S.map(s => s.t).filter(Boolean);
      if (T.length < 24) return row('clock', 'na', `only ${T.length} timed transactions, too few to read a clock`);
      const span = (T[0] - T[T.length - 1]) / 3600; if (span < 36) return row('clock', 'na', `all ${T.length} recent transactions fall within ${Math.max(1, Math.round(span))}h, too short to read a clock`);
      const h = Array(24).fill(0); T.forEach(v => h[new Date(v * 1000).getUTCHours()]++); let st = 0, lo = 1e9;
      for (let s = 0; s < 24; s++) { let v = 0; for (let k = 0; k < 6; k++) v += h[(s + k) % 24]; if (v < lo) { lo = v; st = s; } }
      const mx = Math.max(...h), bars = '<span class="clk">' + h.map((v, i) => `<i class="${(i - st + 24) % 24 < 6 ? 'q' : ''}" style="height:${Math.max(6, v / mx * 100)}%"></i>`).join('') + '</span>';
      let off = (4 - (st + 3) % 24 + 24) % 24; if (off > 12) off -= 24;
      if (lo / T.length < .05) { row('clock', 'warn', `goes quiet ${pad2(st)}:00–${pad2((st + 6) % 24)}:00 UTC · reads like UTC${off >= 0 ? '+' : ''}${off}${bars}`); flag('warn'); }
      else row('clock', 'ok', `active around the clock, no clear sleep window${bars}`); }).catch(e => fail(['clock'], e)),
    getj('a=dev&w=' + w).then(dv => { if (!live()) return; const S = dv.sends || [], C = dv.creates || [];
      if (S.length) { row('clusters', 'warn', `pays <b>${S.length} wallet${S.length > 1 ? 's' : ''}</b> directly: ${S.slice(0, 3).map(s => short(s.a) + (s.n > 1 ? ` ×${s.n}` : '')).join(', ')}`); flag('warn'); }
      else row('clusters', 'ok', 'no direct payments to other wallets in its recent history');
      if (C.length) { const bad = C.length > 3; row('trail', bad ? 'bad' : 'warn', `launched <b>${C.length} coin${C.length > 1 ? 's' : ''}</b> recently: ${C.slice(0, 4).map(c => '$' + esc(c.sym || '?')).join(', ')}`); flag(bad ? 'bad' : 'warn'); }
      else row('trail', 'ok', 'no coin launches in its recent history'); }).catch(e => fail(['clusters', 'trail'], e)),
  ];
  Promise.allSettled(jobs).then(() => { if (!live()) return; const n = hits.bad + hits.warn;
    sum.className = 'sumr on ' + (hits.bad ? 'bad' : n ? 'warn' : 'ok');
    sum.innerHTML = n ? `<b>${n} thing${n > 1 ? 's' : ''}</b> ${n > 1 ? 'point' : 'points'} back to ${short(w)}` : `nothing obvious points back to <b>${short(w)}</b>`; });
}
$('#scanF').addEventListener('submit', e => { e.preventDefault(); const v = $('#scanI').value.trim();
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v)) { $('#scanI').value = ''; $('#scanI').placeholder = 'that is not a Solana address'; return; }
  $('#scanI').blur(); scan(v); if (innerWidth <= 860) setTimeout(() => lenis ? lenis.scrollTo('.rep', { offset: -90 }) : $('.rep').scrollIntoView({ behavior: 'smooth' }), 50); });
$('#lrows').addEventListener('click', e => { const a = e.target.closest('[data-scan]'); if (!a || !a.dataset.scan) return; e.preventDefault(); $('#scanI').value = a.dataset.scan; go('opsec'); scan(a.dataset.scan); });

// ------------------------------------------------ faq: smooth open
$$('.faq details').forEach(d => { const s = d.querySelector('summary'), p = d.querySelector('p'); s.addEventListener('click', e => { if (reduced) return; e.preventDefault(); if (d.open) { gsap.to(p, { height: 0, opacity: 0, duration: .35, ease: 'power2.inOut', onComplete: () => { d.open = false; gsap.set(p, { clearProps: 'all' }); } }); } else { d.open = true; gsap.from(p, { height: 0, opacity: 0, duration: .45, ease: 'expo.out', clearProps: 'all' }); } }); });

// ------------------------------------------------ start
duel(); howPin(); panels(); ctaStreams();
intro(f => { motion(f); ScrollTrigger.refresh(); });
})();
