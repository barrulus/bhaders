import { ShaderPreview } from './preview.js';
const $ = s => document.querySelector(s);
const preview = new ShaderPreview();
const thumbnails = new Map();
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let items = [], category = 'All', limit = 12, active = null, hero = null, detail = null;
let paused = reduced.matches, elapsed = 4.2, previousTime = null, renderGeneration = 0;
const params = new URLSearchParams(location.search);
$('#search').value = params.get('q') || '';
$('#runtime').value = ['biri', 'umbriel'].includes(params.get('runtime')) ? params.get('runtime') : 'all';

function element(tag, className, text) {
  const el = document.createElement(tag); if (className) el.className = className;
  if (text !== undefined) el.textContent = text; return el;
}
function variants(item) { const runtime = $('#runtime').value; return item.variants.filter(v => runtime === 'all' || v.runtime === runtime); }
function previewFor(item) { return item.variants.find(v => v.preview)?.preview; }
function writeUrl() {
  const query = new URLSearchParams();
  if ($('#search').value) query.set('q', $('#search').value);
  if ($('#runtime').value !== 'all') query.set('runtime', $('#runtime').value);
  if (category !== 'All') query.set('type', category);
  history.replaceState(null, '', location.pathname + (query.size ? '?' + query : '') + location.hash);
}
async function thumbnail(spec) {
  const key = JSON.stringify(spec);
  if (!thumbnails.has(key)) thumbnails.set(key, preview.prepare(spec).then(p => preview.draw(p, 4.2).toDataURL('image/png')));
  return thumbnails.get(key);
}
function card(item) {
  const article = element('article', 'card');
  const art = element('button', 'card-art'); art.type = 'button'; art.setAttribute('aria-label', 'View ' + item.name);
  const fallback = element('div', 'abstract'); fallback.append(element('span', '', 'COMPOSITOR EFFECT')); art.append(fallback);
  const label = element('span', 'art-label', item.category.toUpperCase()); art.append(label);
  const spec = previewFor(item);
  if (spec) thumbnail(spec).then(url => { const img = element('img'); img.src = url; img.alt = item.name + ' shader study'; art.prepend(img); fallback.remove(); }).catch(() => { fallback.firstChild.textContent = 'PREVIEW UNAVAILABLE'; });
  const info = element('div', 'card-info'), heading = element('div', 'card-title');
  const h3 = element('h3'), title = element('button', '', item.name); title.type = 'button'; h3.append(title); heading.append(h3, element('span', '', '↗'));
  const bottom = element('div', 'card-bottom'), badges = element('div', 'badges');
  [...new Set(item.variants.map(v => v.runtime))].forEach(runtime => badges.append(element('span', 'badge', runtime === 'biri' ? 'Biri' : 'Umbriel')));
  const open = element('button', '', 'Details & download ↓'); open.type = 'button';
  bottom.append(badges, open); info.append(heading, element('p', 'card-description', item.description), bottom); article.append(art, info);
  [art, title, open].forEach(button => button.addEventListener('click', () => showDetail(item)));
  return article;
}
function render() {
  const query = $('#search').value.trim().toLowerCase();
  const filtered = items.filter(item => (category === 'All' || item.category === category) && variants(item).length && (item.name + ' ' + item.description + ' ' + item.category).toLowerCase().includes(query));
  $('#grid').replaceChildren(...filtered.slice(0, limit).map(card));
  $('#results').textContent = `${filtered.length} effect${filtered.length === 1 ? '' : 's'}${category !== 'All' ? ' / ' + category.toLowerCase() : ' / all kinds of good things'}`;
  $('#empty').hidden = filtered.length > 0; $('#more').hidden = filtered.length <= limit;
  $('#reset').hidden = !query && category === 'All' && $('#runtime').value === 'all';
  document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent === category)));
  writeUrl();
}
function updateVariant() {
  const generation = ++renderGeneration;
  const variant = active.variants[Number($('#variant').value)]; detail = null;
  $('#download').href = variant.download;
  $('#download').textContent = 'Download for ' + (variant.runtime === 'biri' ? 'Biri' : 'Umbriel') + ' ↓';
  $('#download-meta').textContent = `ZIP · ${(variant.bytes / 1024).toFixed(1)} KB · MIT`;
  $('#instructions').textContent = variant.install;
  $('#copy').textContent = 'Copy instructions';
  $('#files').replaceChildren(...variant.files.map(file => { const li = element('li'), a = element('a', '', file); a.href = 'shaders/' + file; a.target = '_blank'; a.rel = 'noopener'; li.append(a); return li; }));
  const canvas = $('#detail-preview'); canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  const spec = variant.preview;
  $('#preview-note').textContent = spec ? 'ACTUAL GLSL / SAMPLE WINDOW / BIRI ADAPTER' : 'Preview this variant in your compositor. Source and installation instructions are included.';
  canvas.hidden = !spec;
  if (spec) preview.prepare(spec).then(program => {
    if (generation !== renderGeneration) return;
    detail = program; preview.draw(program, elapsed, canvas);
  }).catch(() => { if (generation === renderGeneration) { canvas.hidden = true; $('#preview-note').textContent = 'This browser cannot render the preview. You can still download the effect.'; } });
}
function showDetail(item) {
  active = item; $('#detail-title').textContent = item.name; $('#detail-category').textContent = item.category.toUpperCase();
  $('#detail-description').textContent = item.description;
  $('#variant').replaceChildren(...item.variants.map((v, i) => { const option = element('option', '', `${v.runtime === 'biri' ? 'Biri' : 'Umbriel'} · ${v.profile}`); option.value = i; return option; }));
  const preferred = item.variants.findIndex(v => $('#runtime').value === 'all' || v.runtime === $('#runtime').value);
  $('#variant').value = Math.max(0, preferred); updateVariant(); $('#detail').showModal();
  history.replaceState(null, '', location.pathname + location.search + '#effect=' + item.id);
}
function closeDetail() { $('#detail').close(); }
$('#detail').addEventListener('close', () => { detail = null; ++renderGeneration; history.replaceState(null, '', location.pathname + location.search + '#catalogue'); });
$('#close-detail').addEventListener('click', closeDetail);
$('#detail').addEventListener('click', event => { if (event.target === $('#detail')) { const r = $('#detail').getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDetail(); } });
$('#variant').addEventListener('change', updateVariant);
$('#copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText($('#instructions').textContent); $('#copy').textContent = 'Copied'; } catch { $('#copy').textContent = 'Select the instructions above to copy'; } });
$('#search').addEventListener('input', () => { limit = 12; render(); });
$('#runtime').addEventListener('change', () => { limit = 12; render(); });
$('#reset').addEventListener('click', () => { category = 'All'; $('#runtime').value = 'all'; $('#search').value = ''; limit = 12; render(); });
$('#more').addEventListener('click', () => { limit += 12; render(); });
function updateMotion() { $('#motion').textContent = paused ? 'Play motion' : 'Pause motion'; $('#motion').setAttribute('aria-pressed', String(paused)); }
$('#motion').addEventListener('click', () => { paused = !paused; updateMotion(); });
reduced.addEventListener('change', e => { paused = e.matches; updateMotion(); }); updateMotion();
function frame(now) {
  const delta = previousTime === null ? 0 : Math.min((now - previousTime) / 1000, 0.1); previousTime = now;
  if (!paused && !document.hidden) {
    elapsed += delta;
    if ($('#detail').open) { if (detail) preview.draw(detail, elapsed, $('#detail-preview')); }
    else if (hero && $('#hero-preview').getBoundingClientRect().bottom > 0) preview.draw(hero, elapsed, $('#hero-preview'));
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
try {
  const response = await fetch('catalogue.json'); if (!response.ok) throw new Error('Catalogue failed to load');
  items = await response.json(); $('#total').textContent = `${items.length} effects / 2 compositors`;
  const categories = ['All', 'Rings', 'Window', 'Cursor', 'Screen', 'Animations', 'Motion', 'Themes', 'Experiments'];
  category = categories.includes(params.get('type')) ? params.get('type') : 'All';
  $('#categories').replaceChildren(...categories.map(name => { const b = element('button', '', name); b.type = 'button'; b.addEventListener('click', () => { category = name; limit = 12; render(); }); return b; }));
  render();
  const vine = items.find(i => i.id === 'rings-flowering-vine');
  preview.prepare(previewFor(vine)).then(p => { hero = p; preview.draw(p, elapsed, $('#hero-preview')); }).catch(() => { $('#hero-preview').setAttribute('aria-label', 'Shader preview unavailable'); $('.hero-caption strong').textContent = 'Flowering vine — preview unavailable'; });
  const linked = items.find(i => '#effect=' + i.id === location.hash); if (linked) showDetail(linked);
} catch (error) {
  $('#total').textContent = 'Collection unavailable'; $('#results').textContent = 'The catalogue could not load. Reload this page or use the complete collection downloads below.';
}
