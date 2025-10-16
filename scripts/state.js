// state.js
import { load, save } from './storage.js';
let records = [];

export function init(initial=[]) {
  const stored = load();
  if (Array.isArray(stored) && stored.length) records = stored;
  else if (Array.isArray(initial) && initial.length) records = initial;
  else records = [];
}

export function all(){ return records.slice(); }

export function add(rec){
  records.unshift(rec);
  save(records);
}

export function update(id, patch){
  const i = records.findIndex(r => r.id === id);
  if (i === -1) return false;
  records[i] = { ...records[i], ...patch, updatedAt: new Date().toISOString() };
  save(records);
  return true;
}

export function remove(id){
  records = records.filter(r => r.id !== id);
  save(records);
}
