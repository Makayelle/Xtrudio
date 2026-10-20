#!/usr/bin/env node
"use strict";
// ══════════════════════════════════════════════════════
// Xtrudio — vérification complète avant une pull request
//
//   node tests/check.js            → tout (statique + navigateur + PDF d'impression)
//   node tests/check.js --static   → seulement les contrôles sans navigateur
//   node tests/check.js --base REF → compare le catalogue et la version à REF (défaut : origin/main)
//
// Aucune dépendance npm dans le projet : Playwright est cherché dans l'installation
// globale (npm root -g). Captures et PDF sont écrits dans tests/out/ (ignoré par git).
// Code de sortie : 0 si tout est OK, 1 sinon.
// ══════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const { execSync, execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'out');
const args = process.argv.slice(2);
const STATIC_ONLY = args.includes('--static');
const BASE = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/main';

let failed = 0;
const ok = (msg) => console.log('  ✓ ' + msg);
const ko = (msg) => { failed++; console.log('  ✗ ' + msg); };
const info = (msg) => console.log('  · ' + msg);
const check = (cond, good, bad) => (cond ? ok(good) : ko(bad || good));
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const gitShow = (ref, f) => { try { return execFileSync('git', ['show', `${ref}:${f}`], { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); } catch (e) { return null; } };

function loadCatalog(src) {
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(src + ';this.R={CATALOG,STORE,SUBTYPE_INFO,CATALOG_UPDATED};', ctx);
  return ctx.R;
}
// Même règle que skey() dans app.js
const stockKey = (mat, sub, name) => `q_${mat}_${sub}_${name}`.replace(/\s+/g, '_');

// ─── 1. Syntaxe JavaScript ─────────────────────────────
function checkSyntax() {
  console.log('\n1. Syntaxe JavaScript');
  for (const f of ['app.js', 'catalog.js', 'service-worker.js', 'tests/check.js']) {
    try { execFileSync(process.execPath, ['--check', path.join(ROOT, f)], { stdio: 'pipe' }); ok(f); }
    catch (e) { ko(`${f} : ${e.stderr.toString().trim().split('\n').slice(0, 3).join(' ')}`); }
  }
}

// ─── 2. Version identique partout (règle 2) ────────────
function versionOf(html, sw, md) {
  return {
    html: [...html.matchAll(/(style\.css|catalog\.js|app\.js)\?v=(\d+)/g)].map(m => +m[2]),
    sw: [...sw.matchAll(/\?v=(\d+)/g)].map(m => +m[1]).concat([+(sw.match(/xtrudio-cache-v(\d+)/) || [])[1]]),
    md: +(md.match(/Version actuelle : \*\*(\d+)\*\*/) || [])[1],
  };
}
function checkVersion() {
  console.log('\n2. Version');
  const v = versionOf(read('index.html'), read('service-worker.js'), read('CLAUDE.md'));
  const all = [...v.html, ...v.sw, v.md];
  const n = v.html[0];
  check(v.html.length === 3 && v.sw.length === 4 && all.every(x => x === n),
    `version ${n} identique dans index.html, service-worker.js et CLAUDE.md`,
    `versions incohérentes : index.html ${v.html} · service-worker.js ${v.sw} · CLAUDE.md ${v.md}`);
  const baseHtml = gitShow(BASE, 'index.html');
  if (baseHtml) {
    const b = versionOf(baseHtml, '', '').html[0];
    let changed = false;
    try { changed = execSync(`git diff --quiet ${BASE} -- index.html style.css app.js catalog.js service-worker.js manifest.json icons || echo y`, { cwd: ROOT }).toString().trim() === 'y'; } catch (e) {}
    if (changed) check(n > b, `version montée par rapport à ${BASE} (${b} → ${n})`, `fichiers de l'app modifiés mais version non montée (${BASE} : ${b}, actuelle : ${n})`);
    else info(`aucun fichier de l'app modifié par rapport à ${BASE} (version ${n})`);
  } else info(`${BASE} introuvable : comparaison de version ignorée`);
  const log = fs.existsSync(path.join(ROOT, 'CHANGELOG.md')) ? read('CHANGELOG.md') : '';
  check(new RegExp(`^## v${n} — `, 'm').test(log), `CHANGELOG.md : entrée « ## v${n} » présente`,
    `CHANGELOG.md : entrée « ## v${n} — JJ/MM/AAAA · titre » manquante`);
  return n;
}

// ─── 3. Catalogue (règles 1 et 3) ──────────────────────
function checkCatalog() {
  console.log('\n3. Catalogue');
  const cur = loadCatalog(read('catalog.js'));
  let nSub = 0, nCol = 0, errors = 0;
  const keys = new Set(), subs = new Set();
  const err = (m) => { if (errors++ < 15) ko(m); else failed++; };
  for (const m of cur.CATALOG) for (const s of m.subtypes) {
    nSub++;
    if (subs.has(s.name)) err(`type en double : ${s.name}`); subs.add(s.name);
    if (!cur.STORE[s.name]) err(`lien STORE manquant : ${s.name}`);
    const fi = cur.SUBTYPE_INFO[s.name];
    if (!fi || !fi.usages || !fi.pros || !fi.cons) err(`fiche SUBTYPE_INFO manquante ou incomplète : ${s.name}`);
    const names = new Set();
    for (const c of s.colors) {
      nCol++;
      if (names.has(c.n)) err(`couleur en double : ${s.name} / ${c.n}`); names.add(c.n);
      if (!/^#[0-9a-fA-F]{6}$/.test(c.hex)) err(`hex invalide : ${s.name} / ${c.n} (${c.hex})`);
      if (c.f && !/^(t|metallic|[gm]:#[0-9a-fA-F]{6}(,#[0-9a-fA-F]{6})+)$/.test(c.f)) err(`finition f invalide : ${s.name} / ${c.n} (${c.f})`);
      const k = stockKey(m.mat, s.name, c.n);
      if (keys.has(k)) err(`clé de stock en collision : ${k}`); keys.add(k);
    }
  }
  if (!errors) ok(`${cur.CATALOG.length} matières, ${nSub} types, ${nCol} couleurs : liens, fiches, hex et clés valides`);
  check(/^\d{4}-\d{2}-\d{2}$/.test(cur.CATALOG_UPDATED), `CATALOG_UPDATED = ${cur.CATALOG_UPDATED}`);

  const baseSrc = gitShow(BASE, 'catalog.js');
  if (!baseSrc) { info(`${BASE} introuvable : comparaison du catalogue ignorée`); return; }
  const base = loadCatalog(baseSrc);
  let lost = 0;
  for (const m of base.CATALOG) {
    const nm = cur.CATALOG.find(x => x.mat === m.mat);
    if (!nm) { lost++; ko(`matière supprimée ou renommée : ${m.mat}`); continue; }
    for (const s of m.subtypes) {
      const ns = nm.subtypes.find(x => x.name === s.name);
      if (!ns) { lost++; ko(`type supprimé ou renommé : ${s.name}`); continue; }
      for (const c of s.colors) {
        const nc = ns.colors.find(x => x.n === c.n);
        if (!nc) { lost++; ko(`couleur supprimée ou renommée : ${s.name} / ${c.n}`); }
        else if (nc.hex !== c.hex || (nc.f || '') !== (c.f || '')) { lost++; ko(`couleur modifiée : ${s.name} / ${c.n}`); }
      }
    }
  }
  if (!lost) ok(`toutes les entrées de ${BASE} sont intactes (mêmes noms, hex et finitions)`);
  const changedLinks = Object.keys(base.STORE).filter(k => base.STORE[k] !== cur.STORE[k]);
  if (changedLinks.length) info(`liens STORE modifiés : ${changedLinks.join(', ')}`);
}

// ─── 4. Navigateur (390 × 844) ─────────────────────────
function findPlaywright() {
  const tries = ['playwright'];
  try { tries.push(path.join(execSync('npm root -g', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim(), 'playwright')); } catch (e) {}
  for (const t of tries) { try { return require(t); } catch (e) {} }
  return null;
}
function findChromium() {
  const p = '/opt/pw-browsers/chromium';
  return fs.existsSync(p) ? p : undefined;
}

function startServer() {
  const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const f = path.join(ROOT, p);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r(srv)));
}

// Données « existantes » : anciens réglages (avant filVersion 6) + stock + code-barres
const OLD_SETTINGS = {
  kwh: 0.25,
  filaments: [
    { id: 'pla-basic', name: 'PLA Basic', price: 9.99, watts: 210, abrasive: false },
    { id: 'custom', name: 'Mon fil', price: 30, watts: 250, abrasive: true },
  ],
  printers: [{ id: 'h2s', name: 'Ma H2S', machCost: 1800, amortYears: 3, hPerYear: 1000, maintCost: 10, nozzleCost: 16, nozzleLife: 400, nozzleLifeAbr: 80, plateCost: 40, plateLife: 700, filterCost: 25, filterLife: 1000 }],
  sim: { mass: 50, h: 2, min: 5, filId: 'custom', prnId: 'h2s' },
};
const SEED = {
  q_PLA_PLA_Basic_Jade_White: '3',
  q_PETG_PETG_HF_Black: '1',
  spool_count: '4',
  barcodeMap: JSON.stringify({ '123456': { mat: 'PLA', sub: 'PLA Basic', name: 'Jade White' } }),
  xtrudio_settings_v1: JSON.stringify(OLD_SETTINGS),
};

async function checkBrowser() {
  console.log('\n4. Navigateur (390 × 844)');
  const pw = findPlaywright();
  if (!pw) { ko('Playwright introuvable (ni local ni global) : tests navigateur impossibles'); return; }
  fs.mkdirSync(OUT, { recursive: true });
  const srv = await startServer();
  const url = `http://127.0.0.1:${srv.address().port}/`;
  const browser = await pw.chromium.launch({ executablePath: findChromium() });
  try {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    // Polices Google : bloquées hors ligne, sans incidence sur les tests
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|ERR_FAILED|net::/.test(m.text())) errs.push(m.text()); });

    await page.goto(url);
    await page.evaluate(s => { localStorage.clear(); for (const k in s) localStorage.setItem(k, s[k]); }, SEED);
    await page.reload(); await page.waitForTimeout(500);

    const widthOk = () => page.evaluate(() => document.documentElement.scrollWidth === innerWidth);
    for (const v of ['stock', 'sim', 'settings']) {
      await page.click(`.bottom-nav button[data-view=${v}]`); await page.waitForTimeout(250);
      if (v === 'settings') await page.evaluate(() => document.querySelectorAll('#view-settings details').forEach(d => (d.open = true)));
      const r = await page.evaluate(() => ({
        shown: !!document.querySelector('.view.active') && getComputedStyle(document.querySelector('.view.active')).display !== 'none',
        print: !document.getElementById('btn-print').hidden,
      }));
      check(r.shown && await widthOk() && r.print === (v === 'stock'),
        `onglet ${v} : affiché, sans débordement, bouton 🖨️ ${v === 'stock' ? 'visible' : 'masqué'}`);
      await page.screenshot({ path: path.join(OUT, `${v}.png`) });
    }

    await page.click('.bottom-nav button[data-view=stock]');
    await page.click('[data-sview=swatch]'); await page.waitForTimeout(200);
    check(await widthOk(), 'nuancier sans débordement');
    await page.screenshot({ path: path.join(OUT, 'swatch.png') });
    await page.click('[data-sview=list]');
    await page.click('.grp-info'); await page.waitForTimeout(200);
    check(await page.evaluate(() => !document.getElementById('info-sheet').hidden), 'fiche info du type s\'ouvre');
    await page.keyboard.press('Escape');

    // Association d'un code inconnu : couleurs triées, quantité comptée sur la bonne couleur
    await page.evaluate(() => { openScan('in'); pendingCode = 'TEST-999'; showAssign('TEST-999'); });
    await page.selectOption('#assign-mat', '0'); await page.selectOption('#assign-sub', '0');
    const opts = await page.$$eval('#assign-color option', o => o.slice(1).map(x => x.textContent));
    const sorted = [...opts].sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
    check(JSON.stringify(opts) === JSON.stringify(sorted), `scan : ${opts.length} couleurs triées par ordre alphabétique`);
    await page.selectOption('#assign-color', { label: 'Black' });
    await page.click('[data-act=confirm-assign]');
    const scan = await page.evaluate(() => [localStorage.getItem('q_PLA_PLA_Basic_Black'), JSON.parse(localStorage.getItem('barcodeMap'))['TEST-999']]);
    check(scan[0] === '1' && scan[1] && scan[1].name === 'Black', 'scan : association enregistrée et bobine comptée');
    await page.evaluate(() => closeScan());

    // Données existantes conservées + migration des filaments
    const d = await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem('xtrudio_settings_v1'));
      return {
        jw: localStorage.getItem('q_PLA_PLA_Basic_Jade_White'), hf: localStorage.getItem('q_PETG_PETG_HF_Black'),
        spool: localStorage.getItem('spool_count'), bc: JSON.parse(localStorage.getItem('barcodeMap'))['123456'],
        kwh: s.kwh, pla: s.filaments.find(f => f.id === 'pla-basic').price, custom: !!s.filaments.find(f => f.id === 'custom'),
        nFil: s.filaments.length, filVersion: s.filVersion, prn: s.printers[0].name, filId: s.sim.filId,
      };
    });
    check(d.jw === '3' && d.hf === '1' && d.spool === '4' && d.bc && d.bc.name === 'Jade White', 'stock, bobines réutilisables et codes-barres conservés');
    check(d.kwh === 0.25 && d.pla === 9.99 && d.custom && d.prn === 'Ma H2S' && d.filId === 'custom', 'réglages de l\'utilisateur conservés (kWh, prix, filament perso, imprimante, simulation)');
    info(`migration : ${d.nFil} filaments, filVersion ${d.filVersion}`);

    check(!errs.length, 'aucune erreur dans la console', `erreurs console : ${errs.slice(0, 5).join(' | ')}`);

    // PDF d'impression A4 (nuancier + liste) avec un stock réaliste
    await page.evaluate(() => {
      let i = 0;
      CATALOG.forEach(m => m.subtypes.forEach(s => s.colors.forEach(c => { if (i++ % 3 === 0) setQty(m.mat, s.name, c.n, 1 + i % 4); })));
      ui.vis = 'in'; ui.mat = 'all';
      document.getElementById('print-meta').textContent = 'État du stock (test) — références en stock, toutes matières';
    });
    await page.emulateMedia({ media: 'print' });
    for (const sv of ['swatch', 'list']) {
      await page.evaluate(sv => { ui.sview = sv; renderStock(); }, sv);
      const cut = await page.evaluate(() => [...document.querySelectorAll('.sw,.frow')].filter(e => {
        const st = getComputedStyle(e); return st.breakInside !== 'avoid' && st.pageBreakInside !== 'avoid';
      }).length);
      const f = path.join(OUT, `print-${sv}.pdf`);
      await page.pdf({ path: f, preferCSSPageSize: true, printBackground: true });
      const pages = (fs.readFileSync(f, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
      check(cut === 0, `impression ${sv} : ${pages} page(s) A4, aucun élément coupable entre deux pages (tests/out/print-${sv}.pdf)`,
        `impression ${sv} : ${cut} élément(s) sans protection contre la coupure de page`);
    }
    await page.emulateMedia({ media: 'screen' });
    info('captures et PDF dans tests/out/');
  } finally {
    await browser.close(); srv.close();
  }
}

(async () => {
  console.log('Xtrudio — vérifications' + (STATIC_ONLY ? ' (statiques)' : ''));
  checkSyntax();
  checkVersion();
  checkCatalog();
  if (!STATIC_ONLY) await checkBrowser().catch(e => ko('erreur pendant les tests navigateur : ' + e.message));
  console.log(failed ? `\n✗ ${failed} problème(s)` : '\n✓ Tout est OK');
  process.exit(failed ? 1 : 0);
})();
