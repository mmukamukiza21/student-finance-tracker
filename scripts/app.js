// app.js
import * as STATE from './state.js';
import { validateRecord, patterns } from './validators.js';
import { renderList, $, $a } from './ui.js';
import { save as storageSave } from './storage.js';

// small seed (will be used if no existing data)
const seed = [
  {"id":"txn_0001","description":"Lunch at cafeteria","amount":12.5,"category":"Food","date":"2025-09-25","createdAt":"2025-09-25T10:00:00Z","updatedAt":"2025-09-25T10:00:00Z"},
  {"id":"txn_0002","description":"Chemistry textbook","amount":89.99,"category":"Books","date":"2025-09-23","createdAt":"2025-09-23T09:00:00Z","updatedAt":"2025-09-23T09:00:00Z"},
  {"id":"txn_0003","description":"Bus pass monthly","amount":45.0,"category":"Transport","date":"2025-09-20","createdAt":"2025-09-20T08:00:00Z","updatedAt":"2025-09-20T08:00:00Z"}
];

function uid(){ return 'txn_'+Math.random().toString(36).slice(2,9); }

function showSection(id){
  ['dashboard','records-section','add-section','settings'].forEach(s=>{
    const el = document.getElementById(s);
    if (!el) return;
    el.hidden = (s !== id);
  });
}

function refresh(pattern=''){
  // simple stats
  const recs = STATE.all();
  $('#stat-count').textContent = recs.length;
  const sum = recs.reduce((s,r)=>s + Number(r.amount||0),0);
  $('#stat-sum').textContent = sum.toFixed(2);
  const top = recs.reduce((m,r)=> { m[r.category] = (m[r.category]||0)+Number(r.amount||0); return m; }, {});
  const topCat = Object.keys(top).sort((a,b)=> (top[b]||0)-(top[a]||0))[0] || '—';
  $('#stat-top').textContent = topCat;

  renderList(pattern, $('#case-insensitive').checked);
}

function bind(){
  // nav
  $('#btn-dashboard').addEventListener('click', ()=> showSection('dashboard'));
  $('#btn-records').addEventListener('click', ()=> showSection('records-section'));
  $('#btn-add').addEventListener('click', ()=> { $('#rec-id').value=''; $('#record-form').reset(); showSection('add-section'); });
  $('#btn-settings').addEventListener('click', ()=> showSection('settings'));

  // search
  $('#search').addEventListener('input', e=> refresh(e.target.value));

  // form submit
  $('#record-form').addEventListener('submit', e=>{
    e.preventDefault();
    const id = $('#rec-id').value || uid();
    const rec = {
      id,
      description: $('#description').value.trim().replace(/\s+/g,' '),
      amount: $('#amount').value.trim(),
      category: $('#category').value.trim(),
      date: $('#date').value.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const errors = validateRecord(rec);
    // clear errors
    $a('.error').forEach(el => el.textContent = '');
    if (Object.keys(errors).length){
      if (errors.description) $('#err-desc').textContent = errors.description;
      if (errors.amount) $('#err-amount').textContent = errors.amount;
      if (errors.date) $('#err-date').textContent = errors.date;
      if (errors.category) $('#err-category').textContent = errors.category;
      return;
    }
    // add/update
    if ($('#rec-id').value) STATE.update(id, rec);
    else STATE.add({ ...rec, amount: Number(rec.amount), createdAt: rec.createdAt, updatedAt: rec.updatedAt });
    showSection('records-section');
    refresh($('#search').value);
  });

  // cancel
  $('#cancel').addEventListener('click', ()=> showSection('records-section'));

  // table actions (edit/delete) - delegated
  document.getElementById('records').addEventListener('click', e=>{
    const id = e.target.dataset.id;
    if (!id) return;
    if (e.target.classList.contains('del')){
      if (!confirm('Delete this record?')) return;
      STATE.remove(id);
      refresh($('#search').value);
    } else if (e.target.classList.contains('edit')){
      const rec = STATE.all().find(r=>r.id===id);
      if (!rec) return;
      $('#rec-id').value = rec.id;
      $('#description').value = rec.description;
      $('#amount').value = rec.amount;
      $('#category').value = rec.category;
      $('#date').value = rec.date;
      showSection('add-section');
    }
  });

  // export
  $('#export-json').addEventListener('click', ()=>{
    const data = JSON.stringify(STATE.all(), null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'sft-export.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // import
  $('#import-json').addEventListener('change', async e=>{
    const file = e.target.files[0];
    if (!file) return;
    const txt = await file.text();
    try {
      const parsed = JSON.parse(txt);
      if (!Array.isArray(parsed)) throw new Error('Invalid structure');
      // basic validation of first item
      const ok = parsed.every(it => it.id && it.date && it.createdAt);
      if (!ok) throw new Error('Missing required fields');
      // replace storage
      storageSave(parsed);
      location.reload(); // simple reload to pick up new data
    } catch(err){
      alert('Import failed: ' + err.message);
    }
  });
}

function start(){
  STATE.init(seed);
  bind();
  refresh();
  showSection('records-section');
}

start();
