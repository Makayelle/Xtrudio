// ─── STATE ───────────────────────────────────────────
let currentMat = 'all', currentVis = 'all', currentView = 'table';

function skey(mat,sub,name){ return `q_${mat}_${sub}_${name}`.replace(/\s+/g,'_'); }
function getQty(mat,sub,name){ return parseInt(localStorage.getItem(skey(mat,sub,name))||'0'); }
function setQty(mat,sub,name,v){
  const q = Math.max(0,v);
  localStorage.setItem(skey(mat,sub,name), q);
  renderAll(); updateStats();
}

function getSpool(){ return parseInt(localStorage.getItem('spool_count')||'0'); }
function adjSpool(d){ setSpool(getSpool()+d); }
function setSpool(v){
  const q = Math.max(0,parseInt(v)||0);
  localStorage.setItem('spool_count',q);
  document.getElementById('spool-display').textContent = q;
  document.getElementById('spool-input').value = q;
  updateStats();
}

// ─── NAV ─────────────────────────────────────────────
function switchPage(p,el){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(x=>x.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  el.classList.add('active');
}
function toggleSec(id){
  document.getElementById(id).classList.toggle('collapsed');
}

// ─── FILTERS ─────────────────────────────────────────
function filterMat(m,el){
  currentMat=m;
  document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  renderAll();
}
function setVis(v,el){
  currentVis=v;
  document.querySelectorAll('.vis-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  renderAll();
}
function setView(v,el){
  currentView=v;
  document.querySelectorAll('.vt-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('view-table').classList.toggle('shown',v==='table');
  document.getElementById('view-swatches').classList.toggle('shown',v==='swatches');
  renderAll();
}

// ─── STATS ───────────────────────────────────────────
function updateStats(){
  let total=0,inStock=0,bobs=0;
  CATALOG.forEach(m=>m.subtypes.forEach(s=>s.colors.forEach(c=>{
    total++;
    const q=getQty(m.mat,s.name,c.n);
    if(q>0){inStock++;bobs+=q;}
  })));
  document.getElementById('stat-total').textContent=total;
  document.getElementById('stat-stock').textContent=inStock;
  document.getElementById('stat-bobs').textContent=bobs;
  const sp=getSpool();
  document.getElementById('stat-spools').textContent=sp;
  document.getElementById('spool-display').textContent=sp;
  document.getElementById('spool-input').value=sp;
}

// ─── DOT STYLE ───────────────────────────────────────
function dotStyle(hex,finish){
  const white=['#FFFFFF','#F0F0F0','#E8E8E8','#EEEEEE','#FFFFEE'].includes(hex.toUpperCase());
  if(finish==='t') return `background:linear-gradient(45deg,#555 25%,transparent 25%,transparent 75%,#555 75%),linear-gradient(45deg,#555 25%,#333 25%,#333 75%,#555 75%);background-size:8px 8px;background-position:0 0,4px 4px;border:2px solid rgba(255,255,255,.2);`;
  if(finish==='metallic') return `background:linear-gradient(135deg,${hex}dd,${hex}88,${hex}dd);border:2px solid rgba(255,255,255,.3);`;
  return `background:${hex};border:2px solid rgba(${white?'0,0,0,.12':'255,255,255,.1'});`;
}

// ─── SEARCH FILTER ───────────────────────────────────
function matchSearch(name,sub,mat){
  const q=(document.getElementById('search-inp').value||'').toLowerCase().trim();
  if(!q) return true;
  return name.toLowerCase().includes(q)||sub.toLowerCase().includes(q)||mat.toLowerCase().includes(q);
}

function visMatch(mat,sub,name){
  const q=getQty(mat,sub,name);
  if(currentVis==='in') return q>0;
  if(currentVis==='out') return q===0;
  return true;
}

// ─── RENDER TABLE ────────────────────────────────────
function renderTable(){
  const tb=document.getElementById('tbl-body');
  tb.innerHTML='';
  CATALOG.forEach(m=>{
    if(currentMat!=='all'&&m.mat!==currentMat) return;
    m.subtypes.forEach(s=>{
      s.colors.forEach(c=>{
        if(!visMatch(m.mat,s.name,c.n)) return;
        if(!matchSearch(c.n,s.name,m.mat)) return;
        const q=getQty(m.mat,s.name,c.n);
        const storeUrl=STORE[s.name]||'https://eu.store.bambulab.com';
        const tr=document.createElement('tr');
        tr.innerHTML=`
          <td><span class="t-dot" style="${dotStyle(c.hex,c.f)}"></span></td>
          <td><div class="t-name">${c.n}</div><div class="t-hex">${c.hex}</div></td>
          <td><span class="t-mat" style="background:${m.color};color:#0e0f0e">${m.mat}</span></td>
          <td><div class="t-sub">${s.name}</div>${s.note?`<div class="t-hex">${s.note}</div>`:''}</td>
          <td class="center">
            <div class="qty-ctrl">
              <button onclick="setQty('${m.mat}','${s.name}','${c.n}',${q-1})">−</button>
              <span class="qty-val${q>0?' has-stock':''}">${q}</span>
              <button onclick="setQty('${m.mat}','${s.name}','${c.n}',${q+1})">+</button>
            </div>
          </td>
          <td class="center"><a class="link-icon" href="${storeUrl}" target="_blank" title="Voir sur Bambu Lab store">↗</a></td>
        `;
        tb.appendChild(tr);
      });
    });
  });
}

// ─── RENDER SWATCHES ─────────────────────────────────
function renderSwatches(){
  const cont=document.getElementById('swatch-container');
  cont.innerHTML='';
  CATALOG.forEach(m=>{
    if(currentMat!=='all'&&m.mat!==currentMat) return;
    let anyVisible=false;
    const groupEl=document.createElement('div');
    groupEl.className='mat-group';
    const totalC=m.subtypes.reduce((s,st)=>s+st.colors.length,0);
    groupEl.innerHTML=`<div class="mat-hdr">
      <span class="mat-tag" style="background:${m.color}">${m.mat}</span>
      <div class="mat-line"></div>
      <span class="mat-count">${m.subtypes.length} sous-types · ${totalC} couleurs</span>
    </div>`;
    m.subtypes.forEach(s=>{
      const colors=s.colors.filter(c=>visMatch(m.mat,s.name,c.n)&&matchSearch(c.n,s.name,m.mat));
      if(!colors.length) return;
      anyVisible=true;
      const subLbl=document.createElement('div');
      subLbl.className='sub-label';
      subLbl.innerHTML=`${s.name}${s.note?` <span class="sub-note">— ${s.note}</span>`:''}`;
      groupEl.appendChild(subLbl);
      const grid=document.createElement('div');
      grid.className='swatch-grid';
      colors.forEach(c=>{
        const q=getQty(m.mat,s.name,c.n);
        const storeUrl=STORE[s.name]||'https://eu.store.bambulab.com';
        const sw=document.createElement('div');
        sw.className='swatch'+(q>0?' in-stock':'');
        sw.innerHTML=`
          <a class="s-link" href="${storeUrl}" target="_blank" onclick="event.stopPropagation()" title="Bambu Lab Store">↗</a>
          <div class="dot" style="${dotStyle(c.hex,c.f)}"></div>
          <div class="s-name">${c.n}</div>
          <div class="s-hex">${c.hex}</div>
          <div class="s-qty">${q>0?q+' bobine'+(q>1?'s':''):''}</div>
          <div class="s-qty-ctrl">
            <button onclick="event.stopPropagation();setQty('${m.mat}','${s.name}','${c.n}',${q-1})">−</button>
            <span class="sv">${q}</span>
            <button onclick="event.stopPropagation();setQty('${m.mat}','${s.name}','${c.n}',${q+1})">+</button>
          </div>
        `;
        sw.addEventListener('click',()=>{
          const newQ=q>0?0:1;
          setQty(m.mat,s.name,c.n,newQ);
        });
        grid.appendChild(sw);
      });
      groupEl.appendChild(grid);
    });
    if(anyVisible) cont.appendChild(groupEl);
  });
}

function renderAll(){
  if(currentView==='table') renderTable();
  else renderSwatches();
}

// ─── COST CALC ───────────────────────────────────────
const filPresets={
  'pla':     {watts:220,nozzleLife:400,filterLife:1000},
  'pla-matte':{watts:200,nozzleLife:400,filterLife:1000},
  'pla-hf':  {watts:220,nozzleLife:400,filterLife:1000},
  'petg':    {watts:200,nozzleLife:350,filterLife:900},
  'petg-hf': {watts:200,nozzleLife:350,filterLife:900},
  'asa':     {watts:280,nozzleLife:350,filterLife:600},
  'tpu':     {watts:200,nozzleLife:500,filterLife:1200},
  'pla-cf':  {watts:220,nozzleLife:80, filterLife:800},
  'petg-cf': {watts:220,nozzleLife:80, filterLife:800},
};
const COLORS=['#c8f03a','#f0a83a','#3af0c8','#f03a70','#a03af0','#3a8cf0','#f0f03a'];

function g(id){return parseFloat(document.getElementById(id).value)||0;}

function onFilType(){
  const t=document.getElementById('filType').value;
  const p=filPresets[t]||filPresets['pla'];
  document.getElementById('nozzleLife').value=p.nozzleLife;
  document.getElementById('filterLife').value=p.filterLife;
  calc();
}
function onFilSlider(){
  const v=parseFloat(document.getElementById('fil-slider').value);
  document.getElementById('filPrice').value=v;
  document.getElementById('fil-slabel').textContent=v.toFixed(2)+' €/kg';
  calc();
}
function onFilInput(){
  const v=parseFloat(document.getElementById('filPrice').value)||0;
  document.getElementById('fil-slider').value=Math.min(80,Math.max(5,v));
  document.getElementById('fil-slabel').textContent=v.toFixed(2)+' €/kg';
  calc();
}

function calc(){
  const mass=g('mass'), h=g('hours'), mn=g('minutes'), dur=h+mn/60;
  const kwh=g('kwh'), fp=g('filPrice');
  const t=document.getElementById('filType').value;
  const p=filPresets[t]||filPresets['pla'];
  const watts=p.watts;
  document.getElementById('watts-disp').value=watts+' W';

  const nozC=g('nozzleCost'),nozL=g('nozzleLife');
  const platC=g('plateCost'),platL=g('plateLife');
  const filtC=g('filterCost'),filtL=g('filterLife');
  const maintC=g('maintCost'),hpy=g('hPerYear')||1;
  const machC=g('machCost'),ay=g('amortYears')||1;

  const cFil=(mass/1000)*fp;
  const cElec=(watts/1000)*dur*kwh;
  const cNoz=nozL>0?(nozC/nozL)*dur:0;
  const cPlat=platL>0?platC/platL:0;
  const cFilt=filtL>0?(filtC/filtL)*dur:0;
  const cMaint=(maintC/hpy)*dur;
  const cAmort=(machC/(hpy*ay))*dur;
  const total=cFil+cElec+cNoz+cPlat+cFilt+cMaint+cAmort;

  const rows=[
    {icon:'🧵',label:'Filament',detail:`${mass}g × ${fp.toFixed(2)} €/kg`,cost:cFil},
    {icon:'⚡',label:'Électricité',detail:`${watts}W (auto) × ${dur.toFixed(2)}h × ${kwh} €/kWh`,cost:cElec},
    {icon:'🔩',label:'Buse / Hotend',detail:`${nozC}€ / ${nozL}h`,cost:cNoz},
    {icon:'🛏',label:'Plateau PEI',detail:`${platC}€ / ${platL} prints`,cost:cPlat},
    {icon:'🌬',label:'Filtres HEPA',detail:`${filtC}€ / ${filtL}h`,cost:cFilt},
    {icon:'🔧',label:'Maintenance',detail:`${maintC}€/an ÷ ${hpy}h`,cost:cMaint},
    {icon:'🏭',label:'Amortissement',detail:`${machC}€ sur ${ay} ans`,cost:cAmort},
  ];

  const rc=document.getElementById('r-rows');
  rc.innerHTML='';
  rows.forEach((r,i)=>{
    const pct=total>0?(r.cost/total*100):0;
    const rr=document.createElement('div');rr.className='r-row';
    rr.innerHTML=`<span class="r-icon">${r.icon}</span>
      <div><div class="r-label">${r.label}</div><div class="r-detail">${r.detail}</div></div>
      <span class="r-pct">${pct.toFixed(1)}%</span>
      <span class="r-val">${r.cost.toFixed(3)} €</span>`;
    rc.appendChild(rr);
    const br=document.createElement('div');br.className='bar-row';
    br.innerHTML=`<div class="bar-bg"><div class="bar-fill" style="width:${pct}%;background:${COLORS[i]}"></div></div>`;
    rc.appendChild(br);
  });

  // Labels sections
  document.getElementById('lbl-print').textContent=`${dur.toFixed(2)}h · ${mass}g`;
  document.getElementById('lbl-fil').textContent=fmt(cFil);
  document.getElementById('lbl-elec').textContent=fmt(cElec);
  document.getElementById('lbl-wear').textContent=fmt(cNoz+cPlat+cFilt+cMaint);
  document.getElementById('lbl-amort').textContent=fmt(cAmort);

  document.getElementById('r-grand').textContent=fmt(total);
  document.getElementById('r-detail').textContent=`filament ${fmt(cFil)} · élec ${fmt(cElec)} · usure ${fmt(cNoz+cPlat+cFilt+cMaint)} · amort. ${fmt(cAmort)}`;
  document.getElementById('p2x').textContent=fmt(total*2);
  document.getElementById('p25x').textContent=fmt(total*2.5);
  document.getElementById('p3x').textContent=fmt(total*3);

  // Donut
  const arcs=document.getElementById('donut-arcs');arcs.innerHTML='';
  const circ=2*Math.PI*44; let off=0;
  const g2=document.createElementNS('http://www.w3.org/2000/svg','g');
  g2.setAttribute('transform','rotate(-90 55 55)');
  rows.forEach((r,i)=>{
    if(r.cost<=0||total<=0) return;
    const pct=r.cost/total,dash=pct*circ,gap=circ-dash;
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx','55');c.setAttribute('cy','55');c.setAttribute('r','44');
    c.setAttribute('fill','none');c.setAttribute('stroke',COLORS[i]);c.setAttribute('stroke-width','16');
    c.setAttribute('stroke-dasharray',`${dash} ${gap}`);c.setAttribute('stroke-dashoffset',`${-off*circ}`);
    g2.appendChild(c);off+=pct;
  });
  arcs.appendChild(g2);
  document.getElementById('donut-tot').textContent=total.toFixed(2)+'€';

  // Legend
  const leg=document.getElementById('r-legend');leg.innerHTML='';
  rows.forEach((r,i)=>{
    const pct=total>0?(r.cost/total*100):0;
    const li=document.createElement('div');li.className='leg-item';
    li.innerHTML=`<div class="leg-dot" style="background:${COLORS[i]}"></div><span>${r.label}</span><strong>${pct.toFixed(1)}%</strong>`;
    leg.appendChild(li);
  });
}
function fmt(v){return v.toFixed(2)+' €';}

// ══════════════════════════════════════════════════════
// SCAN CODE-BARRES (réception / sortie de stock)
// ══════════════════════════════════════════════════════
let scanMode=null;        // 'in' ou 'out'
let scanStream=null;
let scanDetector=null;
let scanActive=false;
let scanCooldowns={};     // code -> timestamp du dernier scan accepté
let pendingCode=null;     // code en attente d'association
let scanSessionCount=0;

function getBarcodeMap(){ return JSON.parse(localStorage.getItem('barcodeMap')||'{}'); }
function saveBarcodeMap(map){ localStorage.setItem('barcodeMap', JSON.stringify(map)); }

function openScan(mode){
  scanMode=mode;
  scanSessionCount=0;
  document.getElementById('scan-count').textContent='0';
  document.getElementById('scan-log').innerHTML='';
  document.getElementById('scan-title').textContent = mode==='in' ? 'Réception de stock' : 'Sortie de stock';
  const top=document.getElementById('scan-top');
  top.classList.toggle('mode-in', mode==='in');
  top.classList.toggle('mode-out', mode==='out');
  document.getElementById('scan-overlay').classList.add('show');
  startCamera();
}

function closeScan(){
  stopCamera();
  document.getElementById('scan-overlay').classList.remove('show');
  document.getElementById('scan-assign').classList.remove('show');
  pendingCode=null;
}

async function startCamera(){
  document.getElementById('scan-error').style.display='none';
  if(!('BarcodeDetector' in window)){
    document.getElementById('scan-error').style.display='block';
    document.getElementById('scan-error').textContent=
      "Le scan natif n'est pas supporté par ce navigateur. Utilise Chrome sur Android, et assure-toi que la page est servie en HTTPS (ex: GitHub Pages) — le scan ne fonctionne pas si le fichier est ouvert en local.";
    return;
  }
  try{
    scanStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
    const video=document.getElementById('scan-video');
    video.srcObject=scanStream;
    await video.play();
    scanDetector=new BarcodeDetector({formats:['ean_13','ean_8','upc_a','upc_e','code_128','code_39']});
    scanActive=true;
    scanLoop();
  }catch(e){
    document.getElementById('scan-error').style.display='block';
    document.getElementById('scan-error').textContent="Impossible d'accéder à la caméra : "+e.message;
  }
}

function stopCamera(){
  scanActive=false;
  if(scanStream){ scanStream.getTracks().forEach(t=>t.stop()); scanStream=null; }
}

async function scanLoop(){
  if(!scanActive) return;
  const video=document.getElementById('scan-video');
  if(video.readyState>=2 && !document.getElementById('scan-assign').classList.contains('show')){
    try{
      const codes=await scanDetector.detect(video);
      if(codes.length) handleCode(codes[0].rawValue);
    }catch(e){ /* ignore erreurs ponctuelles de détection */ }
  }
  setTimeout(scanLoop,180);
}

function handleCode(code){
  const now=Date.now();
  if(scanCooldowns[code] && now-scanCooldowns[code]<1800) return;
  scanCooldowns[code]=now;

  const map=getBarcodeMap();
  if(map[code]){
    applyStockChange(map[code],code);
  }else{
    pendingCode=code;
    showAssignPanel(code);
  }
}

function applyStockChange(entry){
  const {mat,sub,name}=entry;
  const cur=getQty(mat,sub,name);
  const next = scanMode==='in' ? cur+1 : Math.max(0,cur-1);
  setQty(mat,sub,name,next);
  flashSuccess(name,next);
  logScan(name,next);
}

function flashSuccess(name,qty){
  const el=document.getElementById('scan-flash');
  el.classList.toggle('out', scanMode==='out');
  el.textContent=(scanMode==='in'?'+1  ':'−1  ')+name+'  →  '+qty+' bobine'+(qty>1?'s':'');
  el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
  if(navigator.vibrate) navigator.vibrate(70);
  beep();
}

function logScan(name,qty){
  scanSessionCount++;
  document.getElementById('scan-count').textContent=scanSessionCount;
  const log=document.getElementById('scan-log');
  const item=document.createElement('div');
  item.className='scan-log-item';
  item.innerHTML=`<span class="sl-check${scanMode==='out'?' out':''}">✓</span> ${name} <span class="sl-qty">${scanMode==='in'?'+1':'−1'} → ${qty}</span>`;
  log.prepend(item);
}

function beep(){
  try{
    const ctx=new (window.AudioContext||window.webkitAudioContext)();
    const o=ctx.createOscillator(), g=ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = scanMode==='in' ? 880 : 520;
    g.gain.value=0.07;
    o.start(); o.stop(ctx.currentTime+0.09);
  }catch(e){}
}

// ─── Panneau d'association (code inconnu) ────────────
function showAssignPanel(code){
  document.getElementById('assign-code-display').textContent=code;
  const matSel=document.getElementById('assign-mat');
  matSel.innerHTML='<option value="">Matière…</option>'+CATALOG.map(m=>`<option value="${m.mat}">${m.mat}</option>`).join('');
  document.getElementById('assign-sub').innerHTML='<option value="">Sous-type…</option>';
  document.getElementById('assign-color').innerHTML='<option value="">Couleur…</option>';
  document.getElementById('scan-assign').classList.add('show');
}
function onAssignMatChange(){
  const matVal=document.getElementById('assign-mat').value;
  const m=CATALOG.find(x=>x.mat===matVal);
  document.getElementById('assign-sub').innerHTML='<option value="">Sous-type…</option>'+
    (m?m.subtypes.map(s=>`<option value="${s.name}">${s.name}</option>`).join(''):'');
  document.getElementById('assign-color').innerHTML='<option value="">Couleur…</option>';
}
function onAssignSubChange(){
  const matVal=document.getElementById('assign-mat').value;
  const subVal=document.getElementById('assign-sub').value;
  const m=CATALOG.find(x=>x.mat===matVal);
  const s=m&&m.subtypes.find(x=>x.name===subVal);
  document.getElementById('assign-color').innerHTML='<option value="">Couleur…</option>'+
    (s?s.colors.map(c=>`<option value="${c.n}">${c.n}</option>`).join(''):'');
}
function confirmAssign(){
  const mat=document.getElementById('assign-mat').value;
  const sub=document.getElementById('assign-sub').value;
  const name=document.getElementById('assign-color').value;
  if(!mat||!sub||!name){ alert('Sélectionne matière, sous-type et couleur avant de valider.'); return; }
  const map=getBarcodeMap();
  map[pendingCode]={mat,sub,name};
  saveBarcodeMap(map);
  document.getElementById('scan-assign').classList.remove('show');
  applyStockChange({mat,sub,name});
  pendingCode=null;
}
function skipAssign(){
  document.getElementById('scan-assign').classList.remove('show');
  pendingCode=null;
}

// ─── Gestionnaire des associations codes-barres ──────
function openMapManager(){
  const map=getBarcodeMap();
  const codes=Object.keys(map);
  const body=document.getElementById('mapmgr-body');
  body.innerHTML = codes.length ? codes.map(code=>{
    const e=map[code];
    return `<div class="mapmgr-row">
      <span class="mapmgr-code">${code}</span>
      <span class="mapmgr-name">${e.mat} · ${e.sub} · ${e.name}</span>
      <button onclick="deleteMapping('${code}')" title="Supprimer l'association">✕</button>
    </div>`;
  }).join('') : '<div class="mapmgr-empty">Aucune association enregistrée pour le moment.<br>Elles se créent automatiquement au premier scan de chaque référence.</div>';
  document.getElementById('mapmgr-overlay').classList.add('show');
}
function deleteMapping(code){
  const map=getBarcodeMap();
  delete map[code];
  saveBarcodeMap(map);
  openMapManager();
}
function closeMapManager(){
  document.getElementById('mapmgr-overlay').classList.remove('show');
}

// ─── INIT ────────────────────────────────────────────
updateStats();
renderAll();
calc();
