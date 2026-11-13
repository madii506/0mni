// 0mni data relay: wallet scan + live trenches. The browser only ever talks to this site.
const OK = new Set(['acct', 'sigs', 'trace', 'dev', 'trenches']);
const UP = 'https://pr1v.vercel.app/api/pr1v?';
module.exports = async (req, res) => {
  const u = new URL(req.url, 'http://x'), a = u.searchParams.get('a');
  res.setHeader('content-type', 'application/json; charset=utf-8');
  if (!OK.has(a)) { res.statusCode = 404; return res.end(JSON.stringify({ error: 'unknown action' })); }
  const w = u.searchParams.get('w');
  if (a !== 'trenches' && !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(w || '')) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'that is not a Solana address' })); }
  const qs = new URLSearchParams({ a }); for (const k of ['w', 'tab', 'limit', 'hops']) { const v = u.searchParams.get(k); if (v) qs.set(k, v); }
  try {
    const r = await fetch(UP + qs, { headers: { 'user-agent': '0mni' }, signal: AbortSignal.timeout(28000) });
    const t = await r.text(); res.statusCode = r.status;
    res.setHeader('cache-control', a === 'trenches' ? 'public, s-maxage=3, stale-while-revalidate=12' : 'public, s-maxage=60'); res.end(t);
  } catch (e) { res.statusCode = 502; res.end(JSON.stringify({ error: 'the scanner did not answer. try again in a moment' })); }
};
