"use strict";
// ══════════════════════════════════════════════════════
// Xtrudio — logique de l'app
// Données : CATALOG / STORE / CATALOG_UPDATED viennent de catalog.js
// ══════════════════════════════════════════════════════

// ─── Utilitaires ───────────────────────────────────────
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone = (o) => JSON.parse(JSON.stringify(o));
const uid = () => Math.random().toString(36).slice(2, 9);
const eur = (v, d = 2) => (isFinite(v) ? v : 0).toFixed(d).replace('.', ',') + ' €';
const num = (v) => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; };

function lsGet(k, def) { try { const v = localStorage.getItem(k); return v === null ? def : v; } catch (e) { return def; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

// ─── Réglages (persistés) ──────────────────────────────
const SETTINGS_KEY = 'xtrudio_settings_v1';
const UI_KEY = 'xtrudio_ui_v1';

const DEFAULT_PRINTER = {
  name: 'Bambu Lab H2S + AMS 2 Pro',
  machCost: 1500, amortYears: 3, hPerYear: 1000, maintCost: 10,
  nozzleCost: 16, nozzleLife: 400, nozzleLifeAbr: 80,
  plateCost: 40, plateLife: 700,
  filterCost: 25, filterLife: 1000,
};

const DEFAULT_SETTINGS = {
  kwh: 0.194,
  filaments: [
    { id: 'pla-basic',  name: 'PLA Basic',          price: 12, watts: 220, abrasive: false },
    { id: 'pla-matte',  name: 'PLA Matte',          price: 12, watts: 200, abrasive: false },
    { id: 'pla-hf',     name: 'PLA HF',             price: 13, watts: 220, abrasive: false },
    { id: 'pla-silk',   name: 'PLA Silk / Sparkle', price: 16, watts: 220, abrasive: false },
    { id: 'pla-cf',     name: 'PLA-CF',             price: 22, watts: 220, abrasive: true  },
    { id: 'petg-basic', name: 'PETG Basic',         price: 13, watts: 200, abrasive: false },
    { id: 'petg-hf',    name: 'PETG HF',            price: 14, watts: 200, abrasive: false },
    { id: 'petg-cf',    name: 'PETG-CF',            price: 25, watts: 220, abrasive: true  },
    { id: 'asa',        name: 'ASA',                price: 18, watts: 280, abrasive: false },
    { id: 'tpu',        name: 'TPU',                price: 25, watts: 200, abrasive: false },
  ],
  printers: [ Object.assign({ id: 'h2s' }, DEFAULT_PRINTER) ],
  sim: { mass: 32, h: 1, min: 20, filId: 'pla-basic', prnId: 'h2s' },
};

// Filaments ajoutés en v6 : prix public du store Bambu Lab EU (bobine à l'unité, ramené au kg),
// consommation estimée pour H2S + AMS selon les températures du matériau.
const EXTRA_FILAMENTS_V6 = [
  { id: 'pla-lite',        name: 'PLA Lite',             price: 20,  watts: 220, abrasive: false },
  { id: 'pla-silkplus',    name: 'PLA Silk+',            price: 26,  watts: 220, abrasive: false },
  { id: 'pla-tough',       name: 'PLA Tough',            price: 25,  watts: 220, abrasive: false },
  { id: 'pla-toughplus',   name: 'PLA Tough+',           price: 27,  watts: 220, abrasive: false },
  { id: 'pla-translucent', name: 'PLA Translucent',      price: 28,  watts: 220, abrasive: false },
  { id: 'pla-metal',       name: 'PLA Metal',            price: 28,  watts: 220, abrasive: false },
  { id: 'pla-marble',      name: 'PLA Marble',           price: 28,  watts: 220, abrasive: false },
  { id: 'pla-galaxy',      name: 'PLA Galaxy',           price: 28,  watts: 220, abrasive: false },
  { id: 'pla-wood',        name: 'PLA Wood',             price: 28,  watts: 220, abrasive: false },
  { id: 'pla-glow',        name: 'PLA Glow',             price: 28,  watts: 220, abrasive: true  },
  { id: 'pla-pure',        name: 'PLA Pure',             price: 23,  watts: 220, abrasive: false },
  { id: 'pla-dynamic',     name: 'PLA Dynamic',          price: 28,  watts: 220, abrasive: false },
  { id: 'pla-aero',        name: 'PLA Aero',             price: 48,  watts: 220, abrasive: false },
  { id: 'petg-matte',      name: 'PETG Matte',           price: 23,  watts: 200, abrasive: false },
  { id: 'petg-translucent',name: 'PETG Translucent',     price: 23,  watts: 200, abrasive: false },
  { id: 'asa-aero',        name: 'ASA Aero',             price: 50,  watts: 280, abrasive: false },
  { id: 'asa-cf',          name: 'ASA-CF',               price: 39,  watts: 280, abrasive: true  },
  { id: 'tpu-95a-hf',      name: 'TPU 95A HF',           price: 35,  watts: 200, abrasive: false },
  { id: 'tpu-95a',         name: 'TPU 95A',              price: 35,  watts: 200, abrasive: false },
  { id: 'tpu-90a',         name: 'TPU 90A',              price: 44,  watts: 200, abrasive: false },
  { id: 'tpu-85a',         name: 'TPU 85A',              price: 44,  watts: 200, abrasive: false },
  { id: 'tpu-ams',         name: 'TPU for AMS',          price: 40,  watts: 200, abrasive: false },
  { id: 'abs',             name: 'ABS',                  price: 23,  watts: 280, abrasive: false },
  { id: 'abs-gf',          name: 'ABS-GF',               price: 32,  watts: 280, abrasive: true  },
  { id: 'pc',              name: 'PC',                   price: 43,  watts: 330, abrasive: false },
  { id: 'pc-fr',           name: 'PC FR',                price: 57,  watts: 330, abrasive: false },
  { id: 'pa6-cf',          name: 'PA6-CF',               price: 90,  watts: 330, abrasive: true  },
  { id: 'pa6-gf',          name: 'PA6-GF',               price: 63,  watts: 330, abrasive: true  },
  { id: 'paht-cf',         name: 'PAHT-CF',              price: 108, watts: 330, abrasive: true  },
  { id: 'pet-cf',          name: 'PET-CF',               price: 98,  watts: 300, abrasive: true  },
  { id: 'ppa-cf',          name: 'PPA-CF',               price: 208, watts: 350, abrasive: true  },
  { id: 'pps-cf',          name: 'PPS-CF',               price: 179, watts: 350, abrasive: true  },
  { id: 'pva',             name: 'PVA (support soluble)', price: 84, watts: 220, abrasive: false },
  { id: 'sup-pla',         name: 'Support for PLA',      price: 52,  watts: 220, abrasive: false },
  { id: 'sup-pla-petg',    name: 'Support for PLA/PETG', price: 74,  watts: 210, abrasive: false },
  { id: 'sup-abs',         name: 'Support for ABS',      price: 34,  watts: 280, abrasive: false },
  { id: 'sup-pa-pet',      name: 'Support for PA/PET',   price: 84,  watts: 330, abrasive: false },
];
DEFAULT_SETTINGS.filaments.push(...EXTRA_FILAMENTS_V6.map(f => Object.assign({}, f)));
DEFAULT_SETTINGS.filVersion = 6;

function loadSettings() {
  try {
    const raw = JSON.parse(lsGet(SETTINGS_KEY, 'null'));
    if (raw && Array.isArray(raw.filaments) && Array.isArray(raw.printers)) {
      const s = Object.assign(clone(DEFAULT_SETTINGS), raw);
      s.sim = Object.assign(clone(DEFAULT_SETTINGS.sim), raw.sim || {});
      if (!(raw.filVersion >= 6)) {
        // Ajout des nouveaux types sans toucher aux filaments déjà réglés par l'utilisateur
        s.filaments = raw.filaments.slice();
        EXTRA_FILAMENTS_V6.forEach(f => { if (!s.filaments.some(x => x.id === f.id)) s.filaments.push(Object.assign({}, f)); });
        s.filVersion = 6;
        lsSet(SETTINGS_KEY, JSON.stringify(s));
      }
      return s;
    }
  } catch (e) {}
  return clone(DEFAULT_SETTINGS);
}
let S = loadSettings();
function saveSettings() { lsSet(SETTINGS_KEY, JSON.stringify(S)); }

// ─── Stock (clés conservées depuis la v1 pour garder les données) ──
function skey(mat, sub, name) { return `q_${mat}_${sub}_${name}`.replace(/\s+/g, '_'); }
function getQty(mat, sub, name) { return parseInt(lsGet(skey(mat, sub, name), '0')) || 0; }
function setQty(mat, sub, name, v) { lsSet(skey(mat, sub, name), Math.max(0, v)); }
function getReuse() { return parseInt(lsGet('spool_count', '0')) || 0; }
function setReuse(v) { lsSet('spool_count', Math.max(0, v)); }
function getBarcodeMap() { try { return JSON.parse(lsGet('barcodeMap', '{}')) || {}; } catch (e) { return {}; } }
function saveBarcodeMap(m) { lsSet('barcodeMap', JSON.stringify(m)); }

const ui = Object.assign({ view: 'stock', mat: 'all', vis: 'all', sview: 'list' }, (() => {
  try { return JSON.parse(lsGet(UI_KEY, '{}')) || {}; } catch (e) { return {}; }
})());
function saveUi() { lsSet(UI_KEY, JSON.stringify({ view: ui.view, mat: ui.mat, vis: ui.vis, sview: ui.sview })); }

function dotStyle(hex, finish) {
  const white = ['#FFFFFF', '#F0F0F0', '#E8E8E8', '#EEEEEE', '#FFFFEE', '#F7F3F0', '#F9F7F4'].includes(hex.toUpperCase());
  const ring = `border:2px solid rgba(${white ? '0,0,0,.15' : '255,255,255,.12'});`;
  const f = finish || '';
  // Dégradé (g:) ou multicolore à segments nets (m:)
  if (f.startsWith('g:')) return `background:linear-gradient(135deg,${f.slice(2)});${ring}`;
  if (f.startsWith('m:')) {
    const cols = f.slice(2).split(','), step = 100 / cols.length;
    return `background:conic-gradient(${cols.map((c, i) => `${c} ${i * step}% ${(i + 1) * step}%`).join(',')});${ring}`;
  }
  // Translucide : damier teinté par la couleur
  if (f === 't') return `background:linear-gradient(${hex}b0,${hex}b0),linear-gradient(45deg,#666 25%,transparent 25%,transparent 75%,#666 75%),linear-gradient(45deg,#666 25%,#333 25%,#333 75%,#666 75%);background-size:auto,8px 8px,8px 8px;background-position:0 0,0 0,4px 4px;border:2px solid rgba(255,255,255,.2);`;
  if (f === 'metallic') return `background:linear-gradient(135deg,${hex}dd,${hex}88,${hex}dd);border:2px solid rgba(255,255,255,.3);`;
  return `background:${hex};${ring}`;
}

// ══════════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════════
const VIEW_TITLES = { stock: 'Stock', sim: 'Simulateur', settings: 'Réglages' };

function switchView(v) {
  if (!VIEW_TITLES[v]) v = 'stock';
  ui.view = v; saveUi();
  $$('.view').forEach(x => x.classList.toggle('active', x.id === 'view-' + v));
  $$('.bottom-nav button').forEach(b => b.classList.toggle('active', b.dataset.view === v));
  $('#btn-print').hidden = v !== 'stock';
  if (v === 'stock') renderStock();
  if (v === 'sim') renderSim();
  if (v === 'settings') renderSettings();
  window.scrollTo({ top: 0 });
}

$('.bottom-nav').addEventListener('click', e => {
  const b = e.target.closest('button[data-view]');
  if (b) switchView(b.dataset.view);
});
document.addEventListener('click', e => {
  const g = e.target.closest('[data-goto]');
  if (g) { e.preventDefault(); switchView(g.dataset.goto); }
});

$('#btn-print').addEventListener('click', () => {
  const visLbl = { all: 'toutes les références', in: 'références en stock', out: 'références manquantes' }[ui.vis];
  const matLbl = ui.mat === 'all' ? 'toutes matières' : ui.mat;
  const date = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  $('#print-meta').textContent = `État du stock au ${date} — ${visLbl}, ${matLbl}`;
  window.print();
});

// ══════════════════════════════════════════════════════
// VUE STOCK
// ══════════════════════════════════════════════════════
function buildChips() {
  const items = [{ mat: 'all', label: 'Tous', color: 'var(--accent)' }]
    .concat(CATALOG.map(m => ({ mat: m.mat, label: m.mat, color: m.color })));
  $('#mat-chips').innerHTML = items.map(i =>
    `<button class="chip${ui.mat === i.mat ? ' active' : ''}" data-mat="${esc(i.mat)}" style="--c:${i.color}">${esc(i.label)}</button>`
  ).join('');
}

function searchOk(q, ...fields) {
  if (!q) return true;
  return fields.some(f => String(f).toLowerCase().includes(q));
}
function visOk(qty) {
  if (ui.vis === 'in') return qty > 0;
  if (ui.vis === 'out') return qty === 0;
  return true;
}

function renderStats() {
  let refs = 0, inStock = 0, spools = 0;
  CATALOG.forEach(m => m.subtypes.forEach(s => s.colors.forEach(c => {
    refs++; const q = getQty(m.mat, s.name, c.n);
    if (q > 0) { inStock++; spools += q; }
  })));
  $('#stat-refs').textContent = refs;
  $('#stat-instock').textContent = inStock;
  $('#stat-spools').textContent = spools;
  $('#reuse-val').textContent = getReuse();
}

function stepperHtml(key, q) {
  return `<div class="stepper${q > 0 ? ' has' : ''}" data-k="${key}">
    <button data-d="-1" aria-label="Retirer une bobine">−</button><span class="val">${q}</span><button data-d="1" aria-label="Ajouter une bobine">+</button>
  </div>`;
}

function renderStockList() {
  const q = $('#search').value.trim().toLowerCase();
  let html = '';
  CATALOG.forEach((m, mi) => {
    if (ui.mat !== 'all' && m.mat !== ui.mat) return;
    m.subtypes.forEach((s, si) => {
      const rows = s.colors
        .map((c, ci) => ({ c, ci, q: getQty(m.mat, s.name, c.n) }))
        .filter(r => visOk(r.q) && searchOk(q, r.c.n, r.c.hex, s.name, m.mat));
      if (!rows.length) return;
      const owned = s.colors.filter(c => getQty(m.mat, s.name, c.n) > 0).length;
      const link = STORE[s.name] || 'https://eu.store.bambulab.com';
      html += `<section class="grp" style="--mc:${m.color}">
        <div class="grp-head">
          <span class="grp-name">${esc(s.name)}</span>
          ${SUBTYPE_INFO[s.name] ? `<button class="grp-info" data-info="${esc(s.name)}" aria-label="Usages, avantages et inconvénients du ${esc(s.name)}">i</button>` : ''}
          <span class="grp-note">${s.note ? esc(s.note) : ''}</span>
          <span class="grp-count">${owned}/${s.colors.length}</span>
          <a class="grp-link" href="${link}" target="_blank" rel="noopener" aria-label="Voir ${esc(s.name)} sur le store Bambu Lab">↗</a>
        </div>`;
      if (ui.sview === 'swatch') {
        html += '<div class="sw-grid">' + rows.map(r =>
          `<div class="sw${r.q > 0 ? ' has' : ''}" data-k="${mi}.${si}.${r.ci}">
            <div class="dot" style="${dotStyle(r.c.hex, r.c.f)}"></div>
            <div class="sw-name">${esc(r.c.n)}</div>
            ${stepperHtml(`${mi}.${si}.${r.ci}`, r.q)}
          </div>`).join('') + '</div>';
      } else {
        html += rows.map(r =>
          `<div class="frow${r.q > 0 ? ' has' : ''}">
            <span class="dot" style="${dotStyle(r.c.hex, r.c.f)}"></span>
            <div class="fmeta"><span class="fname">${esc(r.c.n)}</span><span class="fhex">${r.c.hex}</span></div>
            ${stepperHtml(`${mi}.${si}.${r.ci}`, r.q)}
          </div>`).join('');
      }
      html += '</section>';
    });
  });
  $('#stock-list').innerHTML = html ||
    `<div class="empty">Aucune référence ne correspond.<br>Change le filtre ou la recherche.</div>`;
}

function renderStock() {
  buildChips();
  $$('#seg-vis button').forEach(b => b.classList.toggle('active', b.dataset.vis === ui.vis));
  $$('#seg-view button').forEach(b => b.classList.toggle('active', b.dataset.sview === ui.sview));
  renderStats();
  renderStockList();
}

function itemFromKey(key) {
  const [mi, si, ci] = key.split('.').map(Number);
  const m = CATALOG[mi], s = m.subtypes[si], c = s.colors[ci];
  return { mat: m.mat, sub: s.name, name: c.n };
}
function changeQty(key, delta) {
  const it = itemFromKey(key);
  setQty(it.mat, it.sub, it.name, getQty(it.mat, it.sub, it.name) + delta);
  renderStats(); renderStockList();
}

$('#view-stock').addEventListener('click', e => {
  const inf = e.target.closest('.grp-info');
  if (inf) { openInfo(inf.dataset.info); return; }
  const chip = e.target.closest('.chip');
  if (chip) { ui.mat = chip.dataset.mat; saveUi(); renderStock(); return; }
  const vb = e.target.closest('[data-vis]');
  if (vb) { ui.vis = vb.dataset.vis; saveUi(); renderStock(); return; }
  const sv = e.target.closest('[data-sview]');
  if (sv) { ui.sview = sv.dataset.sview; saveUi(); renderStock(); return; }
  const rb = e.target.closest('[data-reuse]');
  if (rb) { setReuse(getReuse() + Number(rb.dataset.reuse)); renderStats(); return; }
  const sb = e.target.closest('[data-scan]');
  if (sb) { openScan(sb.dataset.scan); return; }
  const stepBtn = e.target.closest('.stepper[data-k] button');
  if (stepBtn) { changeQty(stepBtn.parentElement.dataset.k, Number(stepBtn.dataset.d)); return; }
  // Nuancier : un appui sur une pastille vide l'ajoute (1 bobine)
  const sw = e.target.closest('.sw[data-k]');
  if (sw && !sw.classList.contains('has')) changeQty(sw.dataset.k, 1);
});
$('#search').addEventListener('input', renderStockList);

// ─── Fiche info par type de filament ─────────────────
function openInfo(name) {
  const d = SUBTYPE_INFO[name]; if (!d) return;
  const m = CATALOG.find(x => x.subtypes.some(s => s.name === name));
  const link = STORE[name] || 'https://eu.store.bambulab.com';
  const list = arr => '<ul>' + arr.map(t => `<li>${esc(t)}</li>`).join('') + '</ul>';
  $('#info-title').textContent = name;
  $('#info-title').style.setProperty('--mc', m ? m.color : 'var(--accent)');
  $('#info-body').innerHTML = `
    <div class="info-sec use"><h4>🎯 Usages</h4>${list(d.usages)}</div>
    <div class="info-sec pro"><h4>✅ Avantages</h4>${list(d.pros)}</div>
    <div class="info-sec con"><h4>⚠️ Inconvénients</h4>${list(d.cons)}</div>
    <a class="soft-btn info-link" href="${link}" target="_blank" rel="noopener">Voir sur le store Bambu Lab ↗</a>
    <p class="hint">Indications générales : vérifie la fiche technique Bambu Lab pour les températures et réglages.</p>`;
  $('#info-sheet').hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeInfo() { $('#info-sheet').hidden = true; document.body.style.overflow = ''; }
$('#info-sheet').addEventListener('click', e => { if (e.target.closest('[data-act="close-info"]')) closeInfo(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#info-sheet').hidden) closeInfo(); });

// ══════════════════════════════════════════════════════
// VUE SIMULATEUR
// ══════════════════════════════════════════════════════
const BK_COLORS = ['#c8f03a', '#ff9d4d', '#3af0c8', '#ff5470', '#b06bff', '#5aa8ff', '#f0e43a'];

function renderSim() {
  if (!S.filaments.some(f => f.id === S.sim.filId)) S.sim.filId = S.filaments[0] ? S.filaments[0].id : '';
  if (!S.printers.some(p => p.id === S.sim.prnId)) S.sim.prnId = S.printers[0] ? S.printers[0].id : '';
  $('#sim-mass').value = S.sim.mass;
  $('#sim-h').value = S.sim.h;
  $('#sim-min').value = S.sim.min;
  $('#sim-fil').innerHTML = S.filaments.map(f =>
    `<option value="${f.id}"${f.id === S.sim.filId ? ' selected' : ''}>${esc(f.name)} · ${eur(f.price)}/kg</option>`).join('');
  $('#sim-prn').innerHTML = S.printers.map(p =>
    `<option value="${p.id}"${p.id === S.sim.prnId ? ' selected' : ''}>${esc(p.name)}</option>`).join('');
  calc();
}

function calc() {
  const box = $('#sim-result');
  const f = S.filaments.find(x => x.id === S.sim.filId);
  const p = S.printers.find(x => x.id === S.sim.prnId);
  if (!f || !p) {
    box.innerHTML = `<div class="empty">Ajoute au moins un filament et une imprimante dans <a href="#" data-goto="settings">⚙️ Réglages</a>.</div>`;
    return;
  }
  const mass = num(S.sim.mass), dur = num(S.sim.h) + num(S.sim.min) / 60;
  const nozLife = f.abrasive ? num(p.nozzleLifeAbr) : num(p.nozzleLife);
  const hpy = num(p.hPerYear) || 1;

  const rows = [
    { ic: '🧵', label: 'Filament',      d: `${mass} g × ${eur(f.price)}/kg`,                     v: mass / 1000 * num(f.price) },
    { ic: '⚡', label: 'Électricité',   d: `${f.watts} W × ${dur.toFixed(2)} h`,                  v: num(f.watts) / 1000 * dur * num(S.kwh) },
    { ic: '🔩', label: 'Buse',          d: `${p.nozzleCost} € / ${nozLife} h${f.abrasive ? ' (abrasif)' : ''}`, v: nozLife > 0 ? num(p.nozzleCost) / nozLife * dur : 0 },
    { ic: '🛏', label: 'Plateau',       d: `${p.plateCost} € / ${p.plateLife} impr.`,              v: num(p.plateLife) > 0 ? num(p.plateCost) / num(p.plateLife) : 0 },
    { ic: '🌬', label: 'Filtre',        d: `${p.filterCost} € / ${p.filterLife} h`,                v: num(p.filterLife) > 0 ? num(p.filterCost) / num(p.filterLife) * dur : 0 },
    { ic: '🔧', label: 'Maintenance',   d: `${p.maintCost} €/an ÷ ${hpy} h`,                       v: num(p.maintCost) / hpy * dur },
    { ic: '🏭', label: 'Amortissement', d: `${p.machCost} € sur ${p.amortYears} ans`,              v: num(p.amortYears) > 0 ? num(p.machCost) / (hpy * num(p.amortYears)) * dur : 0 },
  ];
  const total = rows.reduce((a, r) => a + r.v, 0);

  box.innerHTML = `
    <div class="card-title">Prix de vente conseillés</div>
    <div class="prices">
      <div class="price"><div class="p-lbl">Artisanal</div><div class="p-mult">× 2</div><div class="p-val">${eur(total * 2)}</div></div>
      <div class="price"><div class="p-lbl">Petite prod.</div><div class="p-mult">× 2,5</div><div class="p-val">${eur(total * 2.5)}</div></div>
      <div class="price"><div class="p-lbl">Pro / SAV</div><div class="p-mult">× 3</div><div class="p-val">${eur(total * 3)}</div></div>
    </div>
    <div class="card-title mt-lg">Détail du coût de revient</div>
    ${rows.map((r, i) => {
      const pct = total > 0 ? r.v / total * 100 : 0;
      return `<div class="bk">
        <span class="bk-ic">${r.ic}</span>
        <span class="bk-label">${r.label}<small>${esc(r.d)}</small></span>
        <span class="bk-val">${eur(r.v, 3)}</span>
        <div class="bk-bar"><div class="bk-fill" style="width:${pct}%;background:${BK_COLORS[i]}"></div></div>
      </div>`;
    }).join('')}
    <div class="res-bottom">
      <div><div class="res-lbl">Coût de revient total</div><div class="res-sub">${esc(f.name)} · ${dur.toFixed(2)} h · ${mass} g</div></div>
      <div class="res-total">${eur(total)}</div>
    </div>`;
}

$('#view-sim').addEventListener('input', e => {
  const map = { 'sim-mass': 'mass', 'sim-h': 'h', 'sim-min': 'min', 'sim-fil': 'filId', 'sim-prn': 'prnId' };
  const k = map[e.target.id];
  if (!k) return;
  S.sim[k] = e.target.tagName === 'SELECT' ? e.target.value : e.target.value;
  saveSettings(); calc();
});

// ══════════════════════════════════════════════════════
// VUE RÉGLAGES
// ══════════════════════════════════════════════════════
const PRN_FIELDS = [
  ['name', 'Nom', 'text', '', 'full'],
  ['machCost', 'Coût machine', 'num', '€'],
  ['amortYears', 'Amortissement', 'num', 'ans'],
  ['hPerYear', 'Impression / an', 'num', 'h'],
  ['maintCost', 'Maintenance', 'num', '€/an'],
  ['nozzleCost', 'Buse / hotend', 'num', '€'],
  ['nozzleLife', 'Vie buse', 'num', 'h'],
  ['nozzleLifeAbr', 'Vie buse abrasif', 'num', 'h'],
  ['plateCost', 'Plateau', 'num', '€'],
  ['plateLife', 'Vie plateau', 'num', 'impr.'],
  ['filterCost', 'Filtre', 'num', '€'],
  ['filterLife', 'Vie filtre', 'num', 'h'],
];

function renderFilaments() {
  const q = ($('#fil-search').value || '').trim().toLowerCase();
  const list = q ? S.filaments.filter(f => f.name.toLowerCase().includes(q)) : S.filaments;
  $('#fil-count').textContent = S.filaments.length;
  $('#fil-list').innerHTML = list.map(f => `
    <div class="fil-row" data-id="${f.id}">
      <input class="s-in name" data-scope="fil" data-id="${f.id}" data-key="name" value="${esc(f.name)}" aria-label="Nom du filament">
      <input class="s-in" type="number" step="0.5" min="0" inputmode="decimal" data-scope="fil" data-id="${f.id}" data-key="price" value="${f.price}" aria-label="Prix au kilo">
      <input class="s-in" type="number" step="5" min="0" inputmode="numeric" data-scope="fil" data-id="${f.id}" data-key="watts" value="${f.watts}" aria-label="Consommation en watts">
      <button class="abr-btn${f.abrasive ? ' on' : ''}" data-act="toggle-abr" data-id="${f.id}" aria-label="Abrasif">${f.abrasive ? 'OUI' : '—'}</button>
      <button class="del-btn" data-act="del-fil" data-id="${f.id}" aria-label="Supprimer">✕</button>
    </div>`).join('') || `<div class="map-empty">${q ? 'Aucun filament ne correspond.' : 'Aucun filament.'}</div>`;
}

function prnMeta(p) { return `${num(p.machCost)} € · ${num(p.amortYears)} ans`; }
function renderPrinters(openId) {
  $('#prn-list').innerHTML = S.printers.map(p => `
    <details class="prn" id="prn-${p.id}"${p.id === openId ? ' open' : ''}>
      <summary><span class="prn-name">${esc(p.name)}</span><span class="prn-meta">${prnMeta(p)}</span><span class="prn-chev">▶</span></summary>
      <div class="prn-body">
        ${PRN_FIELDS.map(([k, lbl, type, unit, cls]) => `
          <div class="field${cls ? ' ' + cls : ''}">
            <label>${lbl}</label>
            <div class="inp">
              <input ${type === 'num' ? 'type="number" step="any" min="0" inputmode="decimal"' : 'type="text"'} data-scope="prn" data-id="${p.id}" data-key="${k}" value="${esc(p[k])}">
              ${unit ? `<span class="unit">${unit}</span>` : ''}
            </div>
          </div>`).join('')}
        <div class="prn-actions">
          <button class="mini-btn" data-act="dup-prn" data-id="${p.id}">Dupliquer</button>
          <button class="mini-btn danger" data-act="del-prn" data-id="${p.id}"${S.printers.length < 2 ? ' disabled' : ''}>Supprimer</button>
        </div>
      </div>
    </details>`).join('');
}

function renderBarcodes() {
  const map = getBarcodeMap(); const codes = Object.keys(map);
  $('#map-count').textContent = codes.length;
  $('#map-list').innerHTML = codes.length ? codes.map(code => `
    <div class="map-row">
      <span class="map-code">${esc(code)}</span>
      <span class="map-name">${esc(map[code].sub)} · ${esc(map[code].name)}</span>
      <button class="del-btn" data-act="del-map" data-code="${esc(code)}" aria-label="Supprimer l'association">✕</button>
    </div>`).join('') : '<div class="map-empty">Aucun code associé pour le moment.</div>';
}

function renderSettings(openPrnId) {
  $('#set-kwh').value = S.kwh;
  renderFilaments();
  renderPrinters(openPrnId);
  renderBarcodes();
  $('#cat-date').textContent = new Date(CATALOG_UPDATED).toLocaleDateString('fr-FR');
}

$('#fil-search').addEventListener('input', renderFilaments);

$('#view-settings').addEventListener('input', e => {
  const el = e.target, sc = el.dataset.scope;
  if (!sc) return;
  const val = el.type === 'number' ? num(el.value) : el.value;
  if (sc === 'kwh') S.kwh = val;
  if (sc === 'fil') { const f = S.filaments.find(x => x.id === el.dataset.id); if (f) f[el.dataset.key] = val; }
  if (sc === 'prn') {
    const p = S.printers.find(x => x.id === el.dataset.id);
    if (p) {
      p[el.dataset.key] = val;
      const d = $('#prn-' + p.id);
      if (d) { $('.prn-name', d).textContent = p.name; $('.prn-meta', d).textContent = prnMeta(p); }
    }
  }
  saveSettings();
});

$('#view-settings').addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const id = b.dataset.id;
  switch (b.dataset.act) {
    case 'toggle-abr': {
      const f = S.filaments.find(x => x.id === id); f.abrasive = !f.abrasive;
      saveSettings(); renderFilaments(); break;
    }
    case 'del-fil': {
      const f = S.filaments.find(x => x.id === id);
      if (confirm(`Supprimer « ${f.name} » ?`)) { S.filaments = S.filaments.filter(x => x.id !== id); saveSettings(); renderFilaments(); toast('Filament supprimé'); }
      break;
    }
    case 'add-fil': {
      const nid = 'f-' + uid();
      $('#fold-fil').open = true; $('#fil-search').value = '';
      S.filaments.push({ id: nid, name: 'Nouveau filament', price: 15, watts: 220, abrasive: false });
      saveSettings(); renderFilaments();
      const inp = $(`.fil-row[data-id="${nid}"] .name`); if (inp) { inp.focus(); inp.select(); }
      break;
    }
    case 'add-prn': {
      const nid = 'p-' + uid();
      S.printers.push(Object.assign({ id: nid }, DEFAULT_PRINTER, { name: 'Nouvelle imprimante' }));
      saveSettings(); renderPrinters(nid); toast('Imprimante ajoutée');
      break;
    }
    case 'dup-prn': {
      const src = S.printers.find(x => x.id === id); const nid = 'p-' + uid();
      S.printers.push(Object.assign(clone(src), { id: nid, name: src.name + ' (copie)' }));
      saveSettings(); renderPrinters(nid); toast('Profil dupliqué');
      break;
    }
    case 'del-prn': {
      if (S.printers.length < 2) return;
      const p = S.printers.find(x => x.id === id);
      if (confirm(`Supprimer le profil « ${p.name} » ?`)) { S.printers = S.printers.filter(x => x.id !== id); saveSettings(); renderPrinters(); toast('Profil supprimé'); }
      break;
    }
    case 'del-map': {
      const map = getBarcodeMap(); delete map[b.dataset.code]; saveBarcodeMap(map); renderBarcodes();
      break;
    }
    case 'reset-settings': {
      if (confirm('Remettre filaments, électricité et imprimantes aux valeurs par défaut ?')) {
        S = clone(DEFAULT_SETTINGS); saveSettings(); renderSettings(); toast('Réglages réinitialisés');
      }
      break;
    }
  }
});

// ══════════════════════════════════════════════════════
// SCAN CODE-BARRES (réception / sortie)
// ══════════════════════════════════════════════════════
let scanMode = null, scanStream = null, scanDetector = null, scanActive = false;
let scanCooldowns = {}, pendingCode = null, scanCount = 0;

function openScan(mode) {
  scanMode = mode; scanCount = 0;
  $('#scan-count').textContent = '0';
  $('#scan-log').innerHTML = '';
  $('#scan-title').textContent = mode === 'in' ? 'Réception de stock' : 'Sortie de stock';
  $('#scan-top').classList.toggle('mode-in', mode === 'in');
  $('#scan-top').classList.toggle('mode-out', mode === 'out');
  $('#scan-overlay').classList.add('show');
  startCamera();
}
function closeScan() {
  stopCamera();
  $('#scan-overlay').classList.remove('show');
  $('#scan-assign').classList.remove('show');
  pendingCode = null;
  renderStock();
}
function showScanError(msg) { const el = $('#scan-error'); el.textContent = msg; el.hidden = false; }

async function startCamera() {
  $('#scan-error').hidden = true;
  if (!('BarcodeDetector' in window)) {
    showScanError("Le scan n'est pas supporté par ce navigateur. Utilise Chrome sur Android, avec la page en ligne (HTTPS).");
    return;
  }
  try {
    scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    const video = $('#scan-video');
    video.srcObject = scanStream; await video.play();
    scanDetector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'code_39'] });
    scanActive = true; scanLoop();
  } catch (e) {
    showScanError("Impossible d'accéder à la caméra : " + e.message);
  }
}
function stopCamera() {
  scanActive = false;
  if (scanStream) { scanStream.getTracks().forEach(t => t.stop()); scanStream = null; }
}
async function scanLoop() {
  if (!scanActive) return;
  const video = $('#scan-video');
  if (video.readyState >= 2 && !$('#scan-assign').classList.contains('show')) {
    try { const codes = await scanDetector.detect(video); if (codes.length) handleCode(codes[0].rawValue); } catch (e) {}
  }
  setTimeout(scanLoop, 180);
}
function handleCode(code) {
  const now = Date.now();
  if (scanCooldowns[code] && now - scanCooldowns[code] < 1800) return;
  scanCooldowns[code] = now;
  const map = getBarcodeMap();
  if (map[code]) applyScan(map[code]);
  else { pendingCode = code; showAssign(code); }
}
function applyScan({ mat, sub, name }) {
  const next = scanMode === 'in' ? getQty(mat, sub, name) + 1 : Math.max(0, getQty(mat, sub, name) - 1);
  setQty(mat, sub, name, next);
  const fl = $('#scan-flash');
  fl.classList.toggle('out', scanMode === 'out');
  fl.textContent = `${scanMode === 'in' ? '+1' : '−1'}  ${name}  →  ${next}`;
  fl.classList.remove('show'); void fl.offsetWidth; fl.classList.add('show');
  if (navigator.vibrate) navigator.vibrate(70);
  beep();
  scanCount++; $('#scan-count').textContent = scanCount;
  const item = document.createElement('div');
  item.className = 'scan-log-item';
  item.innerHTML = `<span class="sl-check${scanMode === 'out' ? ' out' : ''}">✓</span> ${esc(sub)} · ${esc(name)} <span class="sl-qty">${scanMode === 'in' ? '+1' : '−1'} → ${next}</span>`;
  $('#scan-log').prepend(item);
}
function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = scanMode === 'in' ? 880 : 520; g.gain.value = 0.07;
    o.start(); o.stop(ctx.currentTime + 0.09);
  } catch (e) {}
}

function showAssign(code) {
  $('#assign-code').textContent = code;
  $('#assign-mat').innerHTML = '<option value="">Matière…</option>' + CATALOG.map((m, i) => `<option value="${i}">${esc(m.mat)}</option>`).join('');
  $('#assign-sub').innerHTML = '<option value="">Sous-type…</option>';
  $('#assign-color').innerHTML = '<option value="">Couleur…</option>';
  $('#scan-assign').classList.add('show');
}
$('#assign-mat').addEventListener('change', e => {
  const m = CATALOG[e.target.value];
  $('#assign-sub').innerHTML = '<option value="">Sous-type…</option>' + (m ? m.subtypes.map((s, i) => `<option value="${i}">${esc(s.name)}</option>`).join('') : '');
  $('#assign-color').innerHTML = '<option value="">Couleur…</option>';
});
$('#assign-sub').addEventListener('change', e => {
  const m = CATALOG[$('#assign-mat').value]; const s = m && m.subtypes[e.target.value];
  $('#assign-color').innerHTML = '<option value="">Couleur…</option>' + (s ? s.colors.map((c, i) => `<option value="${i}">${esc(c.n)}</option>`).join('') : '');
});
$('#scan-overlay').addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  if (b.dataset.act === 'close-scan') closeScan();
  if (b.dataset.act === 'skip-assign') { $('#scan-assign').classList.remove('show'); pendingCode = null; }
  if (b.dataset.act === 'confirm-assign') {
    const mi = $('#assign-mat').value, si = $('#assign-sub').value, ci = $('#assign-color').value;
    if (mi === '' || si === '' || ci === '') { alert('Choisis la matière, le sous-type et la couleur.'); return; }
    const m = CATALOG[mi], s = m.subtypes[si], c = s.colors[ci];
    const entry = { mat: m.mat, sub: s.name, name: c.n };
    const map = getBarcodeMap(); map[pendingCode] = entry; saveBarcodeMap(map);
    $('#scan-assign').classList.remove('show'); pendingCode = null;
    applyScan(entry);
  }
});

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════
switchView(ui.view);
