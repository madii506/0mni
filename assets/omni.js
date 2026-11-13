/* 0mni site */
(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nf = (n, d = 0) => n == null || isNaN(n) ? '—' : (+n).toLocaleString('en-US', { maximumFractionDigits: d });
const usd = v => v == null || isNaN(v) ? '—' : '$' + (v >= 1e6 ? nf(v / 1e6, 2) + 'M' : v >= 1e4 ? nf(v / 1e3, 1) + 'K' : nf(v, 0));
const age = iso => { if (!iso) return '—'; const s = (Date.now() - Date.parse(iso)) / 1000; return s < 60 ? Math.max(1, Math.round(s)) + 's' : s < 3600 ? Math.round(s / 60) + 'm' : Math.round(s / 3600) + 'h'; };
gsap.registerPlugin(ScrollTrigger);

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

// ------------------------------------------------ intro: three chains become one
function intro(done) {
  const seen = (() => { try { return sessionStorage.getItem('0mni') === '1'; } catch { return false; } })();
  const el = $('#intro'); if (reduced || seen) { el.remove(); return done(); }
  const c = $('#ic'), x = c.getContext('2d'), d = Math.min(2, devicePixelRatio || 1); let W, H; const size = () => { W = innerWidth; H = innerHeight; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0); }; size();
  const img = new Image(); img.src = '/icon.png'; const cols = ['#9945ff', '#f0b90b', '#b8e600'];
  const from = () => [[-.1 * W, .15 * H], [.5 * W, 1.12 * H], [1.1 * W, .2 * H]]; let t0 = performance.now(), fin = false;
  const end = () => { if (fin) return; fin = true; try { sessionStorage.setItem('0mni', '1'); } catch { } gsap.to(el, { opacity: 0, duration: .6, ease: 'power2.out', onComplete: () => el.remove() }); done(); };
  el.addEventListener('pointerdown', end); addEventListener('keydown', end, { once: true });
  (function f(now) { if (fin) return; const t = (now - t0) / 1000; x.clearRect(0, 0, W, H); const cx = W / 2, cy = H / 2, F = from();
    F.forEach(([sx, sy], i) => { const k = Math.min(1, Math.max(0, (t - i * .12) / 1.1)), e = 1 - Math.pow(1 - k, 3), ex = sx + (cx - sx) * e, ey = sy + (cy - sy) * e;
      x.strokeStyle = cols[i]; x.lineWidth = 3; x.lineCap = 'round'; x.globalAlpha = 1 - Math.max(0, (t - 1.45) / .3); x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.stroke();
      x.fillStyle = cols[i]; x.beginPath(); x.arc(ex, ey, 6, 0, 7); x.fill(); });
    x.globalAlpha = 1;
    if (t > 1.3) { const k = Math.min(1, (t - 1.3) / .45), s = 96 * (0.6 + 0.4 * (1 - Math.pow(1 - k, 3))); x.globalAlpha = k; x.imageSmoothingEnabled = false; if (img.complete) x.drawImage(img, cx - s / 2, cy - s / 2, s, s);
      x.globalAlpha = Math.max(0, 1 - (t - 1.3) / .5); x.strokeStyle = '#141418'; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, 40 + (t - 1.3) * 300, 0, 7); x.stroke(); x.globalAlpha = 1; }
    if (t > 2.25) return end(); requestAnimationFrame(f); })(t0);
}

// ------------------------------------------------ reveals, magnetic buttons, tilt
function motion() {
  gsap.from('.hero h1 .wd > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .07, delay: .05 });
  ScrollTrigger.batch('.rv', { start: 'top 88%', once: true, onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: .08 }) });
  $$('.split').forEach(h => { if (h.closest('.hero')) return; gsap.from(h.querySelectorAll('.wd > span'), { yPercent: 110, duration: 1, ease: 'expo.out', stagger: .05, scrollTrigger: { trigger: h, start: 'top 85%', once: true } }); });
  gsap.to('.router', { yPercent: -8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.code-bg', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('#rlFill', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '#road', start: 'top 80%', end: 'bottom 60%', scrub: true } });
  if (fine && !reduced) {
    $$('.mag').forEach(b => { b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .4, ease: 'power3.out' }); }); b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' })); });
    $$('.tilt').forEach(c => { c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; gsap.to(c, { rotateY: px * 7, rotateX: -py * 7, y: -4, transformPerspective: 900, duration: .5, ease: 'power3.out' }); }); c.addEventListener('pointerleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, y: 0, duration: .8, ease: 'expo.out' })); });
    const art = $('#art'); addEventListener('pointermove', e => { const px = e.clientX / innerWidth - .5, py = e.clientY / innerHeight - .5; gsap.to(art, { x: px * 18, y: py * 14, rotate: px * 2, duration: 1.2, ease: 'power3.out' }); });
  }
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

// ------------------------------------------------ live: new pump.fun launches through pr1v
const seenM = new Set(); let lastAt = 0;
async function live() {
  try { const r = await fetch('https://pr1v.vercel.app/api/pr1v?a=trenches&tab=new'); const j = await r.json(); if (!r.ok || j.error) throw new Error(j.error || r.status);
    const C = (j.coins || []).sort((a, b) => Date.parse(b.created || 0) - Date.parse(a.created || 0)).slice(0, 8); lastAt = Date.now();
    $('#lrows').innerHTML = (C.length ? '<div class="lrow lhd"><span></span><span>coin · age</span><span>mcap</span><span>holders</span><span>dev</span></div>' : '') + C.map(c => { const a = c.audit || {}, fresh = seenM.size && !seenM.has(c.mint) ? ' fresh' : ''; const bd = a.devMints > 20 ? `<span class="bd r">serial · ${nf(a.devMints)} coins</span>` : a.devMints != null && a.devMints <= 1 ? '<span class="bd g">first coin</span>' : a.devMints != null ? `<span class="bd">${a.devMints} coins</span>` : '<span class="bd">dev unknown</span>';
      return `<a class="lrow${fresh}" href="https://pr1v.vercel.app/?w=${esc(c.dev || '')}" target="_blank" rel="noopener" title="open the dev in pr1v">${c.icon ? `<img src="${esc(c.icon)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.outerHTML='<span class=&quot;ci&quot;>${esc((c.sym || '?')[0])}</span>'">` : `<span class="ci">${esc((c.sym || '?')[0])}</span>`}<span class="nm"><b>${esc(c.name || c.sym || '?')}</b><span>$${esc(c.sym || '?')} · ${age(c.created)}</span></span><span>${usd(c.mcap)}</span><span>${nf(c.holders)}</span>${bd}</a>`; }).join('') || '<p class="muted">waiting for the next launch…</p>';
    C.forEach(c => seenM.add(c.mint)); }
  catch { if (!lastAt) $('#lrows').innerHTML = '<p class="muted">pump.fun data is not answering right now. retrying…</p>'; }
}
setInterval(() => { $('#lts').textContent = lastAt ? 'updated ' + Math.round((Date.now() - lastAt) / 1000) + 's ago' : ''; }, 1000);
let liveOn = false; ScrollTrigger.create({ trigger: '#live', start: 'top 120%', onEnter: () => { if (liveOn) return; liveOn = true; live(); setInterval(() => { if (!document.hidden) live(); }, 8000); } });

// ------------------------------------------------ scan box: opens pr1v with the wallet
$('#scanF').addEventListener('submit', e => { e.preventDefault(); const v = $('#scanI').value.trim(); if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v)) { $('#scanI').value = ''; $('#scanI').placeholder = 'that is not a Solana address'; return; } open('https://pr1v.vercel.app/?w=' + v, '_blank', 'noopener'); });

// ------------------------------------------------ faq: smooth open
$$('.faq details').forEach(d => { const s = d.querySelector('summary'), p = d.querySelector('p'); s.addEventListener('click', e => { if (reduced) return; e.preventDefault(); if (d.open) { gsap.to(p, { height: 0, opacity: 0, duration: .35, ease: 'power2.inOut', onComplete: () => { d.open = false; gsap.set(p, { clearProps: 'all' }); } }); } else { d.open = true; gsap.from(p, { height: 0, opacity: 0, duration: .45, ease: 'expo.out', clearProps: 'all' }); } }); });

// ------------------------------------------------ start
intro(() => { motion(); howPin(); ScrollTrigger.refresh(); });
})();
